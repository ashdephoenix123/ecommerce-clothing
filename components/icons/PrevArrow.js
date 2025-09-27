import { FiChevronLeft } from "react-icons/fi";

const PrevArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={`${className} inline-flex cursor-pointer !justify-center !items-center p-3 rounded-full shadow-lg hover:bg-gray-100`}
      style={{ left: "-10px", zIndex: 10, ...style }}
      onClick={onClick}
    >
      <FiChevronLeft
        size={30}
        color="gray"
        className="bg-white rounded-full p-1 border shadow-lg"
      />
    </div>
  );
};

export default PrevArrow;
