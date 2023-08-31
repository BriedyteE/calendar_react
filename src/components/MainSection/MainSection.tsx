import { useState } from "react";

import Weekcalendar from "../WeekCalendar";
import EventModal from "../EventModal";

import Styles from "./mainSection.module.css";

interface MainSectionProps {
  firstDateOfWeek: Date;
  currentDate: string;
}

function MainSection({ firstDateOfWeek, currentDate }: MainSectionProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <main className={Styles.main}>
      <Weekcalendar
        weekStartDate={firstDateOfWeek}
        currentDate={currentDate}
        onCellClick={() => setIsModalVisible(true)}
      />
      <EventModal
        isModalVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </main>
  );
}

export default MainSection;
