import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { Camera, Clapperboard, Cpu, Scissors, Images, FileText, User, Film } from 'lucide-react'
import CameraDemo from '../components/features/CameraDemo'
import StoryboardDemo from '../components/features/StoryboardDemo'
import RenderingDemo from '../components/features/RenderingDemo'
import VideoEditorDemo from '../components/features/VideoEditorDemo'
import ShotMatcherDemo from '../components/features/ShotMatcherDemo'

function FeatureBlock({ title, points, mediaLeft = true, Icon, children, description }) {
	return (
		<div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start ${mediaLeft ? '' : 'lg:[&>*:first-child]:col-start-2 lg:[&>*:first-child]:row-start-1 lg:[&>*:last-child]:col-start-1 lg:[&>*:last-child]:row-start-1'}`}>
			<motion.div
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{ duration: 0.6 }}
				className="w-full rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-transparent p-4"
			>
				{children || <Icon size={72} className="text-cyan-400" />}
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{ duration: 0.6, delay: 0.05 }}
				className="flex flex-col justify-start h-full gap-3">
				<h3 className="text-2xl font-bold">{title}</h3>
				{description && <p className="text-white/70 text-sm leading-relaxed">{description}</p>}
				<ul className="space-y-2 text-white/80">
					{points.map((p, i) => (
						<li key={i} className="flex items-start gap-2">
							<span className="mt-1 inline-block h-2 w-2 rounded-full bg-cyan-400"></span>
							<p>{p}</p>
						</li>
					))}
				</ul>
			</motion.div>
		</div>
	)
}

export default function Features() {
	return (
		<div className="pt-28 sm:pt-32 pb-20 mx-auto max-w-6xl px-6">
			<SectionHeading title="Features" subtitle="How AI enhances the filmmaking pipeline" />

			<div className="mt-14 space-y-20">
				<FeatureBlock
					title="AI for Camera Movement and Placement"
					Icon={Camera}
					description="Predictive tracking models your subject motion, automatically tuning rigs and drones to keep perfect framing."
					points={[
						'Smart Camera Control (auto-tracking, real-time focus, zoom)',
						'Optimal Camera Placement (script + lighting analysis)',
						'Automated Camera Movement (machine-learning rigs & drones)',
					]}
				>
					<CameraDemo />
				</FeatureBlock>

				<FeatureBlock
					mediaLeft={false}
					title="AI for Storyboarding"
					Icon={Clapperboard}
					description="Convert script pages into visual beats. Export boards instantly and iterate with collaborative notes."
					points={[
						'Script-to-Storyboard Generation',
						'Shot Prediction & Scene Visualization',
						'Collaborative Previsualization',
					]}
				>
					<StoryboardDemo />
				</FeatureBlock>

				<FeatureBlock
					title="AI for Real-Time Rendering"
					Icon={Cpu}
					description="Virtual production surfaces lighting presets, materials, and shadow tuning tailored to your creative brief."
					points={[
						'Faster Rendering',
						'Enhanced Realism',
						'Virtual Production Integration',
					]}
				>
					<RenderingDemo />
				</FeatureBlock>

				<FeatureBlock
					mediaLeft={false}
					title="AI in Scriptwriting and Story Development"
					Icon={FileText}
					description="AI serves as a creative co-writer, offering data-driven insights, inspiration, and structure to storytelling without replacing the human touch."
					points={[
						'Idea Generation & Plot Assistance (premise ideas, character arcs, dialogue suggestions)',
						'Script Structuring & Analysis (three-act structure, pacing issues, emotional beats)',
						'Dialogue Enhancement & Tone Adjustment (NLP and sentiment analysis for mood matching)',
					]}
				/>

				<FeatureBlock
					title="AI in Acting and Motion Capture"
					Icon={User}
					description="AI helps capture, enhance, and recreate performances with stunning precision, enabling markerless motion capture and digital doubles."
					points={[
						'AI-Driven Motion Capture (markerless mocap using cameras and deep learning)',
						'Digital Doubles & De-Aging (facial mapping for stunts, de-aging, historical figures)',
						'Performance Enhancement (facial expressions, lip-sync, emotional realism, voice cloning)',
					]}
				/>

				<FeatureBlock
					mediaLeft={false}
					title="AI in Post-Production and Editing"
					Icon={Film}
					description="Post-production has been drastically accelerated by AI, automating editing, color grading, audio cleanup, and VFX without compromising creativity."
					points={[
						'Automated Editing & Scene Assembly (rough cuts, best takes detection, continuity matching)',
						'Color Grading & Style Transfer (automatic tone matching, cinematic style application)',
						'Audio Cleanup and Sound Design (dialogue separation, ambient audio generation, Foley effects)',
						'Visual Effects and Restoration (rotoscoping, object removal, frame restoration, upscaling)',
					]}
				/>

				<FeatureBlock
					title="AI-Assisted Video Editing"
					Icon={Scissors}
					description="Generate pacing blueprints, rebalance segments, and keep editor and director aligned on rhythm."
					points={[
						'Edit blueprints tuned to music and tone',
						'Segment rebalancing suggestions',
						'Notes synced to the timeline',
					]}
				>
					<VideoEditorDemo />
				</FeatureBlock>

				<FeatureBlock
					title="Reference Shot Matching"
					Icon={Images}
					description="Pull cinematic references by mood and location to guide lighting, lensing, and production design."
					points={[
						'AI-driven visual references',
						'Mood and location aware search',
						'Instant lookbooks for crews',
					]}
				>
					<ShotMatcherDemo />
				</FeatureBlock>
			</div>
		</div>
	)
}


