import { ArrowRight, Calculator, Check, CheckCircle2, Clock, Info, RotateCcw, ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';
import { SERVICES, VEHICLE_CLASSES } from '../data/servicesData';
import { ServiceItem, VehicleClass } from '../types';

interface CostCalculatorProps {
  selectedServiceIds: string[];
  onToggleService: (service: ServiceItem) => void;
  onClearServices: () => void;
  onProceedToBooking: (vehicleClass: VehicleClass, selectedServices: ServiceItem[], partsIncluded: boolean) => void;
}

export function CostCalculator({
  selectedServiceIds,
  onToggleService,
  onClearServices,
  onProceedToBooking,
}: CostCalculatorProps) {
  const [selectedClassId, setSelectedClassId] = useState<string>('sedan');
  const [includeParts, setIncludeParts] = useState<boolean>(true);

  // Selected vehicle class object
  const currentClass = useMemo(() => {
    return VEHICLE_CLASSES.find((c) => c.id === selectedClassId) || VEHICLE_CLASSES[0];
  }, [selectedClassId]);

  // Selected service objects
  const selectedServices = useMemo(() => {
    return SERVICES.filter((s) => selectedServiceIds.includes(s.id));
  }, [selectedServiceIds]);

  // Calculations
  const rawLaborTotal = useMemo(() => {
    return selectedServices.reduce((sum, service) => {
      const price = Math.round((service.basePrice * currentClass.multiplier) / 100) * 100;
      return sum + price;
    }, 0);
  }, [selectedServices, currentClass]);

  // Estimated consumables and parts (approx. 45-60% of service labor value for standard maintenance packages)
  const partsTotal = useMemo(() => {
    if (!includeParts) return 0;
    return Math.round((rawLaborTotal * 0.55) / 100) * 100;
  }, [includeParts, rawLaborTotal]);

  // Package discount if 3 or more services selected
  const hasPackageDiscount = selectedServices.length >= 3;
  const discountAmount = useMemo(() => {
    if (!hasPackageDiscount) return 0;
    return Math.round((rawLaborTotal * 0.1) / 100) * 100; // 10% discount on labor
  }, [hasPackageDiscount, rawLaborTotal]);

  const grandTotal = rawLaborTotal - discountAmount + partsTotal;

  return (
    <section className="py-12 lg:py-20 bg-[#111317] border-y border-neutral-800" id="calculator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-400 mb-2">
            <Calculator className="w-4 h-4 text-orange-500" />
            <span>ИНТЕРАКТИВНЫЙ ОНЛАЙН-КАЛЬКУЛЯТОР</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Калькулятор предварительной стоимости ТО
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2">
            Выберите класс вашего автомобиля и требуемый комплекс работ. Стоимость пересчитывается мгновенно с учетом скидок на пакетные работы.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Step 1 Car Class & Step 2 Services Selector */}
          <div className="lg:col-span-8 space-y-8">
            {/* Step 1: Vehicle Class Picker */}
            <div className="p-6 rounded-2xl bg-[#15171e] border border-neutral-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-orange-400 uppercase tracking-wider">ШАГ 1. Выберите класс автомобиля</span>
                <span className="text-xs text-neutral-400">Коэффициент сложности: ×{currentClass.multiplier}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VEHICLE_CLASSES.map((cls) => {
                  const isSelected = cls.id === selectedClassId;
                  return (
                    <button
                      key={cls.id}
                      onClick={() => setSelectedClassId(cls.id)}
                      className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1e222c] border-orange-500/80 ring-1 ring-orange-500 text-white shadow-lg'
                          : 'bg-[#121418] border-neutral-800 hover:border-neutral-700 text-neutral-300'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold text-sm">
                        <span>{cls.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-orange-500" />}
                      </div>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-1">{cls.description}</p>
                      <p className="text-[11px] text-neutral-500 font-mono mt-1">Примеры: {cls.example}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Services Checkboxes */}
            <div className="p-6 rounded-2xl bg-[#15171e] border border-neutral-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-orange-400 uppercase tracking-wider">ШАГ 2. Выберите необходимые услуги</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400">
                    Выбрано: <strong className="text-white font-mono">{selectedServices.length}</strong>
                  </span>
                  {selectedServices.length > 0 && (
                    <button
                      onClick={onClearServices}
                      className="text-xs text-neutral-500 hover:text-orange-400 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Сбросить</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
                {SERVICES.map((service) => {
                  const isChecked = selectedServiceIds.includes(service.id);
                  const adjustedPrice = Math.round((service.basePrice * currentClass.multiplier) / 100) * 100;

                  return (
                    <div
                      key={service.id}
                      onClick={() => onToggleService(service)}
                      className={`flex items-start justify-between gap-4 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#1e232e] border-orange-500/70 text-white'
                          : 'bg-[#121418] border-neutral-800/80 hover:border-neutral-700 text-neutral-300'
                      }`}
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <div
                          className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center shrink-0 border transition-colors ${
                            isChecked
                              ? 'bg-orange-600 border-orange-500 text-white'
                              : 'bg-neutral-800 border-neutral-700'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <p className="text-sm font-semibold leading-tight">{service.title}</p>
                          <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
                            <span>{service.categoryName}</span>
                            <span aria-hidden="true" className="text-neutral-600">·</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {service.estimatedDuration}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-sm sm:text-base font-bold font-mono text-orange-400 tabular-nums">
                          {adjustedPrice.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Consumables Option */}
            <div className="p-5 rounded-2xl bg-[#15171e] border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-orange-400 uppercase tracking-wider block mb-0.5">ШАГ 3. Запасные части и материалы</span>
                <p className="text-sm font-medium text-white">Включить сертифицированные расходники сервиса в расчет</p>
                <p className="text-xs text-neutral-400">Оригинальные масла и фильтры с гарантией 12 месяцев</p>
              </div>

              <div className="flex items-center gap-2 p-1 bg-[#101216] rounded-xl border border-neutral-800 shrink-0">
                <button
                  type="button"
                  onClick={() => setIncludeParts(false)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    !includeParts ? 'bg-orange-600 text-white font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Свои запчасти
                </button>
                <button
                  type="button"
                  onClick={() => setIncludeParts(true)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    includeParts ? 'bg-orange-600 text-white font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Запчасти сервиса
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Sticky Order Summary Receipt Card */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="p-6 rounded-2xl bg-[#171a22] border border-neutral-700/80 shadow-2xl text-slate-100">
              <div className="border-b border-neutral-800 pb-4 mb-4">
                <span className="text-xs font-mono text-orange-400 uppercase tracking-wider">ПРЕДВАРИТЕЛЬНАЯ СМЕТА</span>
                <h3 className="text-xl font-bold text-white mt-1">Итоговый расчет</h3>
                <p className="text-xs text-neutral-400 mt-0.5">{currentClass.name}</p>
              </div>

              {/* Items List in Receipt */}
              {selectedServices.length === 0 ? (
                <div className="py-8 text-center text-xs text-neutral-500">
                  <Info className="w-8 h-8 mx-auto text-neutral-600 mb-2" />
                  <span>Выберите хотя бы одну услугу в списке слева для формирования сметы</span>
                </div>
              ) : (
                <div className="space-y-3 mb-6 max-h-56 overflow-y-auto pr-1 text-xs">
                  {selectedServices.map((service) => {
                    const price = Math.round((service.basePrice * currentClass.multiplier) / 100) * 100;
                    return (
                      <div key={service.id} className="flex justify-between items-start gap-2">
                        <span className="text-neutral-300 line-clamp-1">{service.title}</span>
                        <span className="font-mono text-neutral-200 shrink-0 tabular-nums">
                          {price.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Breakdown Totals */}
              <div className="border-t border-neutral-800 pt-4 space-y-2 text-xs text-neutral-400 font-mono">
                <div className="flex justify-between">
                  <span>Стоимость работ:</span>
                  <span className="text-neutral-200 tabular-nums">{rawLaborTotal.toLocaleString('ru-RU')} ₽</span>
                </div>

                {includeParts && (
                  <div className="flex justify-between">
                    <span>Расходники и жидкости (~):</span>
                    <span className="text-neutral-200 tabular-nums">{partsTotal.toLocaleString('ru-RU')} ₽</span>
                  </div>
                )}

                {hasPackageDiscount && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Пакетная скидка (3+ услуг, 10%):</span>
                    <span className="tabular-nums">−{discountAmount.toLocaleString('ru-RU')} ₽</span>
                  </div>
                )}
              </div>

              {/* Grand Total Price */}
              <div className="border-t border-neutral-800 mt-4 pt-4 flex items-baseline justify-between">
                <span className="text-sm font-bold text-white uppercase">Итого к оплате:</span>
                <span className="text-3xl font-extrabold font-mono text-orange-400 tabular-nums tracking-tight">
                  {grandTotal.toLocaleString('ru-RU')} ₽
                </span>
              </div>

              {/* Warranty and Trust Pill */}
              <div className="mt-4 p-3 rounded-xl bg-[#121418] border border-neutral-800 flex items-center gap-2 text-xs text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Фиксация суммы в заказ-наряде с гарантией 2 года</span>
              </div>

              {/* Action Button: Proceed to Booking */}
              <button
                disabled={selectedServices.length === 0}
                onClick={() => onProceedToBooking(currentClass, selectedServices, includeParts)}
                className={`w-full mt-6 py-3.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  selectedServices.length > 0
                    ? 'bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white shadow-lg shadow-orange-950/50'
                    : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                }`}
              >
                <span>Записаться с этим расчетом</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-neutral-500 text-center mt-3">
                Окончательная смета подтверждается мастером при приемке автомобиля
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
