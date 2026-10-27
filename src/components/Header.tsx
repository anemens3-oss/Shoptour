import { Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { DEMO_COMPANY_INFO } from '../data/mockData';

export type NavTab = 'home' | 'services' | 'calculator' | 'about' | 'contacts';

interface HeaderProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenBooking: () => void;
  onCopyPhone: () => void;
}

export function Header({
  currentTab,
  onSelectTab,
  onOpenBooking,
  onCopyPhone,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0d0f12]/95 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand wordmark (single text element in display face, no pills/subtitles) */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg p-1"
          >
            <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-neutral-200 transition-colors whitespace-nowrap shrink-0">
              AUTO<span className="text-orange-500">CARE</span>
            </span>
          </button>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentTab === 'home' ? 'text-white border-b-2 border-orange-500 font-semibold' : ''
              }`}
            >
              Главная
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentTab === 'services' ? 'text-white border-b-2 border-orange-500 font-semibold' : ''
              }`}
            >
              Услуги и цены
            </button>
            <button
              onClick={() => handleNavClick('calculator')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentTab === 'calculator' ? 'text-white border-b-2 border-orange-500 font-semibold' : ''
              }`}
            >
              Калькулятор ТО
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentTab === 'about' ? 'text-white border-b-2 border-orange-500 font-semibold' : ''
              }`}
            >
              О сервисе
            </button>
            <button
              onClick={() => handleNavClick('contacts')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentTab === 'contacts' ? 'text-white border-b-2 border-orange-500 font-semibold' : ''
              }`}
            >
              Контакты
            </button>
          </nav>

          {/* Zone 3: 1 primary action + Phone link */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden lg:flex flex-col items-end text-right">
              <a
                href={`tel:${DEMO_COMPANY_INFO.phoneRaw}`}
                className="text-xs font-mono font-medium text-neutral-200 hover:text-orange-400 transition-colors flex items-center gap-1.5"
                title="Нажмите для вызова или скопируйте"
              >
                <Phone className="w-3.5 h-3.5 text-orange-500" />
                <span>{DEMO_COMPANY_INFO.phoneDisplay}</span>
              </a>
              <span className="text-[11px] text-neutral-500">08:30 – 21:00 ежедневно</span>
            </div>

            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-orange-600 hover:bg-orange-500 active:bg-orange-700 rounded-lg shadow-sm hover:shadow-orange-600/20 transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0f12]"
            >
              Записаться онлайн
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white rounded-lg border border-neutral-800 hover:border-neutral-700 transition-colors"
              aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть навигационное меню'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-[#121418] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-1 gap-1 text-base font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
                currentTab === 'home' ? 'bg-orange-600/15 text-orange-400 font-semibold' : 'text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              Главная
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
                currentTab === 'services' ? 'bg-orange-600/15 text-orange-400 font-semibold' : 'text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              Услуги и цены
            </button>
            <button
              onClick={() => handleNavClick('calculator')}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
                currentTab === 'calculator' ? 'bg-orange-600/15 text-orange-400 font-semibold' : 'text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              Калькулятор стоимости
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
                currentTab === 'about' ? 'bg-orange-600/15 text-orange-400 font-semibold' : 'text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              О сервисе
            </button>
            <button
              onClick={() => handleNavClick('contacts')}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
                currentTab === 'contacts' ? 'bg-orange-600/15 text-orange-400 font-semibold' : 'text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              Контакты и схема проезда
            </button>
          </div>

          <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span>Прямой телефон:</span>
              <button
                onClick={onCopyPhone}
                className="text-orange-400 hover:underline font-mono"
              >
                Копировать номер
              </button>
            </div>
            <a
              href={`tel:${DEMO_COMPANY_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-sm rounded-lg transition-colors"
            >
              <Phone className="w-4 h-4 text-orange-500" />
              <span>{DEMO_COMPANY_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
