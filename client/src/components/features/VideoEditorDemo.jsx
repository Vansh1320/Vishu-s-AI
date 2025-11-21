import { useMemo, useState } from 'react'

const defaultSegments = [
	{ id: 'hook', label: 'Hook', duration: 12, color: 'from-cyan-500/40 to-cyan-500/10', note: 'Open with kinetic moment' },
	{ id: 'setup', label: 'Setup', duration: 30, color: 'from-blue-500/40 to-blue-500/10', note: 'Introduce context & stakes' },
	{ id: 'performance', label: 'Performance', duration: 52, color: 'from-purple-500/40 to-purple-500/10', note: 'Showcase talent & VFX' },
	{ id: 'cta', label: 'CTA', duration: 16, color: 'from-slate-500/40 to-slate-500/10', note: 'Title & call-to-action overlay' },
]

function DurationSlider({ segment, onChange }) {
	return (
		<label className="flex items-center gap-3 text-sm text-white/80">
			<span className="w-24">{segment.label}</span>
			<input
				type="range"
				min={4}
				max={70}
				value={segment.duration}
				onChange={e => onChange(segment.id, Number(e.target.value))}
				className="flex-1 accent-cyan-400"
			/>
			<span className="w-10 text-right">{segment.duration}s</span>
		</label>
	)
}

export default function VideoEditorDemo() {
	const [segments, setSegments] = useState(defaultSegments)
	const [brief, setBrief] = useState('High-energy teaser with rhythm synced cuts and bold typography.')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const totalDuration = useMemo(() => segments.reduce((sum, s) => sum + s.duration, 0), [segments])

	function updateDuration(id, duration) {
		setSegments(prev => prev.map(s => (s.id === id ? { ...s, duration } : s)))
	}

	async function optimize() {
		try {
			setError('')
			setLoading(true)
			const base = import.meta.env.VITE_API_URL || 'http://localhost:4000'
			const res = await fetch(base + '/api/edit-plan', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ brief, segments }),
			})
			if (!res.ok) throw new Error('API error')
			const data = await res.json()
			if (Array.isArray(data.segments)) {
				setSegments(data.segments.map((s, idx) => ({
					id: s.id || `auto-${idx}`,
					label: s.label || `Segment ${idx + 1}`,
					duration: Math.max(4, Math.round(Number(s.duration) || 10)),
					note: s.note || '',
					color: defaultSegments[idx % defaultSegments.length].color,
				})))
			}
		} catch (e) {
			console.error(e)
			setError('Could not contact AI planner. Ensure the server is running.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="space-y-4">
			<div className="flex flex-col gap-3">
				<label className="text-sm text-white/80">
					Edit Brief
					<textarea
						value={brief}
						onChange={e => setBrief(e.target.value)}
						rows={3}
						className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400"
					/>
				</label>
				<div className="flex items-center justify-between gap-3 flex-wrap text-sm">
					<p className="text-white/60">Total duration: {totalDuration}s</p>
					<button
						onClick={optimize}
						disabled={loading}
						className="rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white px-4 h-10 disabled:opacity-60"
					>
						{loading ? 'Optimizing…' : 'AI Optimize'}
					</button>
				</div>
			</div>

			{error && <p className="text-sm text-red-400">{error}</p>}

			<div className="space-y-2">
				{segments.map(segment => (
					<DurationSlider key={segment.id} segment={segment} onChange={updateDuration} />
				))}
			</div>

			<div className="rounded-2xl border border-white/10 bg-white/5 p-4">
				<div className="mb-3 flex items-center justify-between text-sm text-white/70">
					<span>Timeline Overview</span>
					<span>Drag sliders to rebalance shots</span>
				</div>
				<div className="flex h-24 overflow-hidden rounded-xl border border-white/10">
					{segments.map(segment => (
						<div
							key={segment.id}
							style={{ flex: `${segment.duration} 0 auto` }}
							className={`relative flex items-center justify-center bg-gradient-to-br ${segment.color}`}
						>
							<span className="text-xs font-semibold text-white drop-shadow-sm">
								{segment.label} · {segment.duration}s
							</span>
							{segment.note && (
								<span className="absolute bottom-1 left-2 text-[10px] text-white/80">
									{segment.note}
								</span>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}


