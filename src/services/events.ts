import { SelectedEvent } from "../types/events";

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
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEvent),
  }).then(function (response) {
    return response.json();
  });

export const saveEvent = (
  updatedEvent: SelectedEvent
): Promise<CalendarEvent> =>
  fetch(`http://localhost:3000/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEvent),
  }).then(function (response) {
    return response.json();
  });
