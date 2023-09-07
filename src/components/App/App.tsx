import { useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  getDateData,
  getFirstDateOfMonth,
  getFirstDateOfWeek,
} from "../../utils/date";

import Styles from "./app.module.css";

import Sidebar from "../Sidebar";
import Header from "../Header";
import MainSection from "../MainSection";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const currentDate = getDateData(new Date());
const defaultDates = {
  miniCalMonthStart: getFirstDateOfMonth(currentDate.date),
  selectedDate: currentDate.date,
};

function App() {
  const [miniCalMonthStart, setMiniCalMonthStart] = useState(
    defaultDates.miniCalMonthStart
  );
  const [selectedDate, setSelectedDate] = useState(defaultDates.selectedDate);

  const firstDateOfWeek = useMemo(
    () => getFirstDateOfWeek(selectedDate),
    [selectedDate]
  );

  const { formattedDate } = getDateData(selectedDate);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={Styles.appWrapper}>
        <Header
          selectedDate={selectedDate}
          onTodayBtnClick={() => {
            setMiniCalMonthStart(defaultDates.miniCalMonthStart);
            setSelectedDate(defaultDates.selectedDate);
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
            selectedDate={formattedDate}
          />
          <MainSection
            firstDateOfWeek={firstDateOfWeek}
            currentDate={currentDate.formattedDate}
          />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
