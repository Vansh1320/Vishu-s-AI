import { useMemo, useRef, useState } from 'react'

function splitIntoShots(text) {
	return text
		.replace(/\n+/g, ' ')
		.split(/(?<=[.!?])\s+/)
		.map(s => s.trim())
		.filter(Boolean)
		.slice(0, 12)
}

function Panel({ idx, line }) {
	return (
		<div className="rounded-xl border border-white/10 bg-white/5 p-3">
			<div className="aspect-video w-full rounded-lg bg-gradient-to-br from-cyan-500/10 to-black/30 flex items-center justify-center text-cyan-400">#{idx+1}</div>
			<p className="mt-2 text-sm text-white/80 min-h-12">{line}</p>
		</div>
	)
}

export default function StoryboardDemo() {
	const [script, setScript] = useState('A drone flies over a neon city. The camera dives between towers. A character steps into a spotlight. The rain glistens as they walk forward. The city fades into a quiet room.')
	const panels = useMemo(() => splitIntoShots(script), [script])
	const exportRef = useRef(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	async function generateWithAI() {
		try {
			setError('')
			setLoading(true)
			const base = import.meta.env.VITE_API_URL || 'http://localhost:4000'
			const res = await fetch(base + '/api/storyboard', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ script })
			})
			if (!res.ok) throw new Error('API error ' + res.status)
			const data = await res.json()
			if (Array.isArray(data.shots) && data.shots.length) {
				setScript(data.shots.map(s=>s.endsWith('.')?s:s+'.').join(' '))
			}
		} catch (e) {
			console.error(e); setError('AI service unavailable. Is the server running on ' + (import.meta.env.VITE_API_URL || 'http://localhost:4000') + ' ?')
		}
		finally { setLoading(false) }
	}

	function exportPNG() {
		const node = exportRef.current
		const scale = 2
		const rect = node.getBoundingClientRect()
		const canvas = document.createElement('canvas')
		canvas.width = Math.floor(rect.width * scale)
		canvas.height = Math.floor(rect.height * scale)
		const ctx = canvas.getContext('2d')
		ctx.scale(scale, scale)
		ctx.fillStyle = '#0b1220'
		ctx.fillRect(0, 0, rect.width, rect.height)
		// simple render: draw boxes and text
		const gap = 12, cols = 3
		const panelW = (rect.width - gap*(cols-1)) / cols
		const panelH = panelW * 9/16 + 56
		ctx.font = '14px Poppins, sans-serif'
		ctx.fillStyle = 'rgba(255,255,255,0.85)'
		panels.forEach((line, i) => {
			const row = Math.floor(i / cols)
			const col = i % cols
			const x = col*(panelW+gap)
			const y = row*(panelH+gap)
			ctx.fillStyle = 'rgba(255,255,255,0.06)'
			ctx.strokeStyle = 'rgba(255,255,255,0.15)'
			ctx.lineWidth = 1
			ctx.fillRect(x, y, panelW, panelH)
			ctx.strokeRect(x, y, panelW, panelH)
			ctx.fillStyle = 'rgba(34,211,238,0.9)'
			ctx.fillRect(x+10, y+10, panelW-20, (panelW-20)*9/16)
			ctx.fillStyle = 'rgba(255,255,255,0.9)'
			ctx.fillText(`#${i+1} ${line.slice(0, 80)}`, x+12, y + (panelW-20)*9/16 + 30)
		})
		const link = document.createElement('a')
		link.download = 'storyboard.png'
		link.href = canvas.toDataURL('image/png')
		link.click()
	}

	return (
		<div>
			<label className="block text-sm text-white/80 mb-2">Script</label>
			<textarea value={script} onChange={e=>setScript(e.target.value)} rows="3" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400"></textarea>
			<div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
				<p className="text-white/60 text-sm">Generated shots: {panels.length}</p>
				<div className="flex items-center gap-2">
					<button disabled={loading} onClick={generateWithAI} className="rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white px-4 h-10 disabled:opacity-60">{loading ? 'Generating…' : 'AI Generate'}</button>
					<button onClick={exportPNG} className="rounded-lg bg-cyan-500/90 hover:bg-cyan-400 text-slate-950 font-medium px-4 h-10">Export PNG</button>
				</div>
			</div>
			{error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
			<div ref={exportRef} className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
				{panels.map((line, i)=> <Panel key={i} idx={i} line={line} />)}
			</div>
		</div>
	)
}


