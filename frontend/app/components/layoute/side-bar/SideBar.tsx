'use client';
import SidebarLink from '@/app/_components/side-bar/components/SidebarLink/SidebarLink';
import React from 'react';

interface NavigationLink {
	name: string;
	path: string;
}

interface SideBarProps {
	routerPathname: string;
}

const SideBar: React.FC<SideBarProps> = ({ routerPathname }: SideBarProps) => {
	const NavigationLinks: NavigationLink[] = [
		{ name: 'Home', path: '/' },
		{ name: 'Attributes', path: '/attributes' },
		{ name: 'Why I chose this stack?', path: '/technologies-info' },
	];

	return (
		<nav
			aria-label="Sidebar"
			className="sticky top-0 w-[20vw] min-h-screen p-4 flex flex-col justify-center gap-4 rounded-s-xl"
		>
			{NavigationLinks.map((link, index) => (
				<SidebarLink key={index} href={link.path} text={link.name} />
			))}
		</nav>
	);
};

export default SideBar;
