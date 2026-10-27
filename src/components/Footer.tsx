import { ArrowUp, Clock, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { DEMO_COMPANY_INFO } from '../data/mockData';
import { NavTab } from './Header';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenBooking: () => void;
  onCopyPhone: () => void;
}

export function Footer({ onSelectTab, onOpenBooking, onCopyPhone }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#090a0d] border-t border-neutral-800 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-neutral-800/80">
          {/* Brand & Description (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-2xl font-extrabold tracking-tight text-white block">
              AUTO<span className="text-orange-500">CARE</span>
            </span>
            <p className="text-neutral-400 leading-relaxed text-xs sm:text-sm">
              Современный технологичный центр технического обслуживания и ремонта легковых автомобилей, кроссоверов и внедорожников. Дилерское оборудование, открытая ремзона и гарантия 2 года.
            </p>
            <div className="flex items-center gap-2 pt-2 text-neutral-300">
              <ShieldCheck className="w-4 h-4 text-orange-500" />
              <span className="font-medium text-xs">Сертифицировано по ГОСТ-Р</span>
            </div>
          </div>

          {/* Navigation Links Mirror (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold block">
              Разделы сайта
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectTab('home')}
                  className="hover:text-white transition-colors"
                >
                  Главная страница
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('services')}
                  className="hover:text-white transition-colors"
                >
                  Каталог услуг и цены
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('calculator')}
                  className="hover:text-white transition-colors"
                >
                  Интерактивный калькулятор ТО
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('about')}
                  className="hover:text-white transition-colors"
                >
                  О сервисе и стандартах качества
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('contacts')}
                  className="hover:text-white transition-colors"
                >
                  Контакты и схема проезда
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Services (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold block">
              Направления
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li>Компьютерная диагностика</li>
              <li>Замена масла и ТО</li>
              <li>3D Сход-развал колес</li>
              <li>Ремонт тормозной системы</li>
              <li>Шиномонтаж и балансировка</li>
              <li>Детейлинг и полировка</li>
            </ul>
          </div>

          {/* Quick Contact & Action (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold block">
              Связь с сервисом
            </span>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <a
                  href={`tel:${DEMO_COMPANY_INFO.phoneRaw}`}
                  className="font-mono text-sm font-bold text-white hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-orange-500" />
                  <span>{DEMO_COMPANY_INFO.phoneDisplay}</span>
                </a>
                <button
                  onClick={onCopyPhone}
                  className="text-[11px] text-orange-400 hover:underline font-mono"
                >
                  копировать
                </button>
              </div>

              <div className="flex items-start gap-1.5 text-neutral-400 text-xs">
                <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                <span>{DEMO_COMPANY_INFO.address}</span>
              </div>

              <div className="flex items-center gap-1.5 text-neutral-400 text-xs">
                <Clock className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>{DEMO_COMPANY_INFO.hours}</span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full mt-2 py-2 px-3 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Записаться в цех
            </button>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <div className="space-y-1 text-center md:text-left">
            <p>© {new Date().getFullYear()} AUTOCARE Service Center. Все права защищены.</p>
            <p className="text-neutral-400 max-w-2xl leading-relaxed">
              {DEMO_COMPANY_INFO.legalNotice}
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 shrink-0"
            aria-label="Вернуться наверх"
          >
            <span>Наверх</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
