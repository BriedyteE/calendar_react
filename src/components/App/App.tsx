import Styles from "./app.module.css";

import { useReducer } from "react";
import { datesReducer } from "../../reducers/datesReducer";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Sidebar from "../Sidebar";
import Header from "../Header";
import MainSection from "../MainSection";

import { getDateData, getFirstDateOfWeek } from "../../utils/date";
import { defaultDates } from "../../config/constants";

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

function App() {
  const [state, dispatch] = useReducer(datesReducer, defaultDates);

  const { formattedDate } = getDateData(state.selectedDate);
  const firstDateOfWeek = getFirstDateOfWeek(state.selectedDate);

  const getDateRange = () => {
    const lastDateOfWeek = new Date(
      firstDateOfWeek.getFullYear(),
      firstDateOfWeek.getMonth(),
      firstDateOfWeek.getDate() + 6
    );

    console.log("FIRST", firstDateOfWeek.toDateString());
    console.log("LAST", lastDateOfWeek.toDateString());

    const weekStart = [
      firstDateOfWeek.getMonth(),
      firstDateOfWeek.getFullYear(),
    ];

    const weekEnd = [
      lastDateOfWeek.getMonth(),
      lastDateOfWeek.getFullYear(),
    ].filter((value) => !weekStart.includes(value));

    return;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className={Styles.appWrapper}>
        <Header selectedDate={state.selectedDate} dispatch={dispatch} />
        <div className={Styles.sidebarAndMain}>
          <Sidebar
            dispatch={dispatch}
            miniCalMonthStart={state.miniCalMonthStart}
            selectedDate={formattedDate}
            dateRange={getDateRange()}
          />
          <MainSection firstDateOfWeek={firstDateOfWeek} dispatch={dispatch} />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
