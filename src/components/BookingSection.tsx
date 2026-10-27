import { AlertCircle, Calendar, Check, CheckCircle2, Clock, Copy, Phone, User, Wrench, X } from 'lucide-react';
import { useId, useMemo, useState } from 'react';
import { DEMO_COMPANY_INFO } from '../data/mockData';
import { SERVICES, VEHICLE_CLASSES } from '../data/servicesData';
import { BookingFormData, BookingSummary, ServiceItem, VehicleClass } from '../types';

interface BookingSectionProps {
  initialServiceIds?: string[];
  initialVehicleClassId?: string;
  onCopyPhone: () => void;
  onBookingCreated: (summary: BookingSummary) => void;
}

export function BookingSection({
  initialServiceIds = [],
  initialVehicleClassId = 'sedan',
  onCopyPhone,
  onBookingCreated,
}: BookingSectionProps) {
  const formId = useId();

  // Form Fields State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [carBrand, setCarBrand] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('2021');
  const [vehicleClassId, setVehicleClassId] = useState(initialVehicleClassId);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(
    initialServiceIds.length > 0 ? initialServiceIds : [SERVICES[0].id]
  );
  // Default to tomorrow's date formatted as YYYY-MM-DD
  const tomorrowStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);
  const [date, setDate] = useState(tomorrowStr);
  const [timeSlot, setTimeSlot] = useState('11:00');
  const [comment, setComment] = useState('');
  const [agreeToPolicy, setAgreeToPolicy] = useState(true);

  // Field Touched / Errors State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedSummary, setSubmittedSummary] = useState<BookingSummary | null>(null);

  const TIME_SLOTS = [
    '09:00', '10:00', '11:00', '12:30', '14:00', '15:30', '17:00', '18:30', '19:30'
  ];

  // Validation function
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Укажите ваше имя (минимум 2 символа)';
    }

    // Phone validation (accepts digits, spaces, parentheses, dashes, +, length >= 10)
    const digitsOnly = phone.replace(/\D/g, '');
    if (!digitsOnly || digitsOnly.length < 10 || digitsOnly.length > 12) {
      newErrors.phone = 'Введите корректный номер телефона (например, +7 999 123-45-67)';
    }

    if (!carBrand.trim()) {
      newErrors.carBrand = 'Укажите марку автомобиля (например, BMW, Toyota, Kia)';
    }

    if (!carModel.trim()) {
      newErrors.carModel = 'Укажите модель автомобиля (например, 5 series, RAV4)';
    }

    if (selectedServiceIds.length === 0) {
      newErrors.services = 'Выберите хотя бы одну услугу для записи';
    }

    if (!date) {
      newErrors.date = 'Выберите дату визита';
    } else {
      const selected = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.date = 'Дата не может быть в прошлом';
      }
    }

    if (!timeSlot) {
      newErrors.timeSlot = 'Выберите удобное время';
    }

    if (!agreeToPolicy) {
      newErrors.policy = 'Необходимо согласие на обработку персональных данных';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleToggleService = (serviceId: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    );
    if (errors.services) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.services;
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    // Calculate preliminary total for summary
    const vClass = VEHICLE_CLASSES.find((c) => c.id === vehicleClassId) || VEHICLE_CLASSES[0];
    const sServices = SERVICES.filter((s) => selectedServiceIds.includes(s.id));
    const total = sServices.reduce((sum, s) => {
      return sum + Math.round((s.basePrice * vClass.multiplier) / 100) * 100;
    }, 0);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const summary: BookingSummary = {
      bookingId: `AC-2026-${randomSuffix}`,
      timestamp: new Date().toLocaleString('ru-RU'),
      formData: {
        fullName,
        phone,
        carBrand,
        carModel,
        carYear,
        vehicleClassId,
        selectedServiceIds,
        date,
        timeSlot,
        comment,
        agreeToPolicy,
      },
      selectedServices: sServices,
      vehicleClass: vClass,
      totalPrice: total,
      totalDuration: `${sServices.length * 45}–${sServices.length * 60} мин`,
    };

    setSubmittedSummary(summary);
    onBookingCreated(summary);
  };

  const handleCopyBookingDetails = () => {
    if (!submittedSummary) return;
    const text = `Заявка ${submittedSummary.bookingId}\nАвтомобиль: ${submittedSummary.formData.carBrand} ${submittedSummary.formData.carModel} (${submittedSummary.formData.carYear})\nУслуги: ${submittedSummary.selectedServices.map(s => s.title).join(', ')}\nДата и время: ${submittedSummary.formData.date} в ${submittedSummary.formData.timeSlot}\nРасчетная сумма: ${submittedSummary.totalPrice} ₽\nКлиент: ${submittedSummary.formData.fullName}, ${submittedSummary.formData.phone}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <section className="py-12 lg:py-20 bg-[#0d0f12]" id="booking">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column (5 cols): Contact & Guarantee info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-400">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>ОНЛАЙН-РЕГИСТРАЦИЯ И КОНТАКТЫ</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Запись на техническое обслуживание
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Забронируйте удобное время и свободный подъемник за 1 минуту. Мастер-консультант свяжется с вами для подтверждения заявки.
            </p>

            {/* Direct Phone Card */}
            <div className="p-5 rounded-2xl bg-[#14161b] border border-neutral-800 space-y-3">
              <span className="text-xs font-mono text-neutral-400 block">ПРЯМОЙ ТЕЛЕФОН СЕРВИСА (ДЕМОНСТРАЦИОННЫЙ)</span>
              <div className="flex items-center justify-between gap-4">
                <a
                  href={`tel:${DEMO_COMPANY_INFO.phoneRaw}`}
                  className="text-xl sm:text-2xl font-extrabold font-mono text-white hover:text-orange-400 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-5 h-5 text-orange-500" />
                  <span>{DEMO_COMPANY_INFO.phoneDisplay}</span>
                </a>
                <button
                  type="button"
                  onClick={onCopyPhone}
                  className="p-2 text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors text-xs"
                  title="Скопировать номер"
                  aria-label="Скопировать телефонный номер"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="text-xs text-neutral-400 pt-2 border-t border-neutral-800 flex justify-between">
                <span>График работы:</span>
                <span className="text-white font-medium">{DEMO_COMPANY_INFO.hours}</span>
              </div>
            </div>

            {/* Address & Workshop Location */}
            <div className="p-5 rounded-2xl bg-[#14161b] border border-neutral-800 space-y-2 text-xs text-neutral-300">
              <span className="font-mono text-neutral-400 block">ЛОКАЦИЯ И РЕМЗОНА</span>
              <p className="text-sm font-semibold text-white">{DEMO_COMPANY_INFO.address}</p>
              <p className="text-neutral-400">{DEMO_COMPANY_INFO.metro}</p>
              <p className="text-neutral-500 pt-1">{DEMO_COMPANY_INFO.emergency}</p>
            </div>

            {/* Explicit Demo Disclaimer Box */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-amber-200 text-xs flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-amber-300">Демонстрационный режим заявки</p>
                <p className="text-amber-200/80 leading-relaxed">
                  При нажатии «Подтвердить запись» данные валидируются на клиенте и генерируют демонстрационный талон бронирования без отправки на сервер.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Validated Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="p-6 sm:p-8 rounded-2xl bg-[#14161c] border border-neutral-800 shadow-xl space-y-6"
            >
              <div className="border-b border-neutral-800 pb-4">
                <h3 className="text-xl font-bold text-white">Форма электронной записи</h3>
                <p className="text-xs text-neutral-400 mt-0.5">Все поля с отметкой * обязательны для заполнения</p>
              </div>

              {/* Vehicle Brand & Model */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor={`${formId}-brand`} className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Марка авто *
                  </label>
                  <input
                    id={`${formId}-brand`}
                    type="text"
                    value={carBrand}
                    onChange={(e) => setCarBrand(e.target.value)}
                    placeholder="Например: BMW"
                    className={`w-full bg-[#181a20] border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                      errors.carBrand ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-neutral-700 focus:border-orange-500'
                    }`}
                  />
                  {errors.carBrand && <p className="text-[11px] text-red-400 mt-1">{errors.carBrand}</p>}
                </div>

                <div>
                  <label htmlFor={`${formId}-model`} className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Модель авто *
                  </label>
                  <input
                    id={`${formId}-model`}
                    type="text"
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    placeholder="Например: 530d"
                    className={`w-full bg-[#181a20] border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                      errors.carModel ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-neutral-700 focus:border-orange-500'
                    }`}
                  />
                  {errors.carModel && <p className="text-[11px] text-red-400 mt-1">{errors.carModel}</p>}
                </div>

                <div>
                  <label htmlFor={`${formId}-year`} className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Год выпуска
                  </label>
                  <select
                    id={`${formId}-year`}
                    value={carYear}
                    onChange={(e) => setCarYear(e.target.value)}
                    className="w-full bg-[#181a20] border border-neutral-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
                  >
                    {Array.from({ length: 30 }, (_, i) => 2026 - i).map((y) => (
                      <option key={y} value={y} className="bg-[#181a20] text-white">
                        {y} г.
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Vehicle Class Segmented Selector */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Класс транспортного средства
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {VEHICLE_CLASSES.map((cls) => (
                    <button
                      key={cls.id}
                      type="button"
                      onClick={() => setVehicleClassId(cls.id)}
                      className={`py-2 px-2.5 text-xs rounded-xl border text-center transition-colors truncate cursor-pointer ${
                        vehicleClassId === cls.id
                          ? 'bg-orange-600/20 border-orange-500 text-orange-400 font-semibold'
                          : 'bg-[#181a20] border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {cls.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Selection Pills */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-neutral-300">
                    Выберите услугу(и) *
                  </label>
                  <span className="text-[11px] text-neutral-500">Выбрано: {selectedServiceIds.length}</span>
                </div>
                {errors.services && <p className="text-[11px] text-red-400 mb-2">{errors.services}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {SERVICES.map((s) => {
                    const isChecked = selectedServiceIds.includes(s.id);
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => handleToggleService(s.id)}
                        className={`text-left p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                          isChecked
                            ? 'bg-orange-950/30 border-orange-500/70 text-white'
                            : 'bg-[#181a20] border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <span className="line-clamp-1">{s.title}</span>
                        {isChecked && <Check className="w-3.5 h-3.5 text-orange-500 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date & Time Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`${formId}-date`} className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Желаемая дата визита *
                  </label>
                  <div className="relative">
                    <input
                      id={`${formId}-date`}
                      type="date"
                      min={tomorrowStr}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`w-full bg-[#181a20] border rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors ${
                        errors.date ? 'border-red-500' : 'border-neutral-700 focus:border-orange-500'
                      }`}
                    />
                  </div>
                  {errors.date && <p className="text-[11px] text-red-400 mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Время записи *
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {TIME_SLOTS.slice(0, 6).map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setTimeSlot(slot)}
                        className={`py-2 text-xs font-mono rounded-lg border transition-colors cursor-pointer ${
                          timeSlot === slot
                            ? 'bg-orange-600 text-white font-semibold border-orange-500'
                            : 'bg-[#181a20] text-neutral-400 border-neutral-800 hover:text-white'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  {errors.timeSlot && <p className="text-[11px] text-red-400 mt-1">{errors.timeSlot}</p>}
                </div>
              </div>

              {/* Client Contacts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`${formId}-name`} className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Ваше имя *
                  </label>
                  <div className="relative">
                    <input
                      id={`${formId}-name`}
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Иван Петров"
                      className={`w-full bg-[#181a20] border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                        errors.fullName ? 'border-red-500' : 'border-neutral-700 focus:border-orange-500'
                      }`}
                    />
                  </div>
                  {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor={`${formId}-phone`} className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Номер телефона для связи *
                  </label>
                  <div className="relative">
                    <input
                      id={`${formId}-phone`}
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+7 (999) 000-00-00"
                      className={`w-full bg-[#181a20] border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 font-mono focus:outline-none transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-neutral-700 focus:border-orange-500'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Comment / Symptoms */}
              <div>
                <label htmlFor={`${formId}-comment`} className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Симптомы неисправности или пожелания (опционально)
                </label>
                <textarea
                  id={`${formId}-comment`}
                  rows={2}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Опишите посторонние звуки, вибрации или особые пожелания к мастеру..."
                  className="w-full bg-[#181a20] border border-neutral-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              {/* Policy Checkbox */}
              <div>
                <label className="flex items-start gap-2.5 text-xs text-neutral-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeToPolicy}
                    onChange={(e) => setAgreeToPolicy(e.target.checked)}
                    className="w-4 h-4 rounded mt-0.5 accent-orange-600 bg-neutral-800 border-neutral-700 cursor-pointer"
                  />
                  <span>
                    Я подтверждаю согласие на обработку персональных данных для согласования записи на обслуживание (демонстрационный режим).
                  </span>
                </label>
                {errors.policy && <p className="text-[11px] text-red-400 mt-1">{errors.policy}</p>}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm sm:text-base text-white bg-orange-600 hover:bg-orange-500 active:bg-orange-700 shadow-lg shadow-orange-950/40 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Wrench className="w-4 h-4" />
                <span>Подтвердить запись онлайн</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation Demo Modal Dialog */}
      {submittedSummary && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg rounded-2xl bg-[#14161c] border border-neutral-700 p-6 sm:p-8 text-white shadow-2xl space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-600/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <CheckCircle2 className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-orange-400 block">ДЕМОНСТРАЦИОННЫЙ РЕЖИМ</span>
                  <h3 className="text-xl font-bold">Заявка успешно сформирована!</h3>
                </div>
              </div>
              <button
                onClick={() => setSubmittedSummary(null)}
                className="text-neutral-400 hover:text-white p-1"
                aria-label="Закрыть окно подтверждения"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Booking Receipt Details */}
            <div className="p-4 rounded-xl bg-[#1a1d24] border border-neutral-800 space-y-2 text-xs">
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">Номер бронирования:</span>
                <span className="font-mono font-bold text-orange-400">{submittedSummary.bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Автомобиль:</span>
                <span className="text-white font-medium">
                  {submittedSummary.formData.carBrand} {submittedSummary.formData.carModel} ({submittedSummary.formData.carYear} г.)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Дата и время:</span>
                <span className="text-white font-medium">
                  {submittedSummary.formData.date} в {submittedSummary.formData.timeSlot}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Клиент:</span>
                <span className="text-white font-medium">
                  {submittedSummary.formData.fullName} ({submittedSummary.formData.phone})
                </span>
              </div>
              <div className="flex justify-between border-t border-neutral-800 pt-2">
                <span className="text-neutral-400">Расчетная стоимость работ:</span>
                <span className="font-mono font-bold text-white tabular-nums">
                  {submittedSummary.totalPrice.toLocaleString('ru-RU')} ₽
                </span>
              </div>
            </div>

            {/* Clear Demonstration Notice */}
            <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400 leading-relaxed">
              <strong className="text-neutral-300">Внимание:</strong> Это демонстрационный сайт. Данные заявки сохранены только в локальном состоянии браузера и не передавались на сторонний сервер или в CRM.
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyBookingDetails}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors flex items-center justify-center gap-2"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Скопировать данные</span>
              </button>
              <button
                onClick={() => setSubmittedSummary(null)}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white transition-colors"
              >
                Готово
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
