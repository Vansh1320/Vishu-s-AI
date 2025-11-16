import { useEffect, useRef } from 'react'

export default function Background() {
	const canvasRef = useRef(null)

	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d', { alpha: true })

		let animationFrameId
		const DPR = Math.min(window.devicePixelRatio || 1, 2)

		const particles = []
		const particleCount = 120
		const baseSpeed = 0.2

		function resize() {
			const { innerWidth: w, innerHeight: h } = window
			canvas.width = Math.floor(w * DPR)
			canvas.height = Math.floor(h * DPR)
			canvas.style.width = w + 'px'
			canvas.style.height = h + 'px'
			ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
		}

		function initParticles() {
			particles.length = 0
			for (let i = 0; i < particleCount; i++) {
				particles.push({
					x: Math.random() * window.innerWidth,
					y: Math.random() * window.innerHeight,
					r: Math.random() * 2 + 0.5,
					a: Math.random() * Math.PI * 2,
					v: baseSpeed + Math.random() * 0.6,
				})
			}
		}

		function step() {
			ctx.clearRect(0, 0, canvas.width, canvas.height)

			const grad = ctx.createRadialGradient(
				canvas.width / (2 * DPR),
				canvas.height / (3 * DPR),
				10,
				canvas.width / (2 * DPR),
				canvas.height / (3 * DPR),
				Math.max(canvas.width, canvas.height) / DPR
			)
			grad.addColorStop(0, 'rgba(34,211,238,0.06)')
			grad.addColorStop(1, 'rgba(0,0,0,0)')
			ctx.fillStyle = grad
			ctx.fillRect(0, 0, canvas.width, canvas.height)

			for (let i = 0; i < particles.length; i++) {
				for (let j = i + 1; j < particles.length; j++) {
					const dx = particles[i].x - particles[j].x
					const dy = particles[i].y - particles[j].y
					const dist = Math.hypot(dx, dy)
					if (dist < 110) {
						const alpha = 1 - dist / 110
						ctx.strokeStyle = `rgba(34,211,238,${0.12 * alpha})`
						ctx.lineWidth = 1
						ctx.beginPath()
						ctx.moveTo(particles[i].x, particles[i].y)
						ctx.lineTo(particles[j].x, particles[j].y)
						ctx.stroke()
					}
				}
			}

			for (const p of particles) {
				p.x += Math.cos(p.a) * p.v
				p.y += Math.sin(p.a) * p.v
				p.a += (Math.random() - 0.5) * 0.05

				if (p.x < -20) p.x = window.innerWidth + 20
				if (p.x > window.innerWidth + 20) p.x = -20
				if (p.y < -20) p.y = window.innerHeight + 20
				if (p.y > window.innerHeight + 20) p.y = -20

				ctx.beginPath()
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
				ctx.fillStyle = 'rgba(34,211,238,0.9)'
				ctx.shadowColor = 'rgba(34,211,238,0.45)'
				ctx.shadowBlur = 12
				ctx.fill()
				ctx.shadowBlur = 0
			}

			animationFrameId = requestAnimationFrame(step)
		}

		resize()
		initParticles()
		step()
		window.addEventListener('resize', resize)

		return () => {
			cancelAnimationFrame(animationFrameId)
			window.removeEventListener('resize', resize)
		}
	}, [])

	return (
		<div className="pointer-events-none absolute inset-0 -z-10">
			<canvas ref={canvasRef} className="h-full w-full"></canvas>
		</div>
	)
}


