export interface CalendarEvent {
  id: number;
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endTime: string;
}

export const fetchEvents = (): Promise<CalendarEvent[]> =>
  fetch("http://localhost:3000/events").then(function (response) {
    return response.json();
  });

export const updateEvent = (
  updatedEvent: CalendarEvent
): Promise<CalendarEvent> =>
  fetch(`http://localhost:3000/events/${updatedEvent.id}`, {
    method: "PUT", // or 'PATCH' depending on your server's API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEvent),
  }).then(function (response) {
    return response.json();
  });
