export default function Hero() {
	return (
		<main id="home" className="relative flex items-center justify-center">
			<section className="w-full pt-36 pb-24 sm:pt-40 sm:pb-28">
				<div className="mx-auto max-w-5xl px-6 text-center">
					<h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
						Welcome to <span className="text-cyan-400">VishuAI</span>
					</h1>
					<p className="mt-5 text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
						Your next-generation AI companion — smart, simple, and powerful.
					</p>

					<div className="mt-10 flex items-center justify-center gap-4">
						<a
							href="#get-started"
							className="group relative inline-flex h-12 items-center justify-center rounded-xl bg-cyan-500/90 px-6 font-semibold text-slate-950 transition hover:bg-cyan-400 focus:outline-none shadow-[0_0_35px_rgba(34,211,238,0.35)]"
						>
							<span className="relative z-10">Get Started</span>
							<span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20"></span>
						</a>
						<a
							href="#features"
							className="inline-flex h-12 items-center justify-center rounded-xl border border-white/10 px-6 text-white/90 transition hover:text-white hover:border-white/20"
						>
							Learn More
						</a>
					</div>
				</div>
			</section>
		</main>
	)
}


