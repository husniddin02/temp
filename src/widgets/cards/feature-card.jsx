// widgets/cards/feature-card.jsx

import React from "react";
import { Card, CardBody, CardHeader, Typography, Button } from "@material-tailwind/react";
import PropTypes from "prop-types"; // Импортируем PropTypes

export function FeatureCard({ color, title, description, image, link }) {
  return (
    <Card className="rounded-lg shadow-lg shadow-gray-500/10">
      {image && (
        <CardHeader floated={false} className="relative h-56">
          <img alt="Card Image" src={image} className="h-full w-full" />
        </CardHeader>
      )}
      <CardBody className="px-8 text-center">
        <Typography variant="h5" className="mb-2" color="blue-gray">
          {title}
        </Typography>
        <Typography className="font-normal text-blue-gray-600">
          {description}
        </Typography>
        {link && (
          <Button variant="filled" href={link}>
            Узнать больше
          </Button>
        )}
      </CardBody>
    </Card>
  );
}

FeatureCard.defaultProps = {
  color: "blue",
};

FeatureCard.propTypes = {
  color: PropTypes.oneOf([
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  image: PropTypes.string,
  link: PropTypes.string,
};

// Usage example (replace with your actual image paths and links)
function MyCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FeatureCard
        title="Просмотр мероприятий"
        description="Найдите предстоящие спортивные мероприятия в вашем регионе."
        image="/img/backround2.jpg"
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
