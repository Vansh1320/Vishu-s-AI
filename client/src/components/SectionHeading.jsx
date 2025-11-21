import { motion } from 'framer-motion'

export default function SectionHeading({ title, subtitle }) {
	return (
		<div className="mx-auto max-w-3xl text-center">
			<motion.h2
				initial={{ opacity: 0, y: 12 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.4 }}
				transition={{ duration: 0.5, ease: 'easeOut' }}
				className="text-3xl sm:text-4xl font-extrabold"
			>
				{title}
			</motion.h2>
			{subtitle && (
				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true, amount: 0.4 }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className="mt-3 text-white/70"
				>
					{subtitle}
				</motion.p>
			)}
		</div>
	)
}


