import { useState } from "react";
import { getAdjecentMonth, getDateData } from "../../utils/date";
import MonthCalendar from "../MonthCalendar/MonthCalendar";
import Styles from "./app.module.css";
import NavigationButtons from "../NavigationButtons";
import { MONTHS } from "../../config/constants";

function App() {
  const currentDate = getDateData(new Date());
  const [miniCalMonthStart, setMiniCalMonthStart] = useState(
    new Date(currentDate.year, currentDate.month, 1)
  );

  return (
    <div className={Styles.appWrapper}>
      <header className={Styles.header}></header>
      <div className={Styles.sidebarAndMain}>
        <aside className={Styles.sidebar}>
          <div className={Styles.navigationHeader}>
            <div className={Styles.navigationHeader}>
              <p>{`${
                MONTHS[miniCalMonthStart.getMonth()]
              } ${miniCalMonthStart.getFullYear()}`}</p>
            </div>

            <NavigationButtons
              onNavigationClick={({ isLeft }) =>
                setMiniCalMonthStart(
                  getAdjecentMonth({
                    date: miniCalMonthStart,
                    isPrevious: isLeft,
                  })
                )
              }
            />
          </div>
          <MonthCalendar
            monthStartDate={miniCalMonthStart}
            selectedDate={"2023-08-30"}
            currentDate={currentDate.formattedDate}
            onCellClick={(date) => setMiniCalMonthStart(date)}
          />
        </aside>

        <main className={Styles.main}></main>
      </div>
    </div>
  );
}

export default App;
