import ToolbarItem, { ToolbarItemProps } from "./toolbar-item/ToolbarItem";

type ToolbarProps = {
  toolbarTools: ToolbarItemProps[];
};

const Toolbar: React.FC<ToolbarProps> = ({ toolbarTools }) => {
  return (
    <section className="bg-white  self-end shadow-md rounded-xl  mb-8">
      <div className="flex justify-between items-center px-2 py-2">
        {toolbarTools.map((option, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === toolbarTools.length - 1;
          return (
            <ToolbarItem
              key={idx}
              isDefault={option.isDefault}
              toggleOptions={option.toggleOptions}
              DefaultIcon={option.DefaultIcon}
              SecondaryIcon={option.SecondaryIcon}
            />
          );
        })}
      </div>
    </section>
  );
};
export default Toolbar;
