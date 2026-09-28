'use client';

import React from 'react';
import PageShell from '@/components/PageShell';
import { Shield, Lock, Eye, Cookie, Server, FileText, Sparkles } from 'lucide-react';

const sections = [
  {
    icon: Eye,
    title: '1. Information We Collect',
    content: [
      'When you interact with Atelier Ambre — whether browsing our collection, placing an order, or contacting our concierge desk — we may collect the following categories of information:',
      '**Personal Identification Data:** Full name, email address, phone number, and delivery address provided during checkout or account creation.',
      '**Payment Information:** We do not directly store your credit/debit card numbers. All payment processing is handled securely through SSLCommerz, a PCI-DSS Level 1 compliant payment gateway. We only retain transaction reference IDs and validation IDs for order verification.',
      '**Browsing & Usage Data:** Anonymous analytics data such as pages viewed, time on site, device type, browser version, and referring sources. This data is collected via standard web analytics and contains no personally identifiable information.',
      '**Communication Records:** Messages sent through our contact form, concierge chat, or email correspondence, retained for quality assurance and order support continuity.',
    ],
  },
  {
    icon: FileText,
    title: '2. How We Use Your Information',
    content: [
      'Your data is used exclusively for the following purposes:',
      '**Order Fulfillment:** Processing, packaging, and delivering your fragrance orders to the specified address within Bangladesh.',
      '**Customer Communication:** Sending order confirmations, delivery updates, and responding to concierge inquiries.',
      '**Service Improvement:** Analyzing aggregate browsing patterns to improve our website experience, product recommendations, and collection curation.',
      '**Legal Compliance:** Meeting regulatory obligations under Bangladesh Information and Communication Technology Act, 2006 and Digital Security Act, 2018.',
      'We never sell, rent, or trade your personal information to third-party marketers or data brokers. Period.',
    ],
  },
  {
    icon: Lock,
    title: '3. Data Security & Encryption',
    content: [
      'We implement industry-standard security measures to protect your personal information:',
      '**SSL/TLS Encryption:** All data transmitted between your browser and our servers is encrypted using 256-bit SSL/TLS certificates, ensuring end-to-end protection.',
      '**Payment Gateway Compliance:** All payment transactions are processed through SSLCommerz, which is PCI-DSS Level 1 certified — the highest level of payment security standards in the industry.',
      '**Secure Storage:** Personal data at rest is encrypted using AES-256 encryption and stored on access-controlled infrastructure with regular security audits.',
      '**Access Controls:** Only authorized Atelier Ambre personnel with a legitimate business need can access customer data, and all access is logged and monitored.',
    ],
  },
  {
    icon: Cookie,
    title: '4. Cookies & Local Storage',
    content: [
      'Our website uses minimal cookies and local browser storage to enhance your experience:',
      '**Essential Storage:** Theme preference (dark/light mode), shopping cart contents, and authentication session tokens are stored locally in your browser using localStorage. This data never leaves your device and is not transmitted to external servers.',
      '**No Third-Party Tracking Cookies:** We do not deploy third-party advertising cookies, retargeting pixels, or cross-site tracking mechanisms.',
      '**Session Management:** Authentication tokens stored under the key "atelier_ambre_session" enable persistent login across browser sessions. Clearing your browser data or signing out removes this token immediately.',
    ],
  },
  {
    icon: Server,
    title: '5. Data Retention & Deletion',
    content: [
      '**Order Records:** We retain order history for a minimum of 3 years for warranty, return eligibility, and regulatory compliance purposes.',
      '**Account Data:** Your profile information is retained for as long as your account remains active. You may request account deletion at any time by contacting concierge@atelierambre.com.',
      '**Communication Logs:** Concierge correspondence is retained for 12 months after the last interaction, then automatically purged.',
      '**Right to Erasure:** You have the right to request complete deletion of your personal data from our systems. We will process such requests within 30 business days and confirm deletion via email.',
    ],
  },
  {
    icon: Shield,
    title: '6. Your Rights',
    content: [
      'As a customer of Atelier Ambre, you have the following rights regarding your personal data:',
      '**Access:** Request a copy of all personal information we hold about you.',
      '**Correction:** Request correction of any inaccurate or incomplete information.',
      '**Deletion:** Request permanent deletion of your personal data (subject to legal retention requirements).',
      '**Objection:** Object to the processing of your data for specific purposes.',
      '**Portability:** Receive your personal data in a structured, machine-readable format.',
      'To exercise any of these rights, please contact our Data Protection team at privacy@atelierambre.com or call +880 1700-000000.',
    ],
  },
];

export default function PrivacyPolicyPage() {
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
              Data Protection
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-primary mb-4">
              Privacy Policy
            </h1>
            <div className="w-16 h-0.5 bg-amber rounded-full mx-auto mb-6" />
            <p className="text-text-secondary max-w-xl mx-auto text-sm leading-relaxed">
              Your trust is the foundation of our maison. This policy explains how Atelier Ambre collects,
              uses, and protects your personal information.
            </p>
            <p className="text-xs text-text-muted mt-4">
              Last updated: September 24, 2026 &nbsp;·&nbsp; Effective: September 24, 2026
            </p>
          </section>

          {/* Policy Sections */}
          <div className="space-y-12 max-w-4xl mx-auto">
            {sections.map((section) => (
              <section key={section.title} className="rounded-2xl border border-border-subtle bg-surface p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-5 h-5 text-amber" />
                  </div>
                  <h2 className="font-serif text-xl font-semibold text-text-primary">
                    {section.title}
                  </h2>
                </div>
                <div className="space-y-4 pl-0 sm:pl-13">
                  {section.content.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-sm text-text-secondary leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: paragraph.replace(
                          /\*\*(.*?)\*\*/g,
                          '<strong class="text-text-primary font-medium">$1</strong>'
                        ),
                      }}
                    />
                  ))}
                </div>
              </section>
            ))}

            {/* Contact for Privacy */}
            <div className="text-center rounded-2xl border border-border bg-surface p-10">
              <Shield className="w-10 h-10 text-amber mx-auto mb-4" />
              <h2 className="font-serif text-xl font-semibold text-text-primary mb-3">
                Questions About Your Privacy?
              </h2>
              <p className="text-sm text-text-secondary mb-6 max-w-md mx-auto">
                If you have any questions or concerns about this Privacy Policy or your personal data,
                please contact our Data Protection team.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="mailto:privacy@atelierambre.com"
                  className="text-sm text-amber hover:text-amber-light transition-colors font-medium"
                >
                  privacy@atelierambre.com
                </a>
                <span className="hidden sm:inline text-text-muted">·</span>
                <a
                  href="tel:+8801700000000"
                  className="text-sm text-amber hover:text-amber-light transition-colors font-medium"
                >
                  +880 1700-000000
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
