import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarLinkProps {
	href: string;
	text: string;
	key: number;
}

const SidebarLink = ({ href, text, key }: SidebarLinkProps) => {
	const pathname = usePathname();

	const myHref = href !== '/' ? href : '/home';
	const myPathname = pathname !== '/' ? pathname : '/home';

	const isActive = myPathname.includes(myHref);
	return (
		<Link
			key={'sidebar-link-' + key}
			className={`
      group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all hover:bg-orange-100
      ${!isActive ? 'bg-transparent' : 'bg-orange-200 '}
      `}
			href={href}
		>
			<p className={`text-gray-900 ${isActive ? 'active' : ''}`}>{text}</p>
		</Link>
	);
};

export default SidebarLink;
