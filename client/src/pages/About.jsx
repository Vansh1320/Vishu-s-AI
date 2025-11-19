import SectionHeading from '../components/SectionHeading'
import { motion } from 'framer-motion'
import { Lightbulb, Leaf, Palette } from 'lucide-react'
import vaishnaviImg from '../assets/Vishu.jpg'
import sarahImg from '../assets/team-sarah.jpg'
import davidImg from '../assets/team-david.jpg'
import emmaImg from '../assets/team-emma.jpg'
import michaelImg from '../assets/team-michael.jpg'
import priyaImg from '../assets/team-priya.jpg'
import rachelImg from '../assets/team-rachel.jpg'
import noahImg from '../assets/team-noah.jpg'
import xyzImg from '../assets/team-xyz.jpg'

const cards = [
	{ title: 'Innovation', Icon: Lightbulb, text: 'We push boundaries with intelligent tools that augment filmmakers.' },
	{ title: 'Sustainability', Icon: Leaf, text: 'Efficiency reduces waste in time, energy, and production resources.' },
	{ title: 'Creativity', Icon: Palette, text: 'AI accelerates production while humans craft emotion and story.' },
]

const teamMembers = [
	{
		name: 'Vaishnavi Mathur',
		role: 'Group leader',
		bio: 'Specializes in computer vision and real-time rendering systems.',
		image: vaishnaviImg
	},
	{
		name: 'Sarah Martinez',
		role: 'Creative Director',
		bio: 'Bridges the gap between AI technology and cinematic storytelling.',
		image: sarahImg
	},
	{
		name: 'David Kim',
		role: 'Head of Product',
		bio: 'Drives innovation in automated camera systems and motion capture.',
		image: davidImg
	},
	{
		name: 'Emma Thompson',
		role: 'VFX Specialist',
		bio: 'Expert in neural rendering and virtual production workflows.',
		image: emmaImg
	},
	{
		name: 'Michael Rodriguez',
		role: 'ML Research Lead',
		bio: 'Pioneers AI-driven script analysis and story development tools.',
		image: michaelImg,
		imageClass: 'object-top'
	},
	{
		name: 'Priya Sharma',
		role: 'Post-Production Expert',
		bio: 'Develops automated editing and color grading solutions.',
		image: priyaImg
	},
	{
		name: 'Rachel Patel',
		role: 'Production Strategist',
		bio: 'Optimizes virtual production stages and remote collaboration.',
		image: rachelImg
	},
	{
		name: 'Noah Williams',
		role: 'Data Pipeline Lead',
		bio: 'Builds the data engines that power adaptive storytelling models.',
		image: noahImg
	},
	{
		name: 'XYZ',
		role: 'Data Pipeline Lead',
		bio: 'Builds the data engines that power adaptive storytelling models.',
		image: xyzImg
	}
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
					{teamMembers.map((member, index) => (
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
									className={`w-full h-full object-cover ${member.imageClass ?? ''}`}
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


