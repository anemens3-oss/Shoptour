import { CheckCircle2, Clock, Filter, Plus, Search, ShieldCheck, Wrench, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CATEGORIES_LIST, SERVICES } from '../data/servicesData';
import { ServiceCategory, ServiceItem } from '../types';
import { ServiceVisualBadge } from './ServiceVisualBadge';

interface ServicesCatalogProps {
  onSelectServiceDetail: (service: ServiceItem) => void;
  onBookService: (service: ServiceItem) => void;
  selectedServiceIds: string[];
  onToggleServiceInCalculator: (service: ServiceItem) => void;
}

export function ServicesCatalog({
  onSelectServiceDetail,
  onBookService,
  selectedServiceIds,
  onToggleServiceInCalculator,
}: ServicesCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered services based on category and search query
  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      const matchesCategory =
        selectedCategory === 'all' || service.category === selectedCategory;
      const matchesSearch =
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="py-12 lg:py-20 bg-[#0d0f12]" id="services-catalog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>ПРЕЙСКУРАНТ И СЕРТИФИЦИРОВАННЫЕ НАПРАВЛЕНИЯ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Каталог услуг и стоимость работ
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
              Точные фиксированные цены на основные виды обслуживания. Все работы выполняются строго по заводским технологическим картам с гарантией до 2 лет.
            </p>
          </div>

          {/* Live Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по услугам..."
              className="w-full bg-[#15171c] border border-neutral-700/80 rounded-xl pl-10 pr-9 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                aria-label="Очистить поиск"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs (Segmented functional buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto py-6 no-scrollbar">
          {CATEGORIES_LIST.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-950/30 font-semibold'
                    : 'bg-[#15181e] text-neutral-400 hover:text-white hover:bg-[#1b1e26] border border-neutral-800'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Active Filters Summary if searching */}
        {searchQuery && (
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-6 bg-[#14161b] p-3 rounded-lg border border-neutral-800">
            <span>
              Результаты по запросу «<strong className="text-white">{searchQuery}</strong>»: найдено {filteredServices.length}
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-orange-400 hover:underline"
            >
              Сбросить поиск
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16 px-4 rounded-2xl bg-[#14161b] border border-neutral-800">
            <Filter className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">Услуги не найдены</h3>
            <p className="text-sm text-neutral-400 mt-1 max-w-md mx-auto">
              По вашему запросу ничего не найдено. Попробуйте изменить формулировку или выберите другую категорию.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-orange-400 bg-orange-950/30 border border-orange-800/50 rounded-lg hover:bg-orange-900/40 transition-colors"
            >
              Сбросить все фильтры
            </button>
          </div>
        )}

        {/* Large Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const isSelectedForCalc = selectedServiceIds.includes(service.id);
            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between rounded-2xl bg-[#14161c] border border-neutral-800 hover:border-neutral-700 transition-all duration-200 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-black/60"
              >
                {/* Visual Category Header with Graphic */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <ServiceVisualBadge category={service.category} className="w-16 h-16 shrink-0" />
                    <div className="text-right">
                      <span className="text-[11px] font-mono text-neutral-400 block">СТОИМОСТЬ РАБОТ</span>
                      <span className="text-2xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                        от {service.basePrice.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  </div>

                  {/* Unboxed Metadata: category and estimated time */}
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                    <span className="text-orange-400 font-medium">{service.categoryName}</span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-500" />
                      {service.estimatedDuration}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 mt-2.5 leading-relaxed line-clamp-3">
                    {service.shortDesc}
                  </p>

                  {/* Key procedure highlights */}
                  <ul className="mt-4 space-y-1.5 border-t border-neutral-800/80 pt-3 text-xs text-neutral-300">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Actions Footer */}
                <div className="p-6 pt-3 mt-auto bg-[#101217]/50 border-t border-neutral-800/80 flex items-center gap-2.5">
                  <button
                    onClick={() => onSelectServiceDetail(service)}
                    className="flex-1 py-2.5 px-3 text-xs font-semibold text-neutral-200 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors text-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                  >
                    Подробнее
                  </button>

                  <button
                    onClick={() => onToggleServiceInCalculator(service)}
                    className={`py-2.5 px-3 text-xs font-semibold rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
                      isSelectedForCalc
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'bg-[#1e222a] hover:bg-neutral-700 text-orange-400 border border-neutral-700/60'
                    }`}
                    title={isSelectedForCalc ? 'Удалить из калькулятора' : 'Добавить в предварительный расчет'}
                  >
                    {isSelectedForCalc ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Выбрано</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>В расчёт</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onBookService(service)}
                    className="p-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl transition-colors shrink-0"
                    title="Записаться сразу на эту услугу"
                    aria-label={`Записаться на ${service.title}`}
                  >
                    <Wrench className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner at bottom of services */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#14161c] via-[#171a22] to-[#14161c] border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-600/20 border border-orange-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Все цены являются окончательными и фиксируются в договоре</h4>
              <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                Мы никогда не приступаем к дополнительным работам без вашего предварительного письменного или телефонного согласования.
              </p>
            </div>
          </div>
          <a
            href="#calculator"
            className="px-5 py-2.5 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            Рассчитать ТО для вашего авто
          </a>
        </div>
      </div>
    </section>
  );
}
