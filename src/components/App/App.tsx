import { useState } from "react";
import { getDateData } from "../../utils/date";
import MonthCalendar from "../MonthCalendar/MonthCalendar";
import Styles from "./app.module.css";

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
          <MonthCalendar
            monthStartDate={miniCalMonthStart}
            selectedDate={"2023-08-30"}
            currentDate={currentDate.formattedDate}
            onCellClick={() => {}}
          />
        </aside>

        <main className={Styles.main}></main>
      </div>
    </div>
  );
}

export default App;
