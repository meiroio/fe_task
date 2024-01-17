import Link from 'next/link';

interface SidebarLinkProps {
	href: string;
	text: string;
	isActive: boolean;
}

const SidebarLink = ({ href, text, isActive }: SidebarLinkProps) => {
	return (
		<Link
			className="bg-gray-200 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
			href={href}
		>
			<p className={`text-gray-900 ${isActive ? 'active' : ''}`}>{text}</p>
		</Link>
	);
};

export default SidebarLink;
