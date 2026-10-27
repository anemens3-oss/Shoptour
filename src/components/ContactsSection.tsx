import { Clock, Copy, Mail, MapPin, Navigation, Phone, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { DEMO_COMPANY_INFO } from '../data/mockData';

interface ContactsSectionProps {
  onCopyPhone: () => void;
  onRequestCallback: (phone: string, name: string) => void;
}

export function ContactsSection({ onCopyPhone, onRequestCallback }: ContactsSectionProps) {
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackSuccess, setCallbackSuccess] = useState(false);
  const [callbackError, setCallbackError] = useState('');

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = callbackPhone.replace(/\D/g, '');
    if (!callbackName.trim()) {
      setCallbackError('Укажите ваше имя');
      return;
    }
    if (digits.length < 10) {
      setCallbackError('Введите корректный номер телефона');
      return;
    }
    setCallbackError('');
    setCallbackSuccess(true);
    onRequestCallback(callbackPhone, callbackName);
  };

  return (
    <section className="py-12 lg:py-20 bg-[#111317] border-t border-neutral-800" id="contacts">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-400 mb-2">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span>ДЕМОНСТРАЦИОННЫЕ КООРДИНАТЫ И СВЯЗЬ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Контакты автосервиса AUTOCARE
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 mt-2">
            Удобный заезд с Третьего транспортного кольца, собственная охраняемая клиентская парковка на 30 автомобилей.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Cards: 4 Info Blocks */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone Card */}
              <div className="p-6 rounded-2xl bg-[#15171e] border border-neutral-800 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-orange-600/20 border border-orange-500/30 flex items-center justify-center text-orange-500 mb-4">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-neutral-400 block mb-1">МНОГОКАНАЛЬНЫЙ ТЕЛЕФОН</span>
                  <a
                    href={`tel:${DEMO_COMPANY_INFO.phoneRaw}`}
                    className="text-lg sm:text-xl font-bold font-mono text-white hover:text-orange-400 transition-colors block"
                  >
                    {DEMO_COMPANY_INFO.phoneDisplay}
                  </a>
                  <p className="text-xs text-neutral-400 mt-1">Звонок бесплатный по всей РФ</p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between">
                  <span className="text-xs text-neutral-500">Демо-линия</span>
                  <button
                    onClick={onCopyPhone}
                    className="text-xs text-orange-400 hover:underline flex items-center gap-1 font-mono"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Скопировать</span>
                  </button>
                </div>
              </div>

              {/* Hours Card */}
              <div className="p-6 rounded-2xl bg-[#15171e] border border-neutral-800 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-orange-500 mb-4">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-neutral-400 block mb-1">РЕЖИМ РАБОТЫ</span>
                  <p className="text-base font-bold text-white leading-snug">08:30 – 21:00</p>
                  <p className="text-xs text-neutral-400 mt-1">Без перерывов и выходных</p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800 text-xs text-neutral-400">
                  <span>Прием на эвакуаторе: круглосуточно</span>
                </div>
              </div>

              {/* Address Card */}
              <div className="p-6 rounded-2xl bg-[#15171e] border border-neutral-800 sm:col-span-2">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-orange-500 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-neutral-400 block">ФАКТИЧЕСКИЙ АДРЕС СЕРВИСНОГО ЦЕНТРА</span>
                    <p className="text-base font-bold text-white">{DEMO_COMPANY_INFO.address}</p>
                    <p className="text-xs text-neutral-400">{DEMO_COMPANY_INFO.metro}</p>
                    <div className="pt-2 text-xs text-neutral-500 font-mono">
                      GPS: 55.7088° N, 37.6582° E (Демонстрационная точка)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stylized Visual Map Diagram */}
            <div className="relative w-full aspect-[21/9] rounded-2xl bg-[#15181f] border border-neutral-800 overflow-hidden p-6 flex flex-col justify-between">
              {/* Grid backdrop */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, #f97316 1px, transparent 0)`,
                  backgroundSize: '20px 20px',
                }}
              />
              <div className="relative z-10 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>ИНТЕРАКТИВНАЯ СХЕМА ПРОЕЗДА</span>
                <span className="text-orange-400">ВЪЕЗД ЧЕРЕЗ ШЛАГБАУМ №2</span>
              </div>

              <div className="relative z-10 flex items-center justify-center my-auto">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#111317]/90 border border-neutral-700 shadow-xl">
                  <Navigation className="w-5 h-5 text-orange-500 animate-bounce" />
                  <div>
                    <span className="text-xs font-bold text-white block">AUTOCARE WORKSHOP</span>
                    <span className="text-[11px] text-neutral-400">КПП со стороны ул. Автозаводская</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                <span>ПАРКОВКА: БЕСПЛАТНО 3 ЧАСА ДЛЯ КЛИЕНТОВ</span>
                <span>СХОД С ТТК: 2 МИНУТЫ</span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Quick Callback Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#15171e] border border-neutral-800 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-mono text-orange-400 uppercase tracking-wider block mb-1">
                  ЭКСПРЕСС-СВЯЗЬ
                </span>
                <h3 className="text-xl font-bold text-white">Заказать обратный звонок</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Оставьте номер — мастер-консультант перезвонит в течение 10 минут в рабочее время для предварительной консультации.
                </p>
              </div>

              {callbackSuccess ? (
                <div className="p-4 rounded-xl bg-orange-950/30 border border-orange-500/40 text-center space-y-2 animate-in fade-in duration-200">
                  <ShieldCheck className="w-8 h-8 text-orange-400 mx-auto" />
                  <h4 className="text-sm font-bold text-white">Запрос обратного звонка принят!</h4>
                  <p className="text-xs text-neutral-300">
                    В демонстрационном режиме мастер свяжется с вами по указанному номеру {callbackPhone}.
                  </p>
                  <button
                    onClick={() => {
                      setCallbackSuccess(false);
                      setCallbackName('');
                      setCallbackPhone('');
                    }}
                    className="text-xs text-orange-400 hover:underline pt-2 inline-block"
                  >
                    Отправить еще один запрос
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      value={callbackName}
                      onChange={(e) => setCallbackName(e.target.value)}
                      placeholder="Как к вам обращаться"
                      className="w-full bg-[#181a20] border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Телефон для связи
                    </label>
                    <input
                      type="tel"
                      value={callbackPhone}
                      onChange={(e) => setCallbackPhone(e.target.value)}
                      placeholder="+7 (999) 000-00-00"
                      className="w-full bg-[#181a20] border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  {callbackError && (
                    <p className="text-xs text-red-400">{callbackError}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl font-semibold text-sm text-white bg-orange-600 hover:bg-orange-500 active:bg-orange-700 transition-colors shadow-md shadow-orange-950/30 cursor-pointer"
                  >
                    Перезвоните мне
                  </button>

                  <p className="text-[11px] text-neutral-500 text-center leading-relaxed">
                    Нажимая кнопку, вы подтверждаете ознакомление с демонстрационными условиями сервиса.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
