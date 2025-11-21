import { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import { motion } from 'framer-motion'
import { Mail, Lock, User, LogIn } from 'lucide-react'

export default function Signup() {
	const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
	const [status, setStatus] = useState('idle') // idle | error | success
	const [loading, setLoading] = useState(false)

	function onChange(e) {
		const { name, value } = e.target
		setForm(prev => ({ ...prev, [name]: value }))
	}

	function validate() {
		if (!form.name.trim()) return 'Please enter your name.'
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email.'
		if (form.password.length < 6) return 'Password must be at least 6 characters.'
		if (form.password !== form.confirmPassword) return 'Passwords do not match.'
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
			// const res = await fetch('/api/signup', { ... })
			// if (res.ok) { redirect to dashboard or login }
		} catch (error) {
			setStatus('error')
			alert('Sign up failed. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="pt-28 sm:pt-32 pb-20 mx-auto max-w-md px-6">
			<SectionHeading title="Sign Up" subtitle="Create your SensationAI account" />

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<form onSubmit={onSubmit} className="mt-10 space-y-5">
					<div>
						<label className="block text-sm text-white/80 mb-2 flex items-center gap-2">
							<User size={16} className="text-cyan-400" />
							Full Name
						</label>
						<input
							type="text"
							name="name"
							value={form.name}
							onChange={onChange}
							placeholder="John Doe"
							className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder:text-white/40"
							required
						/>
					</div>

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
							placeholder="At least 6 characters"
							className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder:text-white/40"
							required
						/>
					</div>

					<div>
						<label className="block text-sm text-white/80 mb-2 flex items-center gap-2">
							<Lock size={16} className="text-cyan-400" />
							Confirm Password
						</label>
						<input
							type="password"
							name="confirmPassword"
							value={form.confirmPassword}
							onChange={onChange}
							placeholder="Re-enter your password"
							className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder:text-white/40"
							required
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-cyan-500/90 hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed px-6 font-semibold text-slate-950 transition shadow-[0_0_20px_rgba(34,211,238,0.35)]"
					>
						{loading ? (
							<>Creating account...</>
						) : (
							<>
								<LogIn size={18} />
								Sign Up
							</>
						)}
					</button>

					{status === 'error' && (
						<p className="text-red-400 text-sm text-center">Sign up failed. Please check your information and try again.</p>
					)}
					{status === 'success' && (
						<p className="text-green-400 text-sm text-center">Account created successfully! Redirecting to login...</p>
					)}
				</form>

				<div className="mt-6 text-center text-sm text-white/70">
					Already have an account?{' '}
					<Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition">
						Login
					</Link>
				</div>
			</motion.div>
		</div>
	)
}

