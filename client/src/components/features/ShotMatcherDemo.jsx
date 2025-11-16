import { useEffect, useState } from 'react'

const presets = [
	{ mood: 'Neon Noir', location: 'Rooftop' },
	{ mood: 'Sundance Indie', location: 'Cabin Interior' },
	{ mood: 'Sci-Fi Lab', location: 'Industrial Warehouse' },
]

export default function ShotMatcherDemo() {
	const [mood, setMood] = useState('Neon Noir')
	const [location, setLocation] = useState('Rooftop')
	const [refs, setRefs] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		fetchRefs()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	async function fetchRefs(e) {
		e && e.preventDefault()
		try {
			setError('')
			setLoading(true)
			const base = import.meta.env.VITE_API_URL || 'http://localhost:4000'
			const res = await fetch(base + '/api/shot-matcher', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ mood, location }),
			})
			if (!res.ok) throw new Error('API error')
			const data = await res.json()
			if (Array.isArray(data.references)) setRefs(data.references)
		} catch (err) {
			console.error(err)
			setError('Could not fetch references. Falling back to defaults.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="space-y-4">
			<form onSubmit={fetchRefs} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
				<label className="flex flex-col gap-1">
					<span className="text-white/70">Mood</span>
					<input value={mood} onChange={e=>setMood(e.target.value)} list="shot-moods" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400" />
				</label>
				<label className="flex flex-col gap-1">
					<span className="text-white/70">Location</span>
					<input value={location} onChange={e=>setLocation(e.target.value)} list="shot-locations" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400" />
				</label>
				<div className="flex items-end">
					<button type="submit" disabled={loading} className="w-full rounded-lg bg-cyan-500/90 hover:bg-cyan-400 text-slate-950 font-semibold h-10 disabled:opacity-60">
						{loading ? 'Matching…' : 'AI Match' }
					</button>
				</div>
			</form>

			<datalist id="shot-moods">
				{presets.map(p => <option key={`${p.mood}-m`} value={p.mood} />)}
			</datalist>
			<datalist id="shot-locations">
				{presets.map(p => <option key={`${p.location}-l`} value={p.location} />)}
			</datalist>

			{error && <p className="text-sm text-red-400">{error}</p>}

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{refs.map((ref, idx) => (
					<div key={idx} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
						<div className="aspect-video w-full bg-black/30">
							{ref.image ? (
								<img src={ref.image} alt={ref.title} className="h-full w-full object-cover" loading="lazy" />
							) : (
								<div className="h-full w-full flex items-center justify-center text-cyan-400 text-sm">Reference #{idx + 1}</div>
							)}
						</div>
						<div className="p-4 space-y-1">
							<h4 className="text-lg font-semibold">{ref.title || `Reference ${idx + 1}`}</h4>
							<p className="text-sm text-white/70">{ref.description || 'Cinematic framing suggestion.'}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}


