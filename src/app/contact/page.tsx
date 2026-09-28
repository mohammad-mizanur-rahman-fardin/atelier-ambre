'use client';

import React, { useState } from 'react';
import PageShell from '@/components/PageShell';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ChevronDown,
  MessageSquare,
  User,
  Sparkles,
} from 'lucide-react';
import { useToastStore } from '@/store/toast-store';

const faqs = [
  {
    question: 'How can I identify the right fragrance for me?',
    answer:
      'We recommend visiting our Gulshan flagship showroom for a complimentary scent consultation with our fragrance advisors. Alternatively, use our online Scent Quiz on the homepage, or describe your preferences through the Concierge Chat — our team will curate personalized recommendations based on your olfactory profile.',
  },
  {
    question: 'Are your fragrances suitable for sensitive skin?',
    answer:
      'All Atelier Ambre fragrances are formulated with premium-grade ingredients and are dermatologically tested. However, we recommend applying fragrance to pulse points on clothing rather than directly on skin if you have known sensitivities. A patch test is always advisable for new users.',
  },
  {
    question: 'Do you offer gift wrapping or custom engraving?',
    answer:
      'Yes! Every order ships in our signature matte black gift packaging with gold foil branding. We also offer complimentary engraving (up to 15 characters) on our 100ml flacons. Simply mention your engraving request in the order notes during checkout.',
  },
  {
    question: 'Can I request a bespoke fragrance commission?',
    answer:
      'Absolutely. Our master perfumer accepts a limited number of bespoke commissions each quarter. The process involves a 90-minute consultation (in-person or virtual), followed by 3-4 rounds of accord development over 8-12 weeks. Contact our concierge desk to learn more about pricing and availability.',
  },
  {
    question: 'What is your international shipping policy?',
    answer:
      'Currently, Atelier Ambre ships exclusively within Bangladesh. We are working on expanding to international markets in early 2027. Sign up for our newsletter to be notified when international shipping becomes available.',
  },
];

const subjects = [
  'General Inquiry',
  'Fragrance Consultation',
  'Bespoke Commission',
  'Order Support',
  'Wholesale & Partnership',
  'Press & Media',
  'Careers',
];

export default function ContactPage() {
  const { addToast } = useToastStore();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      addToast({ type: 'error', title: 'Missing Fields', message: 'Please fill in all required fields.' });
      return;
    }
    setIsSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSending(false);
    addToast({
      type: 'success',
      title: 'Message Sent',
      message: 'Our concierge team will respond within 24 hours.',
      duration: 5000,
    });
    setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
  };

  return (
    <PageShell>
      <div className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <section className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-amber/40" />
              <Sparkles className="w-4 h-4 text-amber/60" />
              <div className="w-12 h-px bg-amber/40" />
            </div>
            <p className="text-amber text-xs font-medium tracking-[0.3em] uppercase mb-4">
              Concierge Desk
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-primary mb-4">
              Get in Touch
            </h1>
            <div className="w-16 h-0.5 bg-amber rounded-full mx-auto mb-6" />
            <p className="text-text-secondary max-w-xl mx-auto text-sm leading-relaxed">
              Whether you&apos;re seeking your signature scent or have questions about an existing order,
              our fragrance concierge is here to assist with white-glove service.
            </p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-amber" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg font-semibold text-text-primary">
                      Send a Message
                    </h2>
                    <p className="text-xs text-text-muted">We typically respond within 24 hours</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="text-xs font-medium text-text-secondary mb-1.5 block">
                        Full Name <span className="text-error">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your full name"
                          className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs font-medium text-text-secondary mb-1.5 block">
                        Email <span className="text-error">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@example.com"
                          className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div>
                      <label className="text-xs font-medium text-text-secondary mb-1.5 block">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+880 1700-000000"
                          className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber transition-colors"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="text-xs font-medium text-text-secondary mb-1.5 block">
                        Subject
                      </label>
                      <div className="relative">
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-amber transition-colors appearance-none"
                        >
                          {subjects.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs font-medium text-text-secondary mb-1.5 block">
                      Message <span className="text-error">*</span>
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full flex items-center justify-center gap-2 bg-amber hover:bg-amber-light text-noir font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-amber/20 active:scale-[0.98] disabled:opacity-60"
                  >
                    {isSending ? (
                      <div className="w-5 h-5 border-2 border-noir/30 border-t-noir rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Flagship Showroom */}
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="font-serif text-lg font-semibold text-text-primary mb-4">
                  Flagship Showroom
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-text-secondary leading-relaxed">
                      Atelier Ambre Experience Center
                      <br />
                      Gulshan Avenue, Road 137
                      <br />
                      Dhaka 1212, Bangladesh
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-amber flex-shrink-0" />
                    <div>
                      <p className="text-sm text-text-secondary">+880 1700-000000</p>
                      <p className="text-sm text-text-secondary">+880 1800-000000</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-amber flex-shrink-0" />
                    <span className="text-sm text-text-secondary">concierge@atelierambre.com</span>
                  </li>
                </ul>
              </div>

              {/* Business Hours */}
              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-amber" />
                  <h3 className="font-serif text-lg font-semibold text-text-primary">
                    Business Hours
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {[
                    { day: 'Saturday – Thursday', time: '10:00 AM – 9:00 PM' },
                    { day: 'Friday', time: '2:00 PM – 9:00 PM' },
                    { day: 'Public Holidays', time: '11:00 AM – 7:00 PM' },
                  ].map((slot) => (
                    <li key={slot.day} className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">{slot.day}</span>
                      <span className="text-text-primary font-medium">{slot.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Response Promise */}
              <div className="rounded-2xl border border-amber/20 bg-amber/5 p-6 text-center">
                <p className="text-sm text-amber font-medium mb-1">Concierge Promise</p>
                <p className="text-xs text-text-secondary leading-relaxed">
                  All inquiries receive a personal response within 24 hours. VIP and bespoke commission
                  clients receive priority same-day attention.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="mt-20">
            <div className="text-center mb-12">
              <p className="text-amber text-xs font-medium tracking-[0.3em] uppercase mb-3">
                Common Questions
              </p>
              <h2 className="font-serif text-3xl font-bold text-text-primary">
                Frequently Asked
              </h2>
              <div className="w-16 h-0.5 bg-amber mt-3 rounded-full mx-auto" />
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border-subtle overflow-hidden bg-surface"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-surface-hover transition-colors"
                  >
                    <span className="text-sm font-medium text-text-primary pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-text-muted flex-shrink-0 transition-transform duration-300 ${
                        openFaq === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === idx ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="px-6 pb-4 text-sm text-text-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
