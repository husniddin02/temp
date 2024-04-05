import React from "react";
import { Typography } from "@material-ui/core";

function EventCard({ event }) {
  return (
    <div className="event-card p-4 bg-white rounded shadow">
      <Typography variant="h5" component="h2" className="mb-2 font-bold">
        {event.event_name}
      </Typography>
      <Typography variant="body2" color="textSecondary" className="mb-2">
        {event.event_date} | {event.location}
      </Typography>
      <Typography variant="body1" className="mb-4">
        {event.description}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Организатор: {event.organizer}
      </Typography>
    </div>
  );
}

export default EventCard;
