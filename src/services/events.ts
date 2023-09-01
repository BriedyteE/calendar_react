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
