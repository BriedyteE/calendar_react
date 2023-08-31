import { useEffect, useState } from "react";

import Weekcalendar from "../WeekCalendar";
import EventModal from "../EventModal";

import Styles from "./mainSection.module.css";
import { CalendarEvent, fetchEvents } from "../../services/events";

interface MainSectionProps {
  firstDateOfWeek: Date;
  currentDate: string;
}

function MainSection({ firstDateOfWeek, currentDate }: MainSectionProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[] | null>(null);

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

  return (
    <main className={Styles.main}>
      <Weekcalendar
        weekStartDate={firstDateOfWeek}
        currentDate={currentDate}
        onCellClick={() => setIsModalVisible(true)}
        events={events}
      />
      <EventModal
        isModalVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </main>
  );
}

export default MainSection;
