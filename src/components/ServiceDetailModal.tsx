import { AlertTriangle, CheckCircle2, Clock, Cpu, ShieldCheck, Wrench, X } from 'lucide-react';
import { useEffect } from 'react';
import { VEHICLE_CLASSES } from '../data/servicesData';
import { ServiceItem } from '../types';
import { ServiceVisualBadge } from './ServiceVisualBadge';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookNow: (service: ServiceItem) => void;
}

export function ServiceDetailModal({
  service,
  onClose,
  onBookNow,
}: ServiceDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-detail-title"
    >
      <div className="relative w-full max-w-3xl my-8 rounded-2xl bg-[#14161c] border border-neutral-700/80 shadow-2xl text-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="p-6 sm:p-8 pb-4 border-b border-neutral-800 flex items-start justify-between gap-4 bg-[#111317]">
          <div className="flex items-start gap-4">
            <ServiceVisualBadge category={service.category} className="w-16 h-16 shrink-0 hidden sm:flex" />
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-orange-400 mb-1">
                <span>ТЕХНОЛОГИЧЕСКАЯ КАРТА УСЛУГИ</span>
                <span className="text-neutral-600">·</span>
                <span className="text-neutral-400">{service.categoryName}</span>
              </div>
              <h2 id="service-detail-title" className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {service.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors shrink-0"
            aria-label="Закрыть детальное описание"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 divide-y divide-neutral-800/80">
          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#1a1d24] border border-neutral-800">
              <span className="text-xs text-neutral-400 block mb-1">Базовая стоимость</span>
              <span className="text-2xl font-extrabold text-white font-mono tabular-nums">
                от {service.basePrice.toLocaleString('ru-RU')} ₽
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#1a1d24] border border-neutral-800">
              <span className="text-xs text-neutral-400 block mb-1">Время выполнения</span>
              <span className="text-lg font-bold text-white flex items-center gap-1.5 mt-1">
                <Clock className="w-4 h-4 text-orange-500" />
                {service.estimatedDuration}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#1a1d24] border border-neutral-800">
              <span className="text-xs text-neutral-400 block mb-1">Гарантия на работу</span>
              <span className="text-sm font-semibold text-neutral-200 flex items-center gap-1.5 mt-1">
                <ShieldCheck className="w-4 h-4 text-orange-500" />
                {service.warrantyPeriod}
              </span>
            </div>
          </div>

          {/* Full Technical Description */}
          <div className="pt-6">
            <h3 className="text-sm font-mono text-orange-400 uppercase tracking-wider mb-2">
              Описание технологического процесса
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* Technological Steps Included */}
          <div className="pt-6">
            <h3 className="text-sm font-mono text-orange-400 uppercase tracking-wider mb-4">
              Поэтапный перечень регламентных работ
            </h3>
            <ol className="space-y-3">
              {service.includedSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-neutral-200">
                  <span className="w-6 h-6 rounded-md bg-neutral-800 text-orange-400 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 border border-neutral-700">
                    0{idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Equipment & Diagnostic Tools */}
          <div className="pt-6">
            <h3 className="text-sm font-mono text-orange-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-orange-500" />
              <span>Используемые сертифицированные стенды и специнструмент</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.equipmentUsed.map((eq, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-[#191c23] border border-neutral-700/80 text-xs font-medium text-neutral-200"
                >
                  {eq}
                </span>
              ))}
            </div>
          </div>

          {/* Symptoms and Warnings */}
          {service.symptoms && service.symptoms.length > 0 && (
            <div className="pt-6">
              <h3 className="text-sm font-mono text-orange-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Типичные признаки и симптомы для обращения</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                {service.symptoms.map((sym, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#181a20] border border-neutral-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{sym}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Price by Vehicle Class Table */}
          <div className="pt-6">
            <h3 className="text-sm font-mono text-orange-400 uppercase tracking-wider mb-3">
              Ориентировочная стоимость по классам авто
            </h3>
            <div className="overflow-x-auto rounded-xl border border-neutral-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#191c23] text-neutral-400 font-mono uppercase border-b border-neutral-800">
                  <tr>
                    <th className="py-2.5 px-4">Класс автомобиля</th>
                    <th className="py-2.5 px-4">Примеры моделей</th>
                    <th className="py-2.5 px-4 text-right">Расчетная стоимость</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/80">
                  {VEHICLE_CLASSES.map((cls) => {
                    const classPrice = Math.round((service.basePrice * cls.multiplier) / 100) * 100;
                    return (
                      <tr key={cls.id} className="hover:bg-neutral-800/40">
                        <td className="py-3 px-4 font-medium text-white">{cls.name}</td>
                        <td className="py-3 px-4 text-neutral-400">{cls.example}</td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-orange-400 tabular-nums">
                          {classPrice.toLocaleString('ru-RU')} ₽
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-neutral-500 mt-2">
              * Стоимость указана за работы. Стоимость запасных частей и расходных материалов рассчитывается отдельно согласно спецификации автомобиля.
            </p>
          </div>
        </div>

        {/* Modal Sticky Bottom Action Footer */}
        <div className="p-4 sm:p-6 bg-[#111317] border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-neutral-400">
            <span>Гарантия на выполненные работы: </span>
            <strong className="text-white">{service.warrantyPeriod}</strong>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial py-2.5 px-4 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors"
            >
              Закрыть
            </button>
            <button
              onClick={() => {
                onClose();
                onBookNow(service);
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 py-2.5 px-6 text-xs sm:text-sm font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-xl transition-colors shadow-lg shadow-orange-950/40"
            >
              <Wrench className="w-4 h-4" />
              <span>Записаться на эту услугу</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
