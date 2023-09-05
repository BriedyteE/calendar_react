import React, { useEffect, useState } from "react";

import Weekcalendar from "../WeekCalendar";
import EventModal from "../EventModal";

import Styles from "./mainSection.module.css";
import {
  CalendarEvent,
  fetchEvents,
  updateEvent,
  saveEvent,
} from "../../services/events";
import { SelectedEvent } from "../../types/events";
import { converIndexToHour } from "../../utils/converters";

interface MainSectionProps {
  firstDateOfWeek: Date;
  currentDate: string;
}

function MainSection({ firstDateOfWeek, currentDate }: MainSectionProps) {
  const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(
    null
  );

  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const events = await fetchEvents();
        if (events) {
          setEvents(events);
        }
      } catch {
        console.log("oh no");
      }
    };

    getEvents();
  }, []);

  const createNewEvent = (cellIndex: number, date: string) => {
    const startHour = converIndexToHour(cellIndex);
    const newEvent = {
      title: "",
      startDate: date,
      startTime: `${startHour}:00`,
      endTime: `${startHour}:30`,
    };
    setSelectedEvent(newEvent);
  };

  const submitEvent = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedEvent?.id) {
      const update = async () => {
        try {
          const updatedEvent = await updateEvent(
            selectedEvent as CalendarEvent
          );
          setEvents([
            ...events.filter((event) => event.id !== updatedEvent.id),
            updatedEvent,
          ]);
          setSelectedEvent(null);
        } catch {
          console.log("oh no");
        }
      };

      update();
      return;
    }

    if (selectedEvent) {
      const save = async () => {
        try {
          const newEvent = await saveEvent(selectedEvent);
          setEvents([...events, newEvent]);
          setSelectedEvent(null);
        } catch {
          console.log("oh no");
        }
      };

      save();
    }
  };

  return (
    <main className={Styles.main}>
      <Weekcalendar
        weekStartDate={firstDateOfWeek}
        currentDate={currentDate}
        onCellClick={(e, cellIndex, date) => {
          if (e.target === e.currentTarget) {
            createNewEvent(cellIndex, date);
          }
        }}
        events={events}
        onEventSlotClick={(event) => setSelectedEvent(event)}
      />
      <EventModal
        modalEvent={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onSubmit={submitEvent}
        setSelectedEvent={(event) => setSelectedEvent(event)}
      />
    </main>
  );
}

export default MainSection;
