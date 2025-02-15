import { Plus } from "lucide-react";

type IconButtonProps = {
  onClick: () => void;
}

const IconButton = ({ onClick }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="mt-5 bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
    >
      <Plus className="w-10 h-10" />
    </button>
  );
};

export default IconButton;