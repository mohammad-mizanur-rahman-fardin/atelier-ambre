'use client';

import React from 'react';
import PageShell from '@/components/PageShell';
import {
  Truck,
  MapPin,
  Clock,
  Shield,
  Package,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

const deliveryZones = [
  {
    zone: 'Inside Dhaka',
    fee: '৳80',
    timeline: '24 – 48 hours',
    icon: MapPin,
    description: 'All areas within Dhaka Metropolitan — Gulshan, Banani, Dhanmondi, Uttara, Mirpur, Mohammadpur, Motijheel, and surrounding zones.',
    highlight: true,
  },
  {
    zone: 'Outside Dhaka',
    fee: '৳150',
    timeline: '3 – 5 business days',
    icon: Truck,
    description: 'All major divisional cities and districts across Bangladesh — Chittagong, Sylhet, Rajshahi, Khulna, Rangpur, Barishal, and Mymensingh.',
    highlight: false,
  },
];

const returnSteps = [
  {
    step: '1',
    title: 'Initiate Return',
    description: 'Contact our concierge desk within 7 days of delivery via email or phone. Provide your order ID and reason for return.',
  },
  {
    step: '2',
    title: 'Return Authorization',
    description: 'Our team will review your request and issue a Return Authorization (RA) number within 24 hours. Exchanges may be arranged at this stage.',
  },
  {
    step: '3',
    title: 'Ship the Flacon',
    description: 'Pack the fragrance in its original Atelier Ambre gift box with all accessories. Ship it to our Dhaka facility using the prepaid return label we provide.',
  },
  {
    step: '4',
    title: 'Refund or Exchange',
    description: 'Upon receiving and inspecting the flacon, your refund will be processed within 5-7 business days, or your exchange flacon will be dispatched immediately.',
  },
];

export default function ShippingReturnsPage() {
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
              Delivery & Returns
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-primary mb-4">
              Shipping & Returns
            </h1>
            <div className="w-16 h-0.5 bg-amber rounded-full mx-auto mb-6" />
            <p className="text-text-secondary max-w-xl mx-auto text-sm leading-relaxed">
              We treat every flacon with the reverence it deserves — from secure transit packaging to
              a generous return policy that puts your confidence first.
            </p>
          </section>

          {/* Delivery Zones */}
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center">
                <Truck className="w-5 h-5 text-amber" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold text-text-primary">
                  Nationwide Delivery
                </h2>
                <p className="text-xs text-text-muted">Currently shipping across Bangladesh</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {deliveryZones.map((zone) => (
                <div
                  key={zone.zone}
                  className={`rounded-2xl border p-6 transition-all ${
                    zone.highlight
                      ? 'border-amber/30 bg-amber/5 gold-border-glow'
                      : 'border-border bg-surface'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center">
                      <zone.icon className="w-5 h-5 text-amber" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-text-primary">
                        {zone.zone}
                      </h3>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-amber font-bold text-lg">{zone.fee}</span>
                        <span className="text-[10px] text-text-muted uppercase tracking-wider">delivery</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-3.5 h-3.5 text-amber" />
                    <span className="text-sm text-text-primary font-medium">{zone.timeline}</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {zone.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Free Delivery Banner */}
            <div className="rounded-xl border border-success/20 bg-success/5 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm font-semibold text-success">Free Delivery on Orders Above ৳5,000</p>
                <p className="text-xs text-text-secondary mt-1">
                  All orders with a subtotal of ৳5,000 or more qualify for complimentary delivery, regardless of destination within Bangladesh.
                </p>
              </div>
            </div>
          </section>

          {/* Packaging */}
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-amber" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold text-text-primary">
                  Secure Transit Packaging
                </h2>
                <p className="text-xs text-text-muted">Your flacon arrives in perfect condition</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: 'Impact-Resistant Casing',
                  description: 'Every flacon is nested in custom-molded foam inserts within a rigid outer carton, protecting against drops and vibrations during transit.',
                },
                {
                  icon: Package,
                  title: 'Signature Gift Packaging',
                  description: 'Matte black magnetic-closure boxes with gold foil branding, tissue paper wrapping, and a hand-signed authenticity card accompany every order.',
                },
                {
                  icon: CheckCircle,
                  title: 'Tamper-Evident Seals',
                  description: 'Each package features tamper-evident security seals so you can verify the integrity of your fragrance upon arrival.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border-subtle bg-surface p-6 hover:border-amber/30 transition-all duration-500 hover:gold-border-glow"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-amber" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Returns & Exchange */}
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center">
                <RotateCcw className="w-5 h-5 text-amber" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold text-text-primary">
                  7-Day Return & Exchange Policy
                </h2>
                <p className="text-xs text-text-muted">Your satisfaction is our priority</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 mb-8">
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                We want you to be completely delighted with your Atelier Ambre fragrance. If for any reason you are
                not satisfied, you may initiate a return or exchange within <strong className="text-text-primary">7 calendar days</strong> of
                delivery, provided the flacon is unused and in its original packaging.
              </p>

              {/* Return Process Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {returnSteps.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-amber/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-amber">{step.step}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-text-primary">{step.title}</h4>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed pl-11">
                      {step.description}
                    </p>
                    {idx < returnSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-4 right-0 translate-x-1/2 w-6 h-px bg-amber/30" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Important Notes */}
            <div className="rounded-xl border border-warning/20 bg-warning/5 p-5 flex items-start gap-4">
              <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-warning mb-1">Important Conditions</p>
                <ul className="text-xs text-text-secondary space-y-1.5 leading-relaxed">
                  <li>• Flacons must be unused and sealed in original packaging for returns.</li>
                  <li>• Opened or partially used flacons are eligible for exchange only, not refund.</li>
                  <li>• Bespoke/custom commission fragrances are non-returnable and non-exchangeable.</li>
                  <li>• Refunds are processed to the original payment method used during checkout.</li>
                  <li>• Return shipping within Dhaka is complimentary; outside Dhaka returns incur a ৳100 shipping fee.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="text-center rounded-2xl border border-border bg-surface p-10">
            <h2 className="font-serif text-2xl font-bold text-text-primary mb-3">
              Need Assistance?
            </h2>
            <p className="text-text-secondary text-sm mb-6 max-w-md mx-auto">
              Our concierge team is available to help with delivery tracking, returns, and any shipping-related questions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="mailto:concierge@atelierambre.com"
                className="flex items-center gap-2 bg-amber hover:bg-amber-light text-noir font-semibold px-6 py-3 rounded-xl transition-all text-sm"
              >
                concierge@atelierambre.com
              </a>
              <a
                href="tel:+8801700000000"
                className="flex items-center gap-2 border border-amber/40 text-amber hover:bg-amber-glow px-6 py-3 rounded-xl font-medium transition-all text-sm hover:border-amber"
              >
                +880 1700-000000
              </a>
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
