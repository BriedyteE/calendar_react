import { useState } from "react";

import {
  getDateData,
  getFirstDateOfMonth,
  getFirstDateOfWeek,
} from "../../utils/date";

import Styles from "./app.module.css";

import Sidebar from "../Sidebar";
import Header from "../Header";
import MainSection from "../MainSection";

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
        <MainSection
          firstDateOfWeek={getFirstDateOfWeek(selectedDate)}
          currentDate={currentDate.formattedDate}
        />
      </div>
    </div>
  );
}

export default App;
