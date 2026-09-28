'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, RotateCcw, ShoppingBag } from 'lucide-react';
import { useProductStore } from '@/store/product-store';
import { useCartStore } from '@/store/cart-store';
import { useToastStore } from '@/store/toast-store';
import { Product, ScentFamily } from '@/data/products';

interface QuizAnswer {
  occasion?: string;
  mood?: string;
  notes?: string[];
}

const occasions = [
  { id: 'evening', label: 'Evening Soirée', emoji: '🌙', families: ['Oud', 'Oriental', 'Amber'] },
  { id: 'daily', label: 'Everyday Elegance', emoji: '☀️', families: ['Fresh', 'Floral'] },
  { id: 'special', label: 'Special Occasion', emoji: '✨', families: ['Oud', 'Amber', 'Floral'] },
  { id: 'office', label: 'Professional', emoji: '💼', families: ['Woody', 'Fresh'] },
];

const moods = [
  { id: 'bold', label: 'Bold & Commanding', emoji: '🔥', weight: ['Enormous', 'Strong'] },
  { id: 'romantic', label: 'Romantic & Dreamy', emoji: '🌹', weight: ['Moderate', 'Strong'] },
  { id: 'zen', label: 'Calm & Meditative', emoji: '🧘', weight: ['Intimate', 'Moderate'] },
  { id: 'fresh', label: 'Light & Refreshing', emoji: '🍃', weight: ['Intimate', 'Moderate'] },
];

const notePreferences = [
  { id: 'woody', label: 'Woody', family: 'Woody' as ScentFamily },
  { id: 'oriental', label: 'Oriental / Spicy', family: 'Oriental' as ScentFamily },
  { id: 'floral', label: 'Floral', family: 'Floral' as ScentFamily },
  { id: 'fresh', label: 'Fresh / Citrus', family: 'Fresh' as ScentFamily },
  { id: 'oud', label: 'Oud / Smoky', family: 'Oud' as ScentFamily },
  { id: 'amber', label: 'Amber / Warm', family: 'Amber' as ScentFamily },
];

export default function ScentQuiz() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer>({});
  const [results, setResults] = useState<{ product: Product; score: number }[]>([]);

  const { products } = useProductStore();
  const { addItem } = useCartStore();
  const { addToast } = useToastStore();

  const calculateResults = (finalAnswers: QuizAnswer) => {
    const scored = products.map((product) => {
      let score = 0;
      const occasion = occasions.find((o) => o.id === finalAnswers.occasion);
      if (occasion?.families.includes(product.scentFamily)) score += 35;
      const mood = moods.find((m) => m.id === finalAnswers.mood);
      if (mood?.weight.includes(product.sillage)) score += 30;
      const selectedNotes = finalAnswers.notes || [];
      const noteMatch = notePreferences.filter(
        (n) => selectedNotes.includes(n.id) && n.family === product.scentFamily
      );
      score += noteMatch.length * 20;
      if (product.featured) score += 5;
      return { product, score: Math.min(score, 100) };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 3);
  };

  const handleNext = () => {
    if (step === 2) {
      const res = calculateResults(answers);
      setResults(res);
      setStep(3);
    } else {
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResults([]);
  };

  if (!isOpen) {
    return (
      <section id="quiz" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative rounded-2xl border border-amber/20 bg-gradient-to-br from-amber-glow via-surface to-amber-glow p-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <Sparkles className="w-10 h-10 text-amber mx-auto mb-4" />
            <h2 className="font-serif text-3xl font-bold text-text-primary mb-3">
              Find Your Signature Scent
            </h2>
            <p className="text-text-secondary max-w-md mx-auto mb-8">
              Answer three simple questions and let our fragrance AI curate a personalized selection just for you.
            </p>
            <button
              onClick={() => setIsOpen(true)}
              className="group inline-flex items-center gap-2 bg-amber hover:bg-amber-light text-noir font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-amber/25 active:scale-[0.98]"
            >
              Begin the Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="rounded-2xl border border-border glass-strong p-8 animate-scale-in">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[0, 1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                  s <= step ? 'bg-amber' : 'bg-border'
                }`}
              />
            ))}
          </div>

          {/* Step 0: Occasion */}
          {step === 0 && (
            <div className="animate-fade-in-up">
              <h3 className="font-serif text-xl font-semibold text-text-primary mb-2">
                What&apos;s the occasion?
              </h3>
              <p className="text-sm text-text-secondary mb-6">When will you wear this fragrance most?</p>
              <div className="grid grid-cols-2 gap-3">
                {occasions.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setAnswers({ ...answers, occasion: o.id })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      answers.occasion === o.id
                        ? 'border-amber bg-amber/10 gold-border-glow'
                        : 'border-border hover:border-amber/30 hover:bg-surface-hover'
                    }`}
                  >
                    <span className="text-2xl mb-2 block">{o.emoji}</span>
                    <span className="text-sm font-medium text-text-primary">{o.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Mood */}
          {step === 1 && (
            <div className="animate-fade-in-up">
              <h3 className="font-serif text-xl font-semibold text-text-primary mb-2">
                What mood do you want to evoke?
              </h3>
              <p className="text-sm text-text-secondary mb-6">Choose the feeling that resonates with you.</p>
              <div className="grid grid-cols-2 gap-3">
                {moods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setAnswers({ ...answers, mood: m.id })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      answers.mood === m.id
                        ? 'border-amber bg-amber/10 gold-border-glow'
                        : 'border-border hover:border-amber/30 hover:bg-surface-hover'
                    }`}
                  >
                    <span className="text-2xl mb-2 block">{m.emoji}</span>
                    <span className="text-sm font-medium text-text-primary">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Notes */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              <h3 className="font-serif text-xl font-semibold text-text-primary mb-2">
                Which scent families appeal to you?
              </h3>
              <p className="text-sm text-text-secondary mb-6">Select one or more that you love.</p>
              <div className="grid grid-cols-2 gap-3">
                {notePreferences.map((n) => {
                  const selected = (answers.notes || []).includes(n.id);
                  return (
                    <button
                      key={n.id}
                      onClick={() => {
                        const current = answers.notes || [];
                        setAnswers({
                          ...answers,
                          notes: selected
                            ? current.filter((x) => x !== n.id)
                            : [...current, n.id],
                        });
                      }}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        selected
                          ? 'border-amber bg-amber/10 gold-border-glow'
                          : 'border-border hover:border-amber/30 hover:bg-surface-hover'
                      }`}
                    >
                      <span className="text-sm font-medium text-text-primary">{n.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Results */}
          {step === 3 && (
            <div className="animate-fade-in-up">
              <div className="text-center mb-6">
                <Sparkles className="w-8 h-8 text-amber mx-auto mb-3" />
                <h3 className="font-serif text-xl font-semibold text-text-primary">
                  Your Signature Scent Picks
                </h3>
                <p className="text-sm text-text-secondary mt-1">Curated just for you</p>
              </div>
              <div className="space-y-3">
                {results.map(({ product, score }, idx) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border-subtle hover:border-amber/30 transition-all"
                  >
                    <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: product.imageBg }}
                    >
                      <span className="text-white font-serif font-bold text-lg">{idx + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-text-primary">{product.name}</p>
                      <p className="text-xs text-text-muted">{product.scentFamily}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber rounded-full transition-all duration-1000"
                            style={{ width: `${score}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-amber">{score}%</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        addItem({
                          productId: product.id,
                          productName: product.name,
                          size: '50ml',
                          unitPrice: product.price50ml,
                          imageUrl: product.imageUrl,
                          imageBg: product.imageBg,
                        });
                        addToast({ type: 'success', title: 'Added to bag', message: `${product.name} (50ml)` });
                      }}
                      className="w-9 h-9 rounded-lg bg-amber/10 text-amber flex items-center justify-center hover:bg-amber hover:text-noir transition-all"
                      aria-label={`Add ${product.name} to bag`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border-subtle">
            {step > 0 && step < 3 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            ) : step === 3 ? (
              <button
                onClick={reset}
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Retake Quiz
              </button>
            ) : (
              <div />
            )}
            {step < 3 && (
              <button
                onClick={handleNext}
                disabled={
                  (step === 0 && !answers.occasion) ||
                  (step === 1 && !answers.mood) ||
                  (step === 2 && (!answers.notes || answers.notes.length === 0))
                }
                className="flex items-center gap-2 bg-amber hover:bg-amber-light text-noir font-semibold px-6 py-3 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm"
              >
                {step === 2 ? 'See Results' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
