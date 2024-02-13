import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "@tanstack/react-router";
import { HomeIcon, ListIcon } from "lucide-react";
import { ReactNode } from "react";

type NavigationConfig = {
  title: string;
  route: string;
  icon?: ReactNode;
};

const NAVIGATION_CONFIG: NavigationConfig[] = [
  {
    title: "Home",
    route: "/",
    icon: <HomeIcon size={18} />,
  },
  {
    title: "Attributes",
    route: "/attributes",
    icon: <ListIcon size={18} />,
  },
] as const;

export const RootNavigationMenu = () => {
  return (
    <div className="border-b border-gray-200 w-full py-2">
      <NavigationMenu className="container">
        <NavigationMenuList>
          {NAVIGATION_CONFIG.map(({ title, route, icon }) => (
            <NavigationMenuItem key={route}>
              <Link to={route} className={navigationMenuTriggerStyle()}>
                <div className="flex gap-1">
                  {icon}
                  {title}
                </div>
              </Link>
              <NavigationMenuContent></NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
