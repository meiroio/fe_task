import Link from 'next/link';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center h-8 gap-10 justify-top p-24 w-[80vw] bg-gray-100">
			<section className="flex flex-col justify-center gap-4">
				<h1 className="text-4xl font-bold text-center">Front-end Task</h1>
				<p className="text-xl text-center">
					This is a front-end task for a job application.
				</p>
			</section>

			<section className="flex flex-col justify-center gap-6 self-center w-[40vw]">
				<p className="text-base text-center">
					I was not sure what do to with the homepage. Originally I wanted to do
					something "funny" with it, but I decided to use it for {''}
					<b> 🌈 SELF PROMOTION 🌈</b>.
				</p>

				<p className="text-base text-center">
					You can find a more about me on my personal website.
				</p>

				<Link
					href={'https://adamzachoval.cz'}
					className="text-orange-500 font-bold w-fit  self-center bg-orange underline"
				>
					Adam Zachoval
				</Link>
			</section>
		</main>
	);
}
