import { useEffect, useRef, useState } from 'react'

// Simulated subject tracking and camera framing on a 2D stage.
export default function CameraDemo() {
	const canvasRef = useRef(null)
	const [mode, setMode] = useState('smooth') // smooth | fast | cinematic
	const [running, setRunning] = useState(true)
	const [prompt, setPrompt] = useState('Smooth follow with cinematic feel')

	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')

		let raf
		const DPR = Math.min(window.devicePixelRatio || 1, 2)

		const stage = { w: 900, h: 420 }
		const camera = { x: stage.w/2, y: stage.h/2, w: 360, h: 200 }
		const subject = { x: stage.w*0.2, y: stage.h*0.5, r: 10, vx: 1.8, vy: 1.2 }

		function resize() {
			const styleW = Math.min(900, canvas.parentElement.clientWidth)
			const styleH = (styleW / stage.w) * stage.h
			canvas.width = Math.floor(styleW * DPR)
			canvas.height = Math.floor(styleH * DPR)
			canvas.style.width = styleW + 'px'
			canvas.style.height = styleH + 'px'
			ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
		}

		function clamp(v, min, max) { return Math.max(min, Math.min(max, v)) }
		function lerp(a,b,t){ return a + (b-a)*t }

		function step() {
			ctx.clearRect(0,0,canvas.width,canvas.height)

			// update subject
			subject.x += subject.vx
			subject.y += subject.vy
			if (subject.x < 20 || subject.x > stage.w-20) subject.vx *= -1
			if (subject.y < 20 || subject.y > stage.h-20) subject.vy *= -1

			// AI camera: predict slight lead and reframe
			const lead = mode === 'fast' ? 24 : mode === 'cinematic' ? 40 : 30
			const targetX = clamp(subject.x + subject.vx * lead, camera.w/2, stage.w - camera.w/2)
			const targetY = clamp(subject.y + subject.vy * lead, camera.h/2, stage.h - camera.h/2)
			const follow = mode === 'fast' ? 0.25 : mode === 'cinematic' ? 0.06 : 0.12
			camera.x = lerp(camera.x, targetX, follow)
			camera.y = lerp(camera.y, targetY, follow)

			// draw stage
			ctx.fillStyle = '#0b1220'
			ctx.fillRect(0,0,canvas.width/DPR,canvas.height/DPR)
			ctx.strokeStyle = 'rgba(255,255,255,0.08)'
			for(let i=0;i<stage.w;i+=60){
				ctx.beginPath();ctx.moveTo(i*(canvas.width/DPR)/stage.w,0);ctx.lineTo(i*(canvas.width/DPR)/stage.w,canvas.height/DPR);ctx.stroke()
			}

			// draw subject
			const scaleX = (canvas.width/DPR)/stage.w
			const scaleY = (canvas.height/DPR)/stage.h
			ctx.beginPath()
			ctx.arc(subject.x*scaleX, subject.y*scaleY, subject.r, 0, Math.PI*2)
			ctx.fillStyle = 'rgba(34,211,238,1)'
			ctx.shadowColor = 'rgba(34,211,238,0.6)'
			ctx.shadowBlur = 12
			ctx.fill()
			ctx.shadowBlur = 0

			// draw camera viewport
			ctx.save()
			ctx.strokeStyle = 'rgba(34,211,238,0.8)'
			ctx.lineWidth = 2
			ctx.strokeRect((camera.x - camera.w/2)*scaleX, (camera.y - camera.h/2)*scaleY, camera.w*scaleX, camera.h*scaleY)
			ctx.restore()

			if (running) raf = requestAnimationFrame(step)
		}

		resize()
		step()
		window.addEventListener('resize', resize)
		return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
	}, [mode, running])

	return (
		<div>
			<div className="flex items-center justify-between mb-3 text-sm gap-3 flex-wrap">
				<div className="flex items-center gap-2">
					<label className="text-white/70">Mode:</label>
					<select value={mode} onChange={e=>setMode(e.target.value)} className="rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-slate-800 dark:text-white/90 px-2 py-1 outline-none focus:ring-2 focus:ring-cyan-400">
						<option value="smooth">Smooth</option>
						<option value="fast">Fast</option>
						<option value="cinematic">Cinematic</option>
					</select>
				</div>
				<div className="flex items-center gap-2">
					<input value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Describe camera behavior" className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 w-64" />
					<button onClick={async()=>{
						try {
							const base = import.meta.env.VITE_API_URL || 'http://localhost:4000'
							const res = await fetch(base + '/api/camera-plan', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ description: prompt }) })
							const data = await res.json()
							if (data?.mode) setMode(String(data.mode))
						} catch (e) { console.error(e) }
					}} className="rounded-lg border border-white/10 px-3 py-1 bg-white/5">AI Tune</button>
					<button onClick={()=>setRunning(v=>!v)} className="rounded-lg border border-white/10 px-3 py-1 bg-white/5">
						{running ? 'Pause' : 'Play'}
					</button>
				</div>
			</div>
			<canvas ref={canvasRef} className="w-full rounded-2xl border border-white/10 bg-black/20" />
			<p className="mt-3 text-white/70 text-sm">AI tracks the subject with predictive lead and adaptive smoothing to keep optimal framing.</p>
		</div>
	)
}


