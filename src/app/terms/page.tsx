'use client';

import React from 'react';
import PageShell from '@/components/PageShell';
import Link from 'next/link';
import { Scale, FileText, CreditCard, ShoppingBag, AlertTriangle, Gavel, Copyright, Globe, Sparkles } from 'lucide-react';

const sections = [
  {
    icon: ShoppingBag,
    title: '1. Order Acceptance & Processing',
    content: [
      'By placing an order through our website or any authorized sales channel, you are making an offer to purchase the selected fragrance(s) at the listed price in Bangladeshi Taka (BDT ৳). All orders are subject to acceptance by Atelier Ambre.',
      '**Order Confirmation:** An order confirmation email does not constitute acceptance. Your order is accepted only when we dispatch the product and send a shipping confirmation.',
      '**Price Accuracy:** We make every effort to ensure pricing accuracy. In the rare event of a pricing error, we reserve the right to cancel the order and issue a full refund. We will notify you before cancellation.',
      '**Product Availability:** All orders are subject to stock availability. If a product becomes unavailable after order placement, we will offer an equivalent substitute or a full refund.',
      '**Order Modifications:** Orders may be modified or cancelled within 2 hours of placement by contacting our concierge desk. Once dispatched, orders cannot be modified.',
    ],
  },
  {
    icon: CreditCard,
    title: '2. Payment Terms',
    content: [
      '**Accepted Methods:** We accept payments through bKash, Nagad, credit/debit cards (Visa, Mastercard, AMEX), and internet banking via SSLCommerz — Bangladesh\'s leading payment gateway.',
      '**Payment Security:** All transactions are processed through SSLCommerz, which is PCI-DSS Level 1 certified. We do not store, process, or have access to your card details at any point.',
      '**Currency:** All prices are quoted in Bangladeshi Taka (BDT ৳). No currency conversion is performed by Atelier Ambre.',
      '**Failed Payments:** If a payment fails or is declined, the order will not be processed. The payment amount, if deducted, will be automatically reversed within 5-7 business days by your financial institution.',
      '**Cash on Delivery:** COD is available only for orders within Dhaka Metropolitan and is subject to a maximum order value of ৳10,000.',
    ],
  },
  {
    icon: Copyright,
    title: '3. Intellectual Property',
    content: [
      'All content on the Atelier Ambre website — including but not limited to brand names, logos, fragrance names, product descriptions, photographs, illustrations, olfactory pyramid data, marketing copy, and design elements — is the exclusive intellectual property of Atelier Ambre.',
      '**Trademark Protection:** "Atelier Ambre", the Atelier Ambre logo, and all individual fragrance names (Oud Noir, Amber Royale, Bergamot Velvet, Rose de Soie, Santal Mystique, Jasmine Impériale, Vetiver Obscur, Iris Platine) are registered trademarks of Atelier Ambre.',
      '**Usage Restrictions:** No part of this website may be reproduced, distributed, displayed, or transmitted in any form without prior written consent from Atelier Ambre. This includes screen scraping, data mining, and automated content extraction.',
      '**Press & Media:** Licensed media partners may use approved press assets available upon request from press@atelierambre.com. Unauthorized use of product images for commercial purposes is strictly prohibited.',
    ],
  },
  {
    icon: Scale,
    title: '4. Limitation of Liability',
    content: [
      'To the maximum extent permitted by the laws of Bangladesh:',
      '**Product Use:** Atelier Ambre shall not be liable for any adverse reactions, skin sensitivities, or allergies caused by the application of our fragrances. Users are advised to conduct a patch test before first use and consult a dermatologist if they have known fragrance sensitivities.',
      '**Service Availability:** We do not guarantee uninterrupted, error-free, or virus-free operation of this website. The site is provided on an "as is" and "as available" basis.',
      '**Indirect Damages:** Under no circumstances shall Atelier Ambre be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to the use of our products or services.',
      '**Maximum Liability:** Our total liability for any claim related to a product or order shall not exceed the purchase price paid for that specific product.',
    ],
  },
  {
    icon: AlertTriangle,
    title: '5. Prohibited Activities',
    content: [
      'Users of the Atelier Ambre website agree not to engage in the following activities:',
      '**Resale Without Authorization:** Purchasing Atelier Ambre products for unauthorized commercial resale, distribution, or grey-market trading.',
      '**Fraudulent Orders:** Placing orders with stolen payment credentials, false identities, or fraudulent delivery addresses. Such activities will be reported to law enforcement.',
      '**Content Misuse:** Using automated bots, scrapers, or other tools to extract data, product information, or pricing from the website.',
      '**Impersonation:** Misrepresenting yourself as an Atelier Ambre employee, affiliate, or authorized representative.',
      'Violation of these terms may result in immediate account termination and legal action.',
    ],
  },
  {
    icon: Gavel,
    title: '6. Governing Law & Dispute Resolution',
    content: [
      '**Jurisdiction:** These Terms of Service are governed by and construed in accordance with the laws of the People\'s Republic of Bangladesh.',
      '**Dispute Resolution:** Any disputes arising from these terms shall first be attempted to be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be referred to arbitration under the Bangladesh Arbitration Act, 2001.',
      '**Forum:** All arbitration proceedings and legal actions shall take place in Dhaka, Bangladesh.',
      '**Severability:** If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.',
      '**Entire Agreement:** These Terms of Service, together with our Privacy Policy and Shipping & Returns Policy, constitute the entire agreement between you and Atelier Ambre regarding the use of our website and services.',
    ],
  },
  {
    icon: Globe,
    title: '7. Changes to These Terms',
    content: [
      'Atelier Ambre reserves the right to modify these Terms of Service at any time. Changes will be posted on this page with an updated "Last Modified" date.',
      'Continued use of the website after changes are posted constitutes acceptance of the revised terms. We recommend reviewing this page periodically for the latest information.',
      'For significant changes that materially affect your rights, we will make reasonable efforts to notify registered users via email.',
    ],
  },
];

export default function TermsPage() {
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
              Legal
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-primary mb-4">
              Terms of Service
            </h1>
            <div className="w-16 h-0.5 bg-amber rounded-full mx-auto mb-6" />
            <p className="text-text-secondary max-w-xl mx-auto text-sm leading-relaxed">
              Please read these terms carefully before using the Atelier Ambre website or purchasing our products.
              By accessing our services, you agree to be bound by these terms.
            </p>
            <p className="text-xs text-text-muted mt-4">
              Last updated: September 24, 2026 &nbsp;·&nbsp; Effective: September 24, 2026
            </p>
          </section>

          {/* Terms Sections */}
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

            {/* Related Policies */}
            <div className="rounded-2xl border border-border bg-surface p-8 text-center">
              <FileText className="w-10 h-10 text-amber mx-auto mb-4" />
              <h2 className="font-serif text-xl font-semibold text-text-primary mb-3">
                Related Policies
              </h2>
              <p className="text-sm text-text-secondary mb-6 max-w-md mx-auto">
                These terms work together with our other policies to protect both you and Atelier Ambre.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/privacy-policy"
                  className="text-sm text-amber hover:text-amber-light transition-colors font-medium border border-amber/30 hover:border-amber px-5 py-2.5 rounded-xl hover:bg-amber-glow"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/shipping-returns"
                  className="text-sm text-amber hover:text-amber-light transition-colors font-medium border border-amber/30 hover:border-amber px-5 py-2.5 rounded-xl hover:bg-amber-glow"
                >
                  Shipping & Returns
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
