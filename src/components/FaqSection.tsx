import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { FAQ_DATA } from '../data/mockData';

export function FaqSection() {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-12 lg:py-20 bg-[#0d0f12] border-t border-neutral-800" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-400 mb-2">
            <HelpCircle className="w-4 h-4 text-orange-500" />
            <span>ОТВЕТЫ НА ЧАСТЫЕ ВОПРОСЫ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Часто задаваемые вопросы
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2">
            Все нюансы гарантийных обязательств, присутствия в зоне ремонта и политики ценообразования.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_DATA.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="rounded-2xl bg-[#14161c] border border-neutral-800 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(item.id)}
                  aria-expanded={isOpen}
                  className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  <span className="text-sm sm:text-base font-semibold text-white leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0 text-neutral-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-orange-400 bg-orange-950/30' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/80 animate-in fade-in duration-150">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
