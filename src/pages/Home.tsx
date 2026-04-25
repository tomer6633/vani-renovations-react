import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import TapToCall from '../components/TapToCall'
import { business } from '../data/BusinessData'

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible') }, { threshold: 0.15 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return ref
}

function QuoteForm() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', service: '', timeline: '', notes: '' })
  if (submitted) return (
    <div className="text-center py-12">
      <div className="text-5xl mb-4">✅</div>
      <h3 className="font-oswald text-2xl text-brand-primary mb-2">Quote Request Received!</h3>
      <p className="text-gray-600">We'll be in touch within 24 hours to discuss your project.</p>
    </div>
  )
  return (
    <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
        <input required type="text" placeholder="Jane Smith" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input required type="tel" placeholder="(519) 555-0100" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
        <select required value={form.service} onChange={e => setForm({...form, service: e.target.value})}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent">
          <option value="">Select a project...</option>
          {business.services.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
          <option value="Other">Other / Multiple</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Timeline</label>
        <select value={form.timeline} onChange={e => setForm({...form, timeline: e.target.value})}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent">
          <option value="">When do you want to start?</option>
          <option>ASAP</option><option>Within 1 month</option><option>1–3 months</option><option>Just exploring</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Describe your project</label>
        <textarea rows={3} placeholder="e.g. Full bathroom reno, new tile throughout, updated vanity and fixtures..." value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent resize-none" />
      </div>
      <div className="md:col-span-2">
        <button type="submit" className="w-full bg-brand-accent hover:opacity-90 text-white font-oswald text-lg tracking-wide py-4 rounded-lg transition">
          GET MY FREE QUOTE
        </button>
      </div>
    </form>
  )
}

export default function Home() {
  const s1 = useFadeIn(), s2 = useFadeIn(), s3 = useFadeIn(), s4 = useFadeIn()
  return (
    <div className="font-inter bg-white pb-16 md:pb-0">
      <Navbar />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={business.heroImage} alt="Renovation" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brand-dark/68" />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto pt-20">
          <p className="font-inter text-brand-accent uppercase tracking-widest text-sm mb-4">London, Ontario Renovation Specialists</p>
          <h1 className="font-oswald text-4xl md:text-6xl leading-tight mb-6">{business.tagline}</h1>
          <p className="text-lg text-gray-200 mb-8">{business.subtagline}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#quote" className="bg-brand-accent text-white font-oswald text-lg px-8 py-4 rounded-lg hover:opacity-90 transition">Get a Free Quote</a>
            <a href={business.telLink} className="border-2 border-white text-white font-oswald text-lg px-8 py-4 rounded-lg hover:bg-white hover:text-brand-dark transition">📞 Call Now</a>
          </div>
        </div>
      </section>
      <section className="bg-brand-primary text-white py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 gap-4 text-center">
          {[['5★','Google Rating'],['Quality','Craftsmanship'],['London, ON','Locally Trusted']].map(([v,l]) => (
            <div key={l}><div className="font-oswald text-2xl md:text-3xl text-brand-accent">{v}</div><div className="text-sm text-gray-300 mt-1">{l}</div></div>
          ))}
        </div>
      </section>
      <section className="py-20 px-4 bg-brand-light" id="services">
        <div ref={s1} className="fade-in max-w-6xl mx-auto">
          <h2 className="font-oswald text-4xl text-brand-primary text-center mb-3">Our Services</h2>
          <p className="text-center text-gray-500 mb-12">From bathrooms to basements — expert renovations at competitive prices.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {business.services.map(service => (
              <Link key={service.id} to={`/service/${service.id}`} className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-shadow duration-300">
                <div className="overflow-hidden h-48">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-oswald text-xl text-brand-primary mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                  <span className="inline-block mt-4 text-brand-accent font-medium text-sm">Learn More →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-4 bg-white">
        <div ref={s2} className="fade-in max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <img src={business.aboutImage} alt="Renovation team" className="rounded-2xl shadow-xl w-full object-cover h-80" />
          <div>
            <p className="text-brand-accent font-inter uppercase tracking-widest text-sm mb-3">About Vani Renovations</p>
            <h2 className="font-oswald text-4xl text-brand-primary mb-5">Built on Honesty & Craftsmanship</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Vani Renovations serves London homeowners who want quality work at a fair price — no surprise charges, no cut corners, no excuses.</p>
            <p className="text-gray-600 leading-relaxed mb-6">Bathrooms, flooring, stairs, kitchens — we've done it all, and we stand behind every project we complete.</p>
            <a href={business.telLink} className="inline-block bg-brand-primary text-white font-oswald px-6 py-3 rounded-lg hover:bg-brand-dark transition">📞 Call for a Free Quote</a>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 bg-brand-light">
        <div ref={s3} className="fade-in max-w-5xl mx-auto">
          <h2 className="font-oswald text-4xl text-brand-primary text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {business.reviews.map((r,i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow">
                <div className="text-yellow-400 text-xl mb-3">{'★'.repeat(r.rating)}</div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">"{r.text}"</p>
                <p className="font-oswald text-brand-primary">— {r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="quote" className="py-20 px-4 bg-white">
        <div ref={s4} className="fade-in max-w-2xl mx-auto">
          <h2 className="font-oswald text-4xl text-brand-primary text-center mb-3">Get a Free Quote</h2>
          <p className="text-center text-gray-500 mb-10">Tell us about your project and we'll be in touch within 24 hours.</p>
          <div className="bg-brand-light rounded-2xl p-8 shadow-md"><QuoteForm /></div>
        </div>
      </section>
      <footer className="bg-brand-dark text-gray-400 py-8 text-center px-4">
        <p className="font-oswald text-white text-xl mb-2">{business.name}</p>
        <p className="text-sm">{business.address} &nbsp;|&nbsp; <a href={business.telLink} className="text-brand-accent hover:underline">{business.phone}</a></p>
        <p className="text-xs mt-4 text-gray-600">© 2026 {business.name}. All rights reserved.</p>
      </footer>
      <TapToCall />
    </div>
  )
}
