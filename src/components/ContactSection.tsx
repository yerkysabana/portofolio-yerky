import React, { useState } from 'react';
import { ArrowRight, Check, Send, AlertCircle } from 'lucide-react';
import { profileData } from '../data/portfolioData';
import { triggerHaptic } from '../utils/haptics';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCopyEmail = async () => {
    triggerHaptic('success');
    try {
      await navigator.clipboard.writeText(profileData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerHaptic('medium');
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profileData.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `[Portofolio Yerky] Pesan Baru dari ${formData.name}: ${formData.subject}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json();
      if (response.ok && (data.success === 'true' || data.success === true || (data.message && data.message.includes('Activation')))) {
        setSubmitted(true);
        triggerHaptic('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 8000);
      } else {
        throw new Error(data.message || 'Gagal mengirim pesan ke email.');
      }
    } catch (err: any) {
      triggerHaptic('medium');
      setErrorMessage(
        err?.message || 'Koneksi terganggu. Anda juga dapat langsung mengirim email ke yerkysabana1994@gmail.com.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/yerkysabana' },
    { name: 'LinkedIn', url: 'https://linkedin.com' },
    { name: 'Instagram', url: 'https://instagram.com' },
    { name: 'WhatsApp', url: 'https://wa.me/6281327450149' },
  ];

  return (
    <section id="kontak" className="py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Contact Pitch & Direct Channels */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-[#C6FF3D] tracking-[0.2em] uppercase">
                04 / HUBUNGI SAYA
              </span>
              <span className="h-px w-8 bg-[#C6FF3D]/40"></span>
            </div>

            <h2 className="font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase leading-tight mb-6">
              Ayo Bikin Sesuatu <br />
              Yang Luar Biasa <br />
              <span className="text-[#C6FF3D] underline decoration-[#C6FF3D]/40 decoration-wavy decoration-1">
                Bersama.
              </span>
            </h2>

            <p className="text-[#8F909A] text-base max-w-lg mb-8 leading-relaxed">
              Punya ide produk baru, kebutuhan pembaruan desain aplikasi, atau sekadar ingin
              mendiskusikan peluang kolaborasi? Inbox saya selalu terbuka.
            </p>

            {/* Direct Contact Chips */}
            <div className="space-y-3 mb-10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#8F909A] uppercase w-20">Email:</span>
                <button
                  onClick={handleCopyEmail}
                  className="text-sm font-mono text-white hover:text-[#C6FF3D] flex items-center gap-2 group transition-colors cursor-pointer bg-transparent border-0 p-0"
                >
                  <span>{profileData.email}</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 group-hover:border-[#C6FF3D] text-[#C6FF3D] flex items-center gap-1">
                    {copied ? (
                      <>
                        <Check className="w-2.5 h-2.5 text-[#C6FF3D]" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      'Salin'
                    )}
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#8F909A] uppercase w-20">WhatsApp:</span>
                <a
                  href="https://wa.me/6281327450149"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono text-white hover:text-[#C6FF3D] transition-colors"
                >
                  0813-2745-0149
                </a>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#8F909A] uppercase w-20">Lokasi:</span>
                <span className="text-sm text-zinc-300">{profileData.location}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#8F909A] uppercase w-20">Respons:</span>
                <span className="text-sm text-[#C6FF3D] font-mono">Kurang dari 24 Jam</span>
              </div>
            </div>
          </div>

          {/* Social Links with Underline Animation */}
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#8F909A] mb-4">
              Temukan Saya di Web:
            </p>
            <div className="flex flex-wrap gap-6 text-sm font-mono uppercase">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => triggerHaptic('light')}
                  className="text-zinc-300 hover:text-[#C6FF3D] relative group pb-1 transition-colors"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C6FF3D] group-hover:w-full transition-all duration-200"></span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Modern Minimalist Form */}
        <div className="lg:col-span-5">
          <div className="spotlight-card rounded-3xl bg-[#121216]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#8F909A] mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full bg-transparent border-0 border-b border-white/15 px-0 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:ring-0 focus:border-[#C6FF3D] transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#8F909A] mb-2">
                  Alamat Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="nama@domain.com"
                  className="w-full bg-transparent border-0 border-b border-white/15 px-0 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:ring-0 focus:border-[#C6FF3D] transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#8F909A] mb-2">
                  Perihal / Layanan
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Pengembangan Web / Mobile React Native"
                  className="w-full bg-transparent border-0 border-b border-white/15 px-0 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:ring-0 focus:border-[#C6FF3D] transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#8F909A] mb-2">
                  Detail Pesan
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Ceritakan tujuan proyek atau pertanyaan Anda..."
                  className="w-full bg-transparent border-0 border-b border-white/15 px-0 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:ring-0 focus:border-[#C6FF3D] transition-colors text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 group flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#C6FF3D] text-[#0A0A0C] font-bold text-sm hover:bg-[#B5F228] transition-all duration-200 cursor-pointer disabled:opacity-60 shadow-[0_0_20px_rgba(198,255,61,0.2)]"
              >
                {isSubmitting ? (
                  <>
                    <Send className="w-4 h-4 animate-spin text-[#0A0A0C]" />
                    <span>Mengirimkan...</span>
                  </>
                ) : (
                  <>
                    <span>Kirimkan Pesan</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </button>

              {submitted && (
                <div className="p-4 rounded-xl bg-[#C6FF3D]/10 border border-[#C6FF3D]/30 text-xs font-mono text-[#C6FF3D] text-center animate-in fade-in duration-200">
                  ✓ Pesan berhasil terkirim ke email yerkysabana1994@gmail.com! Saya akan membalas segera.
                </div>
              )}

              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-400 text-center animate-in fade-in duration-200 flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
