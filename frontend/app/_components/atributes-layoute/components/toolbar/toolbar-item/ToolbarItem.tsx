export interface ToolbarItemProps {
  name: string;
  isDefault: boolean;
  toggleOptions: React.Dispatch<React.SetStateAction<boolean>>;
  DefaultIcon?: React.ElementType;
  SecondaryIcon?: React.ElementType;
  additionalStyles?: string;
}

const ToolbarItem: React.FC<ToolbarItemProps> = ({
  isDefault,
  toggleOptions,
  DefaultIcon,
  SecondaryIcon,
  additionalStyles,
}) => {
  return (
    <button
      onClick={() => {
        toggleOptions(!isDefault);
      }}
      className={
        `group ${
          !isDefault
            ? "bg-orange-500 hover:bg-transparent"
            : "bg-transparent hover:bg-orange-500"
        } py-3 px-3 border border-orange-500 rounded-lg  transition-all ` +
        additionalStyles
      }
    >
      {DefaultIcon && (
        <DefaultIcon
          className={`${
            !isDefault
              ? "text-white group-hover:text-orange-500 opacity-100"
              : "text-orange-500 group-hover:text-white opacity-0"
          }   absolute cursor-pointer`}
        />
      )}

      {SecondaryIcon && (
        <SecondaryIcon
          className={`${
            isDefault
              ? "text-orange-500 group-hover:text-white opacity-100"
              : "text-white group-hover:text-orange-500 opacity-0"
          }    cursor-pointer`}
        />
      )}
    </button>
  );
};
export default ToolbarItem;
