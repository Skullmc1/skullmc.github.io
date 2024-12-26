const Color = {
  White: "255, 255, 255",
  Steel: "96, 125, 139",
  Gray1: "169, 169, 169",
  Gray2: "128, 128, 128",
  Gray3: "105, 105, 105",
  Brown1: "139, 69, 19",
  Brown2: "160, 82, 45",
  Brown3: "165, 42, 42",
};

const State = {
  balloons: [],
  colors: [
    Color.Gray1,
    Color.Gray2,
    Color.Gray3,
    Color.Brown1,
    Color.Brown2,
    Color.Brown3,
  ],
  context: null,
  index: 0,
  params: {
    balloon: {
      frequency: 600,
      size: 4,
    },
    duration: {
      slow: 500,
      medium: 250,
      fast: 100,
    },
    reticle: {
      accent: Color.White,
      color: Color.Steel,
      radius: 40,
      thickness: 2,
    },
  },
  position: { x: 0, y: 0 },
  splatter: {
    color: Color.White,
    lines: [],
  },
  timestamps: {
    clickAt: null,
    popAt: null,
  },
};

const N = {
  clamp: (min, value, max) => Math.min(Math.max(min, value), max),
  rand: (min, max) => Math.floor(Math.random() * (max - min + 1) + min),
};

const Mapper = {
  angle: (start, end) => ({ start: start || 0, end: end || 2 * Math.PI }),
  balloon: (color) => {
    const { balloon } = State.params,
      { canvas } = State.context;

    const height = balloon.size * 100,
      width = height * 0.4;

    return {
      color,
      createdAt: new Date().getTime(),
      duration: N.rand(3000, 7000),
      id: Math.random(),
      poppedAt: null,
      position: Mapper.position(
        N.rand(width / 2, canvas.width - width / 2),
        canvas.height + height,
      ),
    };
  },
  circle: (position, color, fill, radius, thickness, angle) => ({
    position,
    color,
    fill,
    radius,
    thickness,
    angle: angle || Mapper.angle(),
  }),
  line: (x1, y1, x2, y2, color, thickness) => ({
    start: Mapper.position(x1, y1),
    end: Mapper.position(x2, y2),
    color,
    thickness,
  }),
  position: (x, y) => ({ x, y }),
  rgb: (value) => (value.substring(0, 3) === "rgb" ? value : `rgb(${value})`),
  rgba: (value, alpha) => `rgba(${value}, ${alpha})`,
};
const Canvas = {
  draw: () => {
    const { context } = State;
    const height = context.canvas.clientHeight,
      width = context.canvas.clientWidth;

    context.canvas.height = height;
    context.canvas.width = width;

    const size = 4,
      factor = width / 2000;

    State.params.balloon.size = N.clamp(2, size * factor, 4);

    State.context.clearRect(0, 0, width, height);
  },
  circle: (params) => {
    const { context } = State;
    const { angle, position } = params;

    context.beginPath();
    context.arc(position.x, position.y, params.radius, angle.start, angle.end);

    if (params.color && params.thickness) {
      context.lineWidth = params.thickness;
      context.strokeStyle = Mapper.rgb(params.color);
      context.stroke();
    }

    if (params.fill) {
      context.fillStyle = Mapper.rgb(params.fill);
      context.fill();
    }
  },
  in: (path) => {
    const { context, position } = State;
    return context.isPointInPath(path, position.x, position.y);
  },
  line: (params) => {
    const { context } = State;
    const { start, end, color, thickness } = params;

    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);

    context.lineWidth = thickness;
    context.strokeStyle = Mapper.rgb(color);
    context.lineCap = "round";

    context.stroke();
  },
  lines: (lines) => lines.forEach((line) => Canvas.line(line)),
};

const Animate = {
  on: (initial, final, speed, timestamp) => {
    const { duration } = State.params;
    return Animate.value(
      initial,
      final,
      duration[speed] || duration.medium,
      State.timestamps[timestamp],
    );
  },
  onclick: (initial, final, speed) =>
    Animate.on(initial, final, speed, "clickAt"),
  onpop: (initial, final, speed) => Animate.on(initial, final, speed, "popAt"),
  percent: (duration, timestamp) => {
    if (timestamp === null) return 1;
    const now = new Date().getTime(),
      diff = now - timestamp;
    return diff / duration;
  },
  value: (initial, final, duration, timestamp) => {
    const percent = Animate.percent(duration, timestamp);
    if (percent >= 1 || initial === final) return final;
    const diff = final - initial;
    return initial + diff * percent;
  },
};

const Reticle = {
  borders: (position) => {
    const { accent, color, radius, thickness } = State.params.reticle;

    for (let i = 0.05; i < 2; i += 0.5) {
      const angle = Mapper.angle(Math.PI * i, Math.PI * (0.4 + i)),
        params = Mapper.circle(position, color, null, radius, thickness, angle);
      Canvas.circle(params);
    }

    for (let i = 0.1; i < 2; i += 0.5) {
      const angle = Mapper.angle(Math.PI * i, Math.PI * (0.3 + i)),
        color = Mapper.rgba(accent, Animate.onclick(0, 1)),
        r = Animate.onclick(radius * 1.5, radius * 0.75),
        params = Mapper.circle(position, color, null, r, thickness, angle);
      Canvas.circle(params);
    }
  },
  draw: () => {
    Reticle.borders(State.position);
    Reticle.eye(State.position);
    const lines = Reticle.lines();
    Reticle.overlays(lines);
  },
  eye: (position) => {
    const { accent } = State.params.reticle;
    const color = Mapper.rgba(accent, Animate.onclick(0, 1)),
      radius = Animate.onclick(4, 2);
    Canvas.circle(Mapper.circle(position, null, color, radius));
  },
  line: (x1, y1, x2, y2) => {
    const { color, thickness } = State.params.reticle;
    return Mapper.line(x1, y1, x2, y2, color, thickness);
  },
  lines: () => {
    const { position } = State,
      { height, width } = State.context.canvas;
    const offset = State.params.reticle.radius * 0.25;

    const lines = [
      Reticle.line(position.x, 0, position.x, position.y - offset),
      Reticle.line(width, position.y, position.x + offset, position.y),
      Reticle.line(position.x, height, position.x, position.y + offset),
      Reticle.line(0, position.y, position.x - offset, position.y),
    ];

    Canvas.lines(lines);
    return lines;
  },
  overlay: (line, start) => {
    const { accent } = State.params.reticle;
    return { ...line, start, color: Mapper.rgba(accent, 0.75) };
  },
  overlays: (lines) => {
    const { height, width } = State.context.canvas;
    const [l0, l1, l2, l3] = lines;

    const overlays = [
      Reticle.overlay(
        l0,
        Mapper.position(l0.end.x, Animate.onclick(0, l0.end.y - 1, "slow")),
      ),
      Reticle.overlay(
        l1,
        Mapper.position(Animate.onclick(width, l1.end.x + 1, "slow"), l1.end.y),
      ),
      Reticle.overlay(
        l2,
        Mapper.position(
          l2.end.x,
          Animate.onclick(height, l2.end.y + 1, "slow"),
        ),
      ),
      Reticle.overlay(
        l3,
        Mapper.position(Animate.onclick(0, l3.end.x - 1, "slow"), l3.end.y),
      ),
    ];

    Canvas.lines(overlays);
  },
};
const Splatter = {
  draw: () => {
    const { position, splatter } = State;

    const lines = splatter.lines.map((line) => {
      const start = Mapper.position(
          line.start.x + position.x,
          line.start.y + position.y,
        ),
        end = Mapper.position(line.end.x + position.x, line.end.y + position.y);

      const color = Mapper.rgba(line.color, Animate.onpop(50, 0) / 100);

      return Mapper.line(
        Animate.onpop(start.x, end.x, "fast"),
        Animate.onpop(start.y, end.y, "fast"),
        end.x,
        end.y,
        color,
        line.thickness,
      );
    });

    Canvas.lines(lines);
  },
  generate: (color) => {
    const { radius } = State.params.reticle;
    const count = 16;
    let lines = [];

    for (let i = 0; i < count; i++) {
      if (i % 4 !== 0) {
        const angle = Math.PI * 2 * (i / 16);
        const length = N.rand(radius * 0.25, radius),
          r = radius * 1.5;
        const cos = Math.cos(angle),
          sin = Math.sin(angle);

        lines.push(
          Mapper.line(
            cos * r,
            sin * r,
            cos * (length + r),
            sin * (length + r),
            color,
            2,
          ),
        );
      }
    }

    State.splatter = { color, lines };
  },
};

const Balloon = {
  body: (size, position) => {
    const path = new Path2D();

    // Create a rectangular building
    const width = size.width;
    const height = size.height;

    // Main building body
    path.rect(position.x - width / 2, position.y - height, width, height);

    // Add windows
    const windowRows = 5;
    const windowCols = 3;
    const windowWidth = width / (windowCols + 1);
    const windowHeight = height / (windowRows + 1);

    for (let row = 0; row < windowRows; row++) {
      for (let col = 0; col < windowCols; col++) {
        path.rect(
          position.x -
            width / 2 +
            (col + 1) * (width / (windowCols + 1)) -
            windowWidth / 2,
          position.y -
            height +
            (row + 1) * (height / (windowRows + 1)) -
            windowHeight / 2,
          windowWidth,
          windowHeight,
        );
      }
    }

    return path;
  },

  knot: () => new Path2D(),
  tail: () => new Path2D(),

  check: (balloon, now) => {
    const visible = now - balloon.createdAt <= balloon.duration,
      unpopped =
        balloon.poppedAt === null ||
        now - balloon.poppedAt <= State.params.duration.fast;
    return visible && unpopped;
  },

  color: (balloon, opacity) => {
    const alpha = balloon.poppedAt
      ? Animate.onclick(opacity * 100, 0, "fast") / 100
      : opacity;
    return Mapper.rgba(balloon.color, alpha);
  },

  draw: (balloon) => {
    const { context } = State;
    const size = Balloon.size(balloon);

    context.lineWidth = size.thickness;
    context.strokeStyle = Balloon.color(balloon, 1);
    context.fillStyle = Balloon.color(balloon, 0.8);

    const body = Balloon.body(size, position);

    if (Canvas.in(body)) {
      context.fillStyle = Balloon.color(balloon, 0.9);
      const now = new Date().getTime();
      if (now - State.timestamps.clickAt <= 20) {
        Balloon.pop(balloon, now);
      }
    }

    context.stroke(body);
    context.fill(body);
  },

  filter: () => {
    const now = new Date().getTime();
    return State.balloons.filter((balloon) => Balloon.check(balloon, now));
  },

  generate: () => {
    const { colors } = State,
      { frequency } = State.params.balloon;
    const color = State.colors[State.index++ % colors.length];
    State.balloons.push(Mapper.balloon(color));
    setTimeout(() => requestAnimationFrame(Balloon.generate), frequency);
  },

  pop: (balloon, poppedAt) => {
    Splatter.generate(balloon.color);
    State.timestamps.popAt = poppedAt;
    State.balloons = State.balloons.map((b) => {
      if (b.id === balloon.id && b.poppedAt === null) {
        b.poppedAt = poppedAt;
      }
      return b;
    });
  },

  size: (balloon) => {
    const size = { base: State.params.balloon.size };
    if (balloon && balloon.poppedAt) {
      size.base = size.base * (Animate.onclick(100, 150, "fast") / 100);
    }
    const height = size.base * 100;
    size.height = height;
    size.width = height * 0.4; // Narrower for buildings
    size.thickness = size.base * 1.2;
    return size;
  },

  release: () => {
    const { balloon: params } = State.params;

    State.balloons = Balloon.filter();

    for (let balloon of State.balloons) {
      const y = Animate.value(
        balloon.position.y,
        params.size * 100 * -1,
        balloon.duration,
        balloon.createdAt,
      );

      const position = { ...balloon.position, y };
      Balloon.draw({ ...balloon, position });
    }
  },
};

const App = {
  draw: () => {
    Canvas.draw();
    Balloon.release();
    Reticle.draw();
    Splatter.draw();
    window.requestAnimationFrame(App.draw);
  },
};

window.onload = () => {
  State.context = document.getElementById("canvas").getContext("2d");
  App.draw();
  Balloon.generate();
  State.position = Mapper.position(
    State.context.canvas.width / 2,
    State.context.canvas.height / 2,
  );
};

window.onmousemove = (e) => {
  State.position.x = e.clientX;
  State.position.y = e.clientY;
};

window.onmousedown = () => {
  State.timestamps.clickAt = new Date().getTime();
};
