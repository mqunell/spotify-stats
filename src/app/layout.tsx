import '@/styles/globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => (
	<html lang="en">
		<body>
			<section className="flex flex-col items-start gap-2 p-4">{children}</section>
		</body>
	</html>
);

export default RootLayout;
