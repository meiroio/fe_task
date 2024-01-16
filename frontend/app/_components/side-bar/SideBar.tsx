"use client";
import React from "react";
import SidebarLink from "./components/SidebarLink/SidebarLink";

interface NavigationLink {
  name: string;
  path: string;
}

const SideBar: React.FC = () => {
  const NavigationLinks: NavigationLink[] = [
    { name: "Home", path: "/" },
    { name: "Attributes", path: "/attributes" },
    { name: "Why I chose this stack?", path: "/technologies-info" },
  ];

  return (
    <nav
      aria-label="Sidebar"
      className="sticky top-0 w-[20vw] bg-gray-200 min-h-screen max-h-screen p-4 flex flex-col justify-center gap-4 rounded-s-xl"
    >
      {NavigationLinks.map((link, index) => (
        <SidebarLink
          href={link.path}
          text={link.name}
          key={"sidebar-navigation-item-" + index}
        />
      ))}
    </nav>
  );
};

export default SideBar;
