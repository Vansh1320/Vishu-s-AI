import { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import { motion } from 'framer-motion'
import { Mail, Lock, LogIn } from 'lucide-react'

export default function Login() {
	const [form, setForm] = useState({ email: '', password: '' })
	const [status, setStatus] = useState('idle') // idle | error | success
	const [loading, setLoading] = useState(false)

	function onChange(e) {
		const { name, value } = e.target
		setForm(prev => ({ ...prev, [name]: value }))
	}

	function validate() {
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email.'
		if (form.password.length < 6) return 'Password must be at least 6 characters.'
		return null
	}

	async function onSubmit(e) {
		e.preventDefault()
		const err = validate()
		if (err) {
			setStatus('error')
			alert(err)
			return
		}

		setLoading(true)
		setStatus('idle')

		// TODO: Replace with actual API call
		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1000))
			
			// For now, just show success
			setStatus('success')
			// In production, you would:
			// const res = await fetch('/api/login', { ... })
			// if (res.ok) { redirect to dashboard }
		} catch (error) {
			setStatus('error')
			alert('Login failed. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="pt-28 sm:pt-32 pb-20 mx-auto max-w-md px-6">
			<SectionHeading title="Login" subtitle="Welcome back to SensationAI" />

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<form onSubmit={onSubmit} className="mt-10 space-y-5">
					<div>
						<label className="block text-sm text-white/80 mb-2 flex items-center gap-2">
							<Mail size={16} className="text-cyan-400" />
							Email
						</label>
						<input
							type="email"
							name="email"
							value={form.email}
							onChange={onChange}
							placeholder="your.email@example.com"
							className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder:text-white/40"
							required
						/>
					</div>

					<div>
						<label className="block text-sm text-white/80 mb-2 flex items-center gap-2">
							<Lock size={16} className="text-cyan-400" />
							Password
						</label>
						<input
							type="password"
							name="password"
							value={form.password}
							onChange={onChange}
							placeholder="Enter your password"
							className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder:text-white/40"
							required
						/>
					</div>

					<div className="flex items-center justify-between text-sm">
						<label className="flex items-center gap-2 text-white/70 cursor-pointer">
							<input type="checkbox" className="rounded border-white/10 bg-white/5" />
							Remember me
						</label>
						<Link to="/forgot-password" className="text-cyan-400 hover:text-cyan-300 transition">
							Forgot password?
						</Link>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-cyan-500/90 hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed px-6 font-semibold text-slate-950 transition shadow-[0_0_20px_rgba(34,211,238,0.35)]"
					>
						{loading ? (
							<>Loading...</>
						) : (
							<>
								<LogIn size={18} />
								Login
							</>
						)}
					</button>

					{status === 'error' && (
						<p className="text-red-400 text-sm text-center">Invalid email or password. Please try again.</p>
					)}
					{status === 'success' && (
						<p className="text-green-400 text-sm text-center">Login successful! Redirecting...</p>
					)}
				</form>

				<div className="mt-6 text-center text-sm text-white/70">
					Don't have an account?{' '}
					<Link to="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium transition">
						Sign up
					</Link>
				</div>
			</motion.div>
		</div>
	)
}

