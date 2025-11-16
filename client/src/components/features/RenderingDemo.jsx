import { useEffect, useRef, useState } from 'react'

// Three.js is optional dep; remind user to install if missing
export default function RenderingDemo() {
	const mountRef = useRef(null)
	const [preset, setPreset] = useState('medium') // low | medium | high
	const [prompt, setPrompt] = useState('cyan sci-fi glowing cube')

	useEffect(() => {
		let THREE
		let renderer, scene, camera, cube, light
		let frame

		async function start() {
			try {
				THREE = await import('three')
			} catch (e) {
				const el = mountRef.current
				if (el) el.innerHTML = '<div class="text-red-400">Install dependency: npm i three</div>'
				return
			}

			const canvasContainer = mountRef.current
			scene = new THREE.Scene()
			scene.background = null

			camera = new THREE.PerspectiveCamera(60, 16/9, 0.1, 100)
			camera.position.set(2.5, 1.8, 3.2)

				renderer = new THREE.WebGLRenderer({ antialias: preset !== 'low', alpha: true })
			renderer.setPixelRatio(preset === 'high' ? Math.min(window.devicePixelRatio, 2) : preset === 'medium' ? 1.25 : 1)
			const initialW = canvasContainer.clientWidth
			const initialH = Math.floor(initialW * 9/16)
			renderer.setSize(initialW, initialH)
			renderer.shadowMap.enabled = preset !== 'low'
			renderer.shadowMap.type = THREE.PCFSoftShadowMap
			canvasContainer.innerHTML = ''
			canvasContainer.appendChild(renderer.domElement)
			canvasContainer.style.height = initialH + 'px'

			const geo = new THREE.BoxGeometry(1,1,1)
			let matParams = { color: 0x00bfff, metalness: 0.4, roughness: 0.3 }
			try {
				if (mountRef.current?.dataset?.material) {
					const m = JSON.parse(mountRef.current.dataset.material)
					if (m?.color) matParams.color = new THREE.Color(m.color)
					if (typeof m?.metalness === 'number') matParams.metalness = m.metalness
					if (typeof m?.roughness === 'number') matParams.roughness = m.roughness
				}
			} catch {}
			const mat = new THREE.MeshStandardMaterial(matParams)
			cube = new THREE.Mesh(geo, mat)
			cube.castShadow = true
			scene.add(cube)

			const plane = new THREE.Mesh(
				new THREE.PlaneGeometry(6, 6),
				new THREE.MeshStandardMaterial({ color: 0x0a0a0a })
			)
			plane.rotation.x = -Math.PI/2
			plane.position.y = -1
			plane.receiveShadow = true
			scene.add(plane)

			light = new THREE.SpotLight(0xffffff, 2)
			light.position.set(3, 5, 2)
			light.castShadow = preset !== 'low'
			scene.add(light)

			const ambient = new THREE.AmbientLight(0x404040, 1.2)
			scene.add(ambient)

			function onResize() {
				const w = canvasContainer.clientWidth
				const h = Math.floor(w * 9/16)
				renderer.setSize(w, h)
				canvasContainer.style.height = h + 'px'
				camera.aspect = w / h
				camera.updateProjectionMatrix()
			}
			window.addEventListener('resize', onResize)

			const startTime = performance.now()
			function animate() {
				frame = requestAnimationFrame(animate)
				const t = (performance.now() - startTime) / 1000
				cube.rotation.x = t * 0.7
				cube.rotation.y = t * 1.0
				renderer.render(scene, camera)
			}
			animate()

			return () => {
				cancelAnimationFrame(frame)
				window.removeEventListener('resize', onResize)
				if (renderer) {
					renderer.dispose()
					canvasContainer.innerHTML = ''
				}
			}
		}

		const cleanupPromise = start()
		return () => { cleanupPromise && cleanupPromise.then(fn=>fn && fn()) }
	}, [preset])

	return (
		<div>
			<div className="flex items-center justify-between mb-3 text-sm gap-3 flex-wrap">
				<div className="flex items-center gap-2">
					<label className="text-white/70">Quality:</label>
					<select value={preset} onChange={e=>setPreset(e.target.value)} className="rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-slate-800 dark:text-white/90 px-2 py-1 outline-none focus:ring-2 focus:ring-cyan-400">
						<option value="low">Low (fast)</option>
						<option value="medium">Medium</option>
						<option value="high">High (best)</option>
					</select>
				</div>
				<div className="flex items-center gap-2">
					<input value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Describe material…" className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 w-64" />
					<button onClick={async()=>{
						try {
							const base = import.meta.env.VITE_API_URL || 'http://localhost:4000'
							const res = await fetch(base + '/api/render-preset', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ prompt }) })
							const data = await res.json()
							// apply by updating inline material after next render tick
							// note: keeps it simple by storing on element dataset for use effect to pick up on next mount
							mountRef.current && (mountRef.current.dataset.material = JSON.stringify(data))
							// trigger re-mount
							setPreset(p=>p)
						} catch (e) { console.error(e) }
					}} className="rounded-lg border border-white/10 px-3 py-1 bg-white/5">AI Material</button>
				</div>
			</div>
			<div ref={mountRef} className="w-full rounded-2xl border border-white/10 bg-black/20 relative" />
		</div>
	)
}


