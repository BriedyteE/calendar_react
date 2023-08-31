import { useState } from "react";
import {
  getDateData,
  getFirstDateOfMonth,
  getFirstDateOfWeek,
} from "../../utils/date";
import Styles from "./app.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Weekcalendar from "../WeekCalendar";
import Header from "../Header";

function App() {
  const currentDate = getDateData(new Date());
  const defaultMiniCalDate = getFirstDateOfMonth(currentDate.date);

  const [miniCalMonthStart, setMiniCalMonthStart] =
    useState(defaultMiniCalDate);
  const [selectedDate, setSelectedDate] = useState(currentDate.date);

  return (
    <div className={Styles.appWrapper}>
      <Header
        selectedDate={selectedDate}
        onTodayBtnClick={() => {
          setMiniCalMonthStart(defaultMiniCalDate);
          setSelectedDate(currentDate.date);
        }}
        onNavigationClick={(date) => {
          setMiniCalMonthStart(getFirstDateOfMonth(date));
          setSelectedDate(date);
        }}
      />
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
