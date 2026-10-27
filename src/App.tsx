import { useCallback, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { BookingSection } from './components/BookingSection';
import { ContactsSection } from './components/ContactsSection';
import { CostCalculator } from './components/CostCalculator';
import { DemoNoticeBanner } from './components/DemoNoticeBanner';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { Header, NavTab } from './components/Header';
import { Hero } from './components/Hero';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ServicesCatalog } from './components/ServicesCatalog';
import { ToastContainer, ToastMessage } from './components/Toast';
import { DEMO_COMPANY_INFO } from './data/mockData';
import { SERVICES } from './data/servicesData';
import { BookingSummary, ServiceItem, VehicleClass } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);
  const [selectedServiceIdsInCalc, setSelectedServiceIdsInCalc] = useState<string[]>([
    SERVICES[0].id,
    SERVICES[1].id,
  ]);
  const [bookingPrefillClass, setBookingPrefillClass] = useState<string>('sedan');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [showDemoInfoModal, setShowDemoInfoModal] = useState<boolean>(false);

  // Toast dispatch helper
  const addToast = useCallback((title: string, description?: string, type: 'success' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Phone copy handler
  const handleCopyPhone = useCallback(() => {
    navigator.clipboard.writeText(DEMO_COMPANY_INFO.phoneDisplay);
    addToast('Телефон скопирован', DEMO_COMPANY_INFO.phoneDisplay, 'success');
  }, [addToast]);

  // Tab change
  const handleSelectTab = (tab: NavTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick action: Open Booking
  const handleOpenBooking = () => {
    setCurrentTab('contacts');
    setTimeout(() => {
      const el = document.getElementById('booking');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // Quick action: Open Calculator
  const handleOpenCalculator = () => {
    setCurrentTab('calculator');
    setTimeout(() => {
      const el = document.getElementById('calculator');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // Quick action: View Services
  const handleViewServices = () => {
    setCurrentTab('services');
    setTimeout(() => {
      const el = document.getElementById('services-catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // Service toggle in calculator
  const handleToggleServiceInCalc = (service: ServiceItem) => {
    setSelectedServiceIdsInCalc((prev) => {
      const exists = prev.includes(service.id);
      if (exists) {
        addToast('Удалено из расчёта', service.title, 'info');
        return prev.filter((id) => id !== service.id);
      } else {
        addToast('Добавлено в расчёт', service.title, 'success');
        return [...prev, service.id];
      }
    });
  };

  const handleClearServicesInCalc = () => {
    setSelectedServiceIdsInCalc([]);
    addToast('Список услуг очищен', 'Выберите услуги заново', 'info');
  };

  // Booking from specific service card
  const handleBookSingleService = (service: ServiceItem) => {
    setSelectedServiceIdsInCalc([service.id]);
    setCurrentTab('contacts');
    addToast('Услуга выбрана для записи', service.title, 'success');
    setTimeout(() => {
      const el = document.getElementById('booking');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // Proceed to booking from cost calculator
  const handleProceedToBookingFromCalc = (
    vehicleClass: VehicleClass,
    selectedServices: ServiceItem[]
  ) => {
    setBookingPrefillClass(vehicleClass.id);
    setSelectedServiceIdsInCalc(selectedServices.map((s) => s.id));
    setCurrentTab('contacts');
    addToast('Расчет перенесен в форму записи', `Выбрано услуг: ${selectedServices.length}`, 'success');
    setTimeout(() => {
      const el = document.getElementById('booking');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // Callback request toast
  const handleCallbackRequested = (phone: string, name: string) => {
    addToast('Запрос обратного звонка зарегистрирован', `Мастер свяжется с вами по номеру ${phone}`, 'success');
  };

  // Booking created toast
  const handleBookingCreated = (summary: BookingSummary) => {
    addToast('Бронирование создано', `Номер заявки: ${summary.bookingId}`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#0d0f12] text-neutral-100 flex flex-col font-sans selection:bg-orange-600 selection:text-white">
      {/* Top Demo Notice Banner */}
      <DemoNoticeBanner onLearnMore={() => setShowDemoInfoModal(true)} />

      {/* Responsive Top Bar Navigation */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onOpenBooking={handleOpenBooking}
        onCopyPhone={handleCopyPhone}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <>
            <Hero
              onOpenBooking={handleOpenBooking}
              onOpenCalculator={handleOpenCalculator}
              onViewServices={handleViewServices}
            />
            <ServicesCatalog
              onSelectServiceDetail={(service) => setSelectedServiceDetail(service)}
              onBookService={handleBookSingleService}
              selectedServiceIds={selectedServiceIdsInCalc}
              onToggleServiceInCalculator={handleToggleServiceInCalc}
            />
            <CostCalculator
              selectedServiceIds={selectedServiceIdsInCalc}
              onToggleService={handleToggleServiceInCalc}
              onClearServices={handleClearServicesInCalc}
              onProceedToBooking={handleProceedToBookingFromCalc}
            />
            <AboutSection />
            <FaqSection />
            <BookingSection
              initialServiceIds={selectedServiceIdsInCalc}
              initialVehicleClassId={bookingPrefillClass}
              onCopyPhone={handleCopyPhone}
              onBookingCreated={handleBookingCreated}
            />
            <ContactsSection
              onCopyPhone={handleCopyPhone}
              onRequestCallback={handleCallbackRequested}
            />
          </>
        )}

        {currentTab === 'services' && (
          <div className="py-4">
            <ServicesCatalog
              onSelectServiceDetail={(service) => setSelectedServiceDetail(service)}
              onBookService={handleBookSingleService}
              selectedServiceIds={selectedServiceIdsInCalc}
              onToggleServiceInCalculator={handleToggleServiceInCalc}
            />
            <CostCalculator
              selectedServiceIds={selectedServiceIdsInCalc}
              onToggleService={handleToggleServiceInCalc}
              onClearServices={handleClearServicesInCalc}
              onProceedToBooking={handleProceedToBookingFromCalc}
            />
          </div>
        )}

        {currentTab === 'calculator' && (
          <div className="py-6">
            <CostCalculator
              selectedServiceIds={selectedServiceIdsInCalc}
              onToggleService={handleToggleServiceInCalc}
              onClearServices={handleClearServicesInCalc}
              onProceedToBooking={handleProceedToBookingFromCalc}
            />
          </div>
        )}

        {currentTab === 'about' && (
          <div className="py-6">
            <AboutSection />
            <FaqSection />
          </div>
        )}

        {currentTab === 'contacts' && (
          <div className="py-6">
            <BookingSection
              initialServiceIds={selectedServiceIdsInCalc}
              initialVehicleClassId={bookingPrefillClass}
              onCopyPhone={handleCopyPhone}
              onBookingCreated={handleBookingCreated}
            />
            <ContactsSection
              onCopyPhone={handleCopyPhone}
              onRequestCallback={handleCallbackRequested}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectTab={handleSelectTab}
        onOpenBooking={handleOpenBooking}
        onCopyPhone={handleCopyPhone}
      />

      {/* Modal: Service Detail Inspection */}
      <ServiceDetailModal
        service={selectedServiceDetail}
        onClose={() => setSelectedServiceDetail(null)}
        onBookNow={handleBookSingleService}
      />

      {/* Modal: Project & Demo Information */}
      {showDemoInfoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg rounded-2xl bg-[#15171e] border border-neutral-700 p-6 sm:p-8 text-white shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-white">О коммерческом проекте AUTOCARE</h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Этот веб-сайт разработан как премиальный коммерческий интерфейс для современного автосервиса.
            </p>
            <div className="space-y-2 text-xs text-neutral-300 bg-[#101216] p-4 rounded-xl border border-neutral-800">
              <p>• <strong>Цветовая гамма:</strong> Глубокий графитовый фон, чистая белая типографика и активные оранжевые акценты.</p>
              <p>• <strong>Интерактивность:</strong> Живой калькулятор стоимости с коэффициентами классов авто, фильтрация каталога, валидация онлайн-записи и технологические карты услуг.</p>
              <p>• <strong>Демонстрационный режим:</strong> Все контакты, телефоны, адреса и отзывы являются иллюстративными данными. Форма записи генерирует локальный демонстрационный талон.</p>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowDemoInfoModal(false)}
                className="px-5 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-xl transition-colors"
              >
                Понятно
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
