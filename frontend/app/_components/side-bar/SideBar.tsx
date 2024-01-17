'use client';
import React from 'react';
import SidebarLink from './components/SidebarLink/SidebarLink';

interface NavigationLink {
	name: string;
	path: string;
}

const SideBar: React.FC = () => {
	const NavigationLinks: NavigationLink[] = [
		{ name: 'Home', path: '/' },
		{ name: 'Attributes', path: '/attributes' },
	];

	return (
		<nav
			aria-label="Sidebar"
			className="sticky top-0 w-[20vw] bg-gray-200 min-h-screen max-h-screen p-4 flex flex-col justify-center gap-4"
		>
			{NavigationLinks.map((link, index) => (
				<SidebarLink
					key={'sidebar-link-' + index}
					href={link.path}
					text={link.name}
				/>
			))}
		</nav>
	);
};

export default SideBar;
