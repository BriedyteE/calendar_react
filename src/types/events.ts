export interface CalendarEvent {
  id: number;
  title: string;
  description?: string;
  startDate: string;
  startTime: string;
  endTime: string;
}

export interface SelectedEvent extends Omit<CalendarEvent, "id"> {
  id?: number;
}
