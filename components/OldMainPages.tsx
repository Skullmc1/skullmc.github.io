import Link from "next/link";
import { motion } from "framer-motion";

const OldMainPages = () => {
  return (
    <section className="min-h-screen py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
        >
          Other Layouts
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            { title: "First", link: "/first" },
            { title: "Cartoon Lookin", link: "/cartoon" },
            { title: "Terminal", link: "/game" },
          ].map((version, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Link href={version.link}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl p-8 h-full border border-cyan-500/30 shadow-lg shadow-cyan-500/20 backdrop-blur-sm relative group"
                >
                  {/* Decorative corner element */}
                  <div className="absolute top-0 right-0 w-20 h-20">
                    <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-500"></div>
                    <div className="absolute top-4 right-8 w-12 h-[1px] bg-cyan-500/50"></div>
                    <div className="absolute top-4 right-4 w-[1px] h-12 bg-cyan-500/50"></div>
                  </div>

                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                    {version.title}
                  </h3>

                  <p className="text-gray-400 mt-4">
                    Explore previous version of the main page layout
                  </p>

                  {/* Hover effect line */}
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OldMainPages;
