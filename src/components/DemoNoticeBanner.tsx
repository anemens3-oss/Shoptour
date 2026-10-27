import { AlertCircle } from 'lucide-react';

interface DemoNoticeBannerProps {
  onLearnMore?: () => void;
}

export function DemoNoticeBanner({ onLearnMore }: DemoNoticeBannerProps) {
  return (
    <aside aria-label="Информация о демонстрационном режиме" className="bg-[#181a1f] border-b border-neutral-800 text-neutral-300 text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-orange-400 shrink-0" />
          <span>
            <strong className="text-white font-medium">Демонстрационный режим:</strong> Контактные данные, адрес и отзывы являются демонстрационными. Онлайн-заявки обрабатываются на клиенте.
          </span>
        </div>
        {onLearnMore && (
          <button
            onClick={onLearnMore}
            className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors whitespace-nowrap"
          >
            Подробнее о проекте
          </button>
        )}
      </div>
    </aside>
  );
}
