import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLinkProps {
  href: string;
  text: string;
}

const SidebarLink = ({ href, text }: SidebarLinkProps) => {
  const isActive = usePathname() === href;

  return (
    <Link
      className={`
      group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all hover:bg-orange-100
      ${!isActive ? "bg-transparent" : "bg-orange-200 "}
      `}
      href={href}
    >
      <p className={`text-gray-900 ${isActive ? "active" : ""}`}>{text}</p>
    </Link>
  );
};

export default SidebarLink;
