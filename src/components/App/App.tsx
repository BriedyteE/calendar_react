import { useState } from "react";
import { getDateData, getFirstDateOfWeek } from "../../utils/date";
import Styles from "./app.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Weekcalendar from "../WeekCalendar";

function App() {
  const currentDate = getDateData(new Date());
  const [miniCalMonthStart, setMiniCalMonthStart] = useState(
    new Date(currentDate.year, currentDate.month, 1)
  );
  const [selectedDate, setSelectedDate] = useState(currentDate.date);

  return (
    <div className={Styles.appWrapper}>
      <header className={Styles.header}></header>
      <div className={Styles.sidebarAndMain}>
        <Sidebar
          miniCalMonthStart={miniCalMonthStart}
          currentDate={currentDate.formattedDate}
          setMiniCalMonthStart={(date) => setMiniCalMonthStart(date)}
          setSelectedDate={(date) => setSelectedDate(date)}
        />
        <main className={Styles.main}>
          <Weekcalendar
            weekStartDate={getFirstDateOfWeek(selectedDate)}
            currentDate={currentDate.formattedDate}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
