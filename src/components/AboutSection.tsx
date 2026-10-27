import { Award, CheckCircle2, Coffee, Eye, Star, Wrench } from 'lucide-react';
import { DEMO_REVIEWS, DEMO_TEAM, QUALITY_STANDARDS } from '../data/mockData';

export function AboutSection() {
  return (
    <section className="py-12 lg:py-20 bg-[#0f1115] border-t border-neutral-800" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span>ИНФРАСТРУКТУРА И ТЕХНОЛОГИИ AUTOCARE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Европейские стандарты автосервиса и 100% открытость для клиента
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 mt-3 leading-relaxed">
            Мы объединили дилерскую точность диагностического оборудования с прозрачным подходом независимого сервиса. Никаких скрытых платежей, лишних замен и навязанных услуг.
          </p>
        </div>

        {/* 5 Quality Standards Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {QUALITY_STANDARDS.map((standard) => (
            <div
              key={standard.number}
              className="p-6 rounded-2xl bg-[#14161c] border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-2xl font-extrabold text-orange-500/80 block mb-3">
                  {standard.number}.
                </span>
                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {standard.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {standard.description}
                </p>
              </div>
            </div>
          ))}

          {/* 6th Card: Client Lounge Feature */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#181b22] to-[#121419] border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-orange-600/20 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-3">
                <Coffee className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 leading-snug">
                Комфортная зона ожидания
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Пока автомобиль на подъемнике, отдыхайте в чистом зале с бесплатным кофе, рабочими местами для ноутбуков и экранами видеотрансляции из цеха.
              </p>
            </div>
          </div>
        </div>

        {/* Certified Team of Specialists */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-neutral-800 pb-4">
            <div>
              <span className="text-xs font-mono text-orange-400 block mb-1">КОМАНДА ЭКСПЕРТОВ</span>
              <h3 className="text-2xl font-bold text-white">Сертифицированные мастера цеха</h3>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm">
              Все специалисты регулярно проходят повышение квалификации в учебных центрах Bosch, Hunter и дилерских академиях.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEMO_TEAM.map((member, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-[#14161b] border border-neutral-800 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#1b1f28] border border-neutral-700 flex items-center justify-center text-orange-400 font-mono font-bold text-base mb-4">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h4 className="text-base font-bold text-white">{member.name}</h4>
                  <p className="text-xs text-orange-400 font-medium mt-0.5">{member.role}</p>
                  <p className="text-xs text-neutral-400 font-mono mt-1">{member.experience}</p>
                  <p className="text-xs text-neutral-300 mt-2.5 leading-relaxed">{member.specialization}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800/80 space-y-1">
                  {member.certifications.map((cert, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-1.5 text-[11px] text-neutral-400">
                      <Award className="w-3 h-3 text-orange-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Reviews Section (Demonstration Data explicitly labeled) */}
        <div className="pt-8 border-t border-neutral-800">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 mb-1">
                <span className="text-orange-400">ДЕМОНСТРАЦИОННЫЕ ДАННЫЕ</span>
                <span>·</span>
                <span>ПРИМЕРЫ ОТЗЫВОВ</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Впечатления клиентов сервиса</h3>
            </div>
            <div className="flex items-center gap-1 text-xs text-neutral-400 font-mono">
              <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
              <span className="text-white font-bold">4.9 / 5.0</span>
              <span>(демонстрационный рейтинг)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEMO_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-2xl bg-[#14161c] border border-neutral-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-white">{review.clientName}</span>
                    <span className="text-[11px] font-mono text-neutral-500">{review.date}</span>
                  </div>
                  <div className="text-xs text-orange-400 font-medium mb-1">
                    {review.vehicle}
                  </div>
                  <div className="text-[11px] text-neutral-400 mb-3 italic">
                    Услуга: {review.serviceDone}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    «{review.text}»
                  </p>
                </div>

                <div className="flex items-center gap-1 mt-4 pt-3 border-t border-neutral-800">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                  ))}
                  <span className="text-[11px] text-neutral-400 ml-2">Проверенный заказ-наряд</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
