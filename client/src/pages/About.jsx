import SectionHeading from '../components/SectionHeading'
import { motion } from 'framer-motion'
import { Lightbulb, Leaf, Palette } from 'lucide-react'

const cards = [
	{ title: 'Innovation', Icon: Lightbulb, text: 'We push boundaries with intelligent tools that augment filmmakers.' },
	{ title: 'Sustainability', Icon: Leaf, text: 'Efficiency reduces waste in time, energy, and production resources.' },
	{ title: 'Creativity', Icon: Palette, text: 'AI accelerates production while humans craft emotion and story.' },
]

export default function About() {
	return (
		<div className="pt-28 sm:pt-32 pb-20 mx-auto max-w-6xl px-6">
			<SectionHeading
				title="Empowering Creators with Intelligent Tools"
				subtitle="A Hybrid AI–Human approach: AI speeds production; humans shape meaning."
			/>

			<motion.p
				initial={{ opacity: 0, y: 10 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
				className="mt-10 text-white/80 max-w-3xl mx-auto text-center"
			>
				We build AI systems that respect creative intent. Our tools handle the complex and repetitive so filmmakers can focus on performance, emotion, and story.
			</motion.p>

			<div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{cards.map(({ title, Icon, text }) => (
					<motion.div
						key={title}
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="rounded-2xl border border-white/10 bg-white/5 p-6"
					>
						<Icon className="text-cyan-400" />
						<h3 className="mt-4 text-xl font-semibold">{title}</h3>
						<p className="mt-2 text-white/70">{text}</p>
					</motion.div>
				))}
			</div>

			{/* Team Section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className="mt-20"
			>
				<SectionHeading
					title="Meet Our Team"
					subtitle="The creative minds behind AI-powered filmmaking"
				/>

				<div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{[
						{
							name: 'Alex Chen',
							role: 'Lead AI Engineer',
							bio: 'Specializes in computer vision and real-time rendering systems.',
							image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces'
						},
						{
							name: 'Sarah Martinez',
							role: 'Creative Director',
							bio: 'Bridges the gap between AI technology and cinematic storytelling.',
							image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces'
						},
						{
							name: 'David Kim',
							role: 'Head of Product',
							bio: 'Drives innovation in automated camera systems and motion capture.',
							image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces'
						},
						{
							name: 'Emma Thompson',
							role: 'VFX Specialist',
							bio: 'Expert in neural rendering and virtual production workflows.',
							image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces'
						},
						{
							name: 'Michael Rodriguez',
							role: 'ML Research Lead',
							bio: 'Pioneers AI-driven script analysis and story development tools.',
							image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces'
						},
						{
							name: 'Priya Sharma',
							role: 'Post-Production Expert',
							bio: 'Develops automated editing and color grading solutions.',
							image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces'
						}
					].map((member, index) => (
						<motion.div
							key={member.name}
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/10 transition-colors"
						>
							<div className="relative w-full aspect-square overflow-hidden">
								<img
									src={member.image}
									alt={member.name}
									className="w-full h-full object-cover"
									loading="lazy"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
							</div>
							<div className="p-6">
								<h3 className="text-xl font-semibold">{member.name}</h3>
								<p className="mt-1 text-cyan-400 text-sm font-medium">{member.role}</p>
								<p className="mt-3 text-white/70 text-sm leading-relaxed">{member.bio}</p>
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</div>
	)
}


