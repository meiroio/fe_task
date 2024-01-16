import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";

interface ToolbarProps {
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Toolbar: React.FC<ToolbarProps> = ({ isEditMode, setIsEditMode }) => {
  return (
    <section className="bg-white  self-end shadow-md rounded-xl  mb-8">
      <div className="flex justify-between items-center px-2 py-2">
        <button
          onClick={() => {
            setIsEditMode(!isEditMode);
          }}
          className={`group ${
            !isEditMode
              ? "bg-orange-500 hover:bg-transparent"
              : "bg-transparent hover:bg-orange-500"
          } py-3 px-3 border border-orange-500  rounded-lg transition-all`}
        >
          <AiOutlineEdit
            className={`${
              !isEditMode
                ? "text-white group-hover:text-orange-500 opacity-100"
                : "text-orange-500 group-hover:text-white opacity-0"
            }   absolute cursor-pointer`}
          />

          <AiOutlineEye
            className={`${
              isEditMode
                ? "text-orange-500 group-hover:text-white opacity-100"
                : "text-white group-hover:text-orange-500 opacity-0"
            }    cursor-pointer`}
          />
        </button>
      </div>
    </section>
  );
};
export default Toolbar;
