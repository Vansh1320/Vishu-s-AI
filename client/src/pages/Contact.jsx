import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import { Youtube, Linkedin, Instagram } from 'lucide-react'

export default function Contact() {
	const [form, setForm] = useState({ name: '', email: '', message: '' })
	const [status, setStatus] = useState('idle') // idle | error | success

	function onChange(e) {
		const { name, value } = e.target
		setForm(prev => ({ ...prev, [name]: value }))
	}

	function validate() {
		if (!form.name.trim()) return 'Please enter your name.'
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email.'
		if (form.message.trim().length < 10) return 'Message must be at least 10 characters.'
		return null
	}

	function onSubmit(e) {
		e.preventDefault()
		const err = validate()
		if (err) {
			setStatus('error')
			alert(err)
			return
		}
		setStatus('success')
	}

	return (
		<div className="pt-28 sm:pt-32 pb-20 mx-auto max-w-4xl px-6">
			<SectionHeading title="Contact" subtitle="We'd love to hear from you" />

			<form onSubmit={onSubmit} className="mt-10 space-y-4">
				<div>
					<label className="block text-sm text-white/80">Name</label>
					<input name="name" value={form.name} onChange={onChange} className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400" />
				</div>
				<div>
					<label className="block text-sm text-white/80">Email</label>
					<input name="email" value={form.email} onChange={onChange} className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400" />
				</div>
				<div>
					<label className="block text-sm text-white/80">Message</label>
					<textarea name="message" rows="5" value={form.message} onChange={onChange} className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400" />
				</div>
				<button type="submit" className="inline-flex h-11 items-center justify-center rounded-xl bg-cyan-500/90 hover:bg-cyan-400 px-6 font-semibold text-slate-950 transition">
					Submit
				</button>
				{status === 'success' && (
					<p className="text-green-400">Thanks! We received your message.</p>
				)}
			</form>

			<div className="mt-12 flex items-center gap-4 text-white/80">
				<a href="#" aria-label="YouTube" className="hover:text-white"><Youtube size={20} /></a>
				<a href="#" aria-label="LinkedIn" className="hover:text-white"><Linkedin size={20} /></a>
				<a href="#" aria-label="Instagram" className="hover:text-white"><Instagram size={20} /></a>
			</div>
		</div>
	)
}


