import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { Menu, X } from 'lucide-react'
import logoImg from '../assets/Logo.jpg'

export default function Navbar() {
	const [open, setOpen] = useState(false)

	function NavItem({ to, children }) {
		return (
			<NavLink
				to={to}
				className={({ isActive }) =>
					`transition hover:text-white ${isActive ? 'text-white' : 'text-white/80'}`
				}
				onClick={() => setOpen(false)}
			>
				{children}
			</NavLink>
		)
	}

	return (
		<header className="fixed top-0 left-0 right-0 z-20">
			<nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mt-4 rounded-2xl backdrop-blur-md border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
					<div className="flex h-16 items-center justify-between px-4 sm:px-6 text-slate-900 dark:text-white">
						<Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
							<img
								src={logoImg}
								alt="Hybrid AI logo"
								className="h-10 w-10 rounded-full object-cover border border-white/20 shadow-[0_0_12px_rgba(0,0,0,0.25)]"
								loading="lazy"
							/>
							<span>
								Sensation<span className="text-cyan-400">AI</span>
							</span>
						</Link>

						<ul className="hidden md:flex items-center gap-8 text-sm">
							<li><NavItem to="/">Home</NavItem></li>
							<li><NavItem to="/features">Features</NavItem></li>
							<li><NavItem to="/about">About</NavItem></li>
							<li><NavItem to="/contact">Contact</NavItem></li>
						</ul>

						<div className="flex items-center gap-3">
							<ThemeToggle />
							<button className="hidden sm:inline-flex px-4 h-10 rounded-lg border border-black/10 dark:border-white/10 text-slate-800 dark:text-white/90 hover:text-slate-900 dark:hover:text-white hover:border-black/20 dark:hover:border-white/20 transition">
								Login
							</button>
							<button className="hidden sm:inline-flex px-4 h-10 rounded-lg bg-cyan-500/90 hover:bg-cyan-400 text-slate-950 font-medium transition shadow-[0_0_20px_rgba(34,211,238,0.35)]">
								Sign Up
							</button>
							<button className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 dark:border-white/10 text-slate-800 dark:text-white/90" onClick={() => setOpen(v => !v)} aria-label="Menu">
								{open ? <X size={18} /> : <Menu size={18} />}
							</button>
						</div>
					</div>
					{open && (
						<div className="md:hidden px-4 pb-4">
							<div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-4 text-sm text-slate-900 dark:text-white/90 space-y-3">
								<NavItem to="/">Home</NavItem>
								<NavItem to="/features">Features</NavItem>
								<NavItem to="/about">About</NavItem>
								<NavItem to="/contact">Contact</NavItem>
							</div>
						</div>
					)}
				</div>
			</nav>
		</header>
	)
}
