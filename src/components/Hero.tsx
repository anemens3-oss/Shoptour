import { ArrowRight, Calculator, ShieldCheck, Wrench } from 'lucide-react';
import { WORKSHOP_METRICS } from '../data/mockData';
import { CarHeroGraphic } from './CarGraphic';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenCalculator: () => void;
  onViewServices: () => void;
}

export function Hero({ onOpenBooking, onOpenCalculator, onViewServices }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-neutral-800">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-96 bg-orange-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Value Proposition & Action Triggers */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-400">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span>СЕРТИФИЦИРОВАННЫЙ ЦЕНТР ОБСЛУЖИВАНИЯ ГОСТ-Р</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] [text-wrap:balance]">
              Честный ремонт и ТО вашего авто с гарантией 2 года
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
              Дилерское диагностическое оборудование, открытая чистая ремзона и фиксированная смета до начала работ. Сохраняем официальную заводскую гарантию на новые автомобили.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-500 active:bg-orange-700 rounded-xl shadow-lg shadow-orange-950/40 hover:shadow-orange-600/25 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0f12]"
              >
                <Wrench className="w-4 h-4" />
                <span>Записаться в сервис</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCalculator}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-neutral-200 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
              >
                <Calculator className="w-4 h-4 text-orange-400" />
                <span>Рассчитать стоимость</span>
              </button>

              <button
                onClick={onViewServices}
                className="text-xs sm:text-sm text-neutral-400 hover:text-orange-400 underline underline-offset-4 transition-colors px-2 py-1"
              >
                Смотреть все 12 направлений услуг
              </button>
            </div>

            {/* Key trust bullets */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Официальный заказ-наряд</span>
              </div>
              <span className="text-neutral-700">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Присутствие в цехе разрешено</span>
              </div>
              <span className="text-neutral-700">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Собственный склад запчастей</span>
              </div>
            </div>
          </div>

          {/* Right Column: Car Graphic & Telemetry Stand */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <CarHeroGraphic />
          </div>
        </div>

        {/* 4-Column KPI strip below hero split */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-10 border-t border-neutral-800">
          {WORKSHOP_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#14161b] border border-neutral-800 hover:border-neutral-700 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums font-mono">
                {metric.value}
              </div>
              <div className="text-sm font-semibold text-orange-400 mt-1">
                {metric.label}
              </div>
              <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
