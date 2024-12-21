interface GameCardProps {
  title: string;
  description: string;
  image: string;
  onSelect: () => void;
}

const GameCard = ({ title, description, image, onSelect }: GameCardProps) => {
  return (
    <div
      className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onSelect}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default GameCard;
