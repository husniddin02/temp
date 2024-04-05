import React from "react";
import { FeatureCard } from "@/widgets/cards";

function HomeCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FeatureCard
        title="Просмотр мероприятий"
        description="Найдите идеальное мероприятие среди тысяч предложений. Используйте удобные фильтры, чтобы найти события по категории, дате, времени, месту и другим параметрам."
        image="/img/toj.jpg"
        link="/events"
      />
      <FeatureCard
        title="Просмотр спортобъекта"
        description="Найдите спортивные объекты рядом с вами и узнайте об их услугах."
        image="/img/runbaby.jpg"
        link="/facilities"
      />
      <FeatureCard
        title="Новости спорта"
        description="Будьте в курсе последних спортивных событий и новостей."
        image="/img/toj.jpg"
        link="/news"
      />
    </div>
  );
}

export default HomeCards;
