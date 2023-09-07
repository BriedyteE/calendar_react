import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarEvent, SelectedEvent } from "../types/events";

const fetchEvents = (): Promise<CalendarEvent[]> =>
  fetch("http://localhost:3000/events").then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });

const saveEvent = (newEvent: SelectedEvent): Promise<CalendarEvent> =>
  fetch(`http://localhost:3000/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEvent),
  }).then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });

const updateEvent = (updatedEvent: CalendarEvent): Promise<CalendarEvent> =>
  fetch(`http://localhost:3000/events/${updatedEvent.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEvent),
  }).then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });

const deleteEvent = (eventId: number): Promise<number> =>
  fetch(`http://localhost:3000/events/${eventId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return eventId;
  });

export const useFetchEvents = () =>
  useQuery({ queryKey: ["events"], queryFn: fetchEvents });

export const useSaveEventMutate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveEvent,
    onSuccess: (newEvent) => {
      queryClient.setQueryData<CalendarEvent[]>(["events"], (events) => [
        ...(events || []),
        newEvent,
      ]);
    },
  });
};

export const useUpdateEventMutate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEvent,
    onSuccess: (updatedEvent) => {
      queryClient.setQueryData<CalendarEvent[]>(["events"], (events) => {
        if (events) {
          return events.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
          );
        }
      });
    },
  });
};

export const useDeleteEventMutate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEvent,
    onSuccess: (deletedEventId) => {
      queryClient.setQueryData<CalendarEvent[]>(["events"], (events) => {
        if (events) {
          return events.filter((event) => event.id !== deletedEventId);
        }
      });
    },
  });
};
