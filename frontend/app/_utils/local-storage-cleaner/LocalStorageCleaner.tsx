'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const LocalStorageCleaner: React.FC = () => {
	const pathname = usePathname();

	useEffect(() => {
		if (!pathname.startsWith('/attributes')) {
			localStorage.removeItem('searchedText');
		}
	}, [pathname]);

	return null;
};

export default LocalStorageCleaner;
