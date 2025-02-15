import { Plus } from "lucide-react";

function IconButton() {
  return (
    <button className="mt-5 bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
      <Plus className="w-5 h-5" />
    </button>
  );
}

export default IconButton;