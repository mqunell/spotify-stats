import '@/styles/globals.css'

const RootLayout = ({ children }: { children: React.ReactNode }) => (
	<html lang="en">
		<body className="bg-white text-slate-600 dark:bg-slate-800 dark:text-slate-300">
			<section className="flex flex-col items-start gap-2 p-4">{children}</section>
		</body>
	</html>
)

export default RootLayout
