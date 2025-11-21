import SectionHeading from '../components/SectionHeading'
import { motion } from 'framer-motion'
import { Lightbulb, Leaf, Palette, TrendingUp, Users, DollarSign } from 'lucide-react'
import vaishnaviImg from '../assets/Vishu.jpg'
import mehekImg from '../assets/Mehek Gupta.jpg'
import divyaImg from '../assets/Divya-Sanap.jpg'
import sujaanImg from '../assets/Sujaan Badani.jpg'
import priyaVayasImg from '../assets/Priya Vayas.jpg'
import chhayansiNityaImg from '../assets/Chhayansi Nitya.jpg'
import angelinaImg from '../assets/Angelina Shaji.jpg'
import trinaRaoImg from '../assets/Trina Rao.jpg'
import alimaSudheeranImg from '../assets/Alima Sudheeran.jpg'

const cards = [
	{ title: 'Innovation', Icon: Lightbulb, text: 'We push boundaries with intelligent tools that augment filmmakers.' },
	{ title: 'Sustainability', Icon: Leaf, text: 'Efficiency reduces waste in time, energy, and production resources.' },
	{ title: 'Creativity', Icon: Palette, text: 'AI accelerates production while humans craft emotion and story.' },
]

const teamMembers = [
	{
		name: 'Vaishnavi Mathur',
		role: 'Lead AI Engineer',
		image: vaishnaviImg
	},
	{
		name: 'Mahek Gupta',
		role: 'Creative Director',
		image: mehekImg
	},
	{
		name: 'Divya Sanap',
		role: 'Head of Product',
		image: divyaImg
	},
	{
		name: 'Sujaan Badani',
		role: 'VFX Specialist',
		image: sujaanImg
	},
	{
		name: 'Priya Vayas',
		role: 'ML Research Lead',
		image: priyaVayasImg,
		imageClass: 'object-top'
	},
	{
		name: 'Chhayansi Nitya',
		role: 'Post-Production Expert',
		image: chhayansiNityaImg
	},
	{
		name: 'Angelina Shaji',
		role: 'Production Strategist',
		image: angelinaImg
	},
	{
			name: 'Trina Rao',
		role: 'Data Pipeline Lead',
		image: trinaRaoImg
	},
	{
		name: 'Alima Sudheeran',
		role: 'Data Pipeline Lead',
		image: alimaSudheeranImg
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

			{/* Indian Film Industry & AI Growth Section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className="mt-20"
			>
				<SectionHeading
					title="Indian Film Industry & AI Growth"
					subtitle="Transforming India's entertainment sector with intelligent technology"
				/>

				<div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
					<motion.div
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-transparent p-6"
					>
						<DollarSign className="text-cyan-400 mb-4" size={32} />
						<h3 className="text-xl font-semibold mb-3">Industry Revenue Growth</h3>
						<p className="text-white/80 mb-4">
							India's Film, TV, and OTT sector earned <span className="text-cyan-400 font-semibold">₹1.1 lakh crore</span> in FY 2024 and is expected to reach <span className="text-cyan-400 font-semibold">₹1.6 lakh crore by 2028</span>, supporting <span className="text-cyan-400 font-semibold">2.6 million jobs</span>.
						</p>
						<p className="text-white/60 text-sm mt-4">
							<strong className="text-white/80">Source:</strong> Deloitte–MPA Report 2025, NFDC India
						</p>
						<p className="text-white/50 text-xs mt-2">
							<a href="https://creativefirst.film/wp-content/uploads/2025/04/MPA_Deloitte_IN_Report_Final_27042025.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 underline">
								View Report PDF
							</a>
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-transparent p-6"
					>
						<Users className="text-cyan-400 mb-4" size={32} />
						<h3 className="text-xl font-semibold mb-3">AI-Powered Job Creation</h3>
						<p className="text-white/80 mb-4">
							With AI tools, the industry could add <span className="text-cyan-400 font-semibold">3.6 lakh more jobs by 2029</span> in areas like editing, animation, and virtual production.
						</p>
						<p className="text-white/60 text-sm mt-4">
							<strong className="text-white/80">Source:</strong> Deloitte–MPA Report 2025, NFDC India
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-transparent p-6 md:col-span-2"
					>
						<TrendingUp className="text-cyan-400 mb-4" size={32} />
						<h3 className="text-xl font-semibold mb-3">AI Impact on Revenue & Costs</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
							<div className="rounded-lg bg-white/5 p-4 border border-white/10">
								<p className="text-cyan-400 text-2xl font-bold mb-1">+10%</p>
								<p className="text-white/80 text-sm">Revenue Increase</p>
							</div>
							<div className="rounded-lg bg-white/5 p-4 border border-white/10">
								<p className="text-cyan-400 text-2xl font-bold mb-1">-15%</p>
								<p className="text-white/80 text-sm">Cost Reduction</p>
							</div>
						</div>
						<p className="text-white/80">
							Adoption of artificial intelligence (AI) can increase revenues by <span className="text-cyan-400 font-semibold">10%</span> and reduce costs by <span className="text-cyan-400 font-semibold">15%</span> for media and entertainment companies, EY asserted in a report published during the first edition of WAVES Summit.
						</p>
						<p className="text-white/60 text-sm mt-4">
							<strong className="text-white/80">Sources:</strong> The Economic Times 2025; Business Research Insights 2025; EY Report (WAVES Summit)
						</p>
					</motion.div>
				</div>
			</motion.div>

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
								{member.bio && <p className="mt-3 text-white/70 text-sm leading-relaxed">{member.bio}</p>}
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</div>
	)
}



