import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
	const [dark, setDark] = useState(false)

	useEffect(() => {
		const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
		const stored = localStorage.getItem('theme')
		const initialDark = stored ? stored === 'dark' : prefersDark
		setDark(initialDark)
		updateHtml(initialDark)
	}, [])

	function updateHtml(isDark) {
		const root = document.documentElement
		if (isDark) root.classList.add('dark')
		else root.classList.remove('dark')
	}

	function toggle() {
		setDark(prev => {
			const next = !prev
			localStorage.setItem('theme', next ? 'dark' : 'light')
			updateHtml(next)
			return next
		})
	}

	return (
		<button
			onClick={toggle}
			className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/90 hover:text-white hover:border-white/20 transition"
			aria-label="Toggle theme"
		>
			{dark ? <Sun size={18} /> : <Moon size={18} />}
		</button>
	)
}


