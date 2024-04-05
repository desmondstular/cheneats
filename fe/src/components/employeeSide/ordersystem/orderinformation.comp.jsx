export const OrderInformation = () => {
	return (
		<div
			className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
			<div
				className=" border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5 dark:bg-slate-900 dark:border-gray-700">
				<p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
					Featured
				</p>
			</div>
			<div className="p-4 md:p-5">
				<h3 className="text-lg font-bold text-gray-800 dark:text-white">
					Card title
				</h3>
				<p className="mt-2 text-gray-500 dark:text-gray-400">
					With supporting text below as a natural lead-in to additional content.
				</p>
				<a className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400"
				   href="#">
					Card link
					<svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
						 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
						 stroke-linejoin="round">
						<path d="m9 18 6-6-6-6"></path>
					</svg>
				</a>
			</div>
		</div>
	)
}
