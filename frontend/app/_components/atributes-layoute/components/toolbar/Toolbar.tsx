import { useEffect, useRef, useState } from "react";
import ToolbarItem, { ToolbarItemProps } from "./toolbar-item/ToolbarItem";

type ToolbarProps = {
  toolbarTools: ToolbarItemProps[];
};

const Toolbar: React.FC<ToolbarProps> = ({ toolbarTools }) => {
  return (
    <section className={` bg-white  self-end shadow-md rounded-xl  mb-8`}>
      <div className="flex justify-between items-center px-8 py-3 ">
        {toolbarTools.map((option, idx) => {
          const isFirst = idx === 0;
          const isSecondFromEnd = idx === toolbarTools.length - 2;
          const isLast = idx === toolbarTools.length - 1;

          const rounedCorners = `${isLast ? "ml-4" : ""}
          ${isSecondFromEnd ? "rounded-l-none" : ""}
          ${isFirst ? "rounded-r-none" : ""}
          `;
          return (
            <ToolbarItem
              key={idx}
              isDefault={option.isDefault}
              toggleOptions={option.toggleOptions}
              DefaultIcon={option.DefaultIcon}
              SecondaryIcon={option.SecondaryIcon}
              name={option.name}
              additionalStyles={rounedCorners}
            />
          );
        })}
      </div>
    </section>
  );
};
export default Toolbar;
