import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'

export default function Home() {
	return (
		<div className="relative">
			<section className="pt-28 sm:pt-32 pb-20">
				<div className="mx-auto max-w-6xl px-6 text-center">
					<motion.h1
						initial={{ opacity: 0, y: 14 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
					>
						Hybrid AI–Human Film Factory: <span className="text-cyan-400">The Future of Filmmaking</span>
					</motion.h1>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.7, delay: 0.1 }}
						className="mt-5 text-lg sm:text-xl text-white/70 max-w-3xl mx-auto"
					>
						Smarter, faster, more creative filmmaking powered by AI.
					</motion.p>

					<div className="mt-10 flex items-center justify-center gap-4">
						<Link to="/features" className="inline-flex h-12 items-center justify-center rounded-xl bg-cyan-500/90 hover:bg-cyan-400 px-6 font-semibold text-slate-950 transition shadow-[0_0_35px_rgba(34,211,238,0.35)]">Explore Features</Link>
						<Link to="/contact" className="inline-flex h-12 items-center justify-center rounded-xl border border-white/10 px-6 text-white/90 transition hover:text-white hover:border-white/20">Join Us</Link>
					</div>
				</div>
			</section>

			<section className="py-10">
				<SectionHeading
					title="Blending AI innovation with human creativity"
					subtitle="We build intelligent tools that enhance storytelling while keeping creators at the center."
				/>
			</section>
		</div>
	)
}


