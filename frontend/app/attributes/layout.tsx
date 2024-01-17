'use client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ModalProvider } from '../_contexts/modal-context/ModalContext';
import { LabelsProvider } from '../_contexts/labels-context/LabelsContext';

export default function Layout({ children }: { children: React.ReactNode }) {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<LabelsProvider>
				<ModalProvider>
					<main className="self-center  gap-12 flex min-h-screen flex-col items-top w-[80vw] bg-gray-100 ">
						{children}
					</main>
				</ModalProvider>
			</LabelsProvider>
		</QueryClientProvider>
	);
}
