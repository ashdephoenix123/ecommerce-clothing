import { FiChevronRight } from "react-icons/fi";

const NextArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={`${className} inline-flex cursor-pointer !justify-center !items-center p-3 rounded-full shadow-lg hover:bg-gray-100`}
      style={{ right: "-5px", zIndex: 10, ...style }}
      onClick={onClick}
    >
      <FiChevronRight
        size={30}
        color="gray"
        className="bg-white rounded-full p-1 border shadow-lg"
      />
    </div>
  );
};

export default NextArrow;
