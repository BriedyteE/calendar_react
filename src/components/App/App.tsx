import Styles from "./app.module.css";

import { useReducer } from "react";
import { datesReducer } from "../../reducers/datesReducer";
import { defaultDates } from "../../config/constants";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Sidebar from "../Sidebar";
import Header from "../Header";
import MainSection from "../MainSection";

import {
  getDateData,
  getFirstDateOfWeek,
  getWeekDateRange,
} from "../../utils/date";

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

  return (
    <QueryClientProvider client={queryClient}>
      <div className={Styles.appWrapper}>
        <Header
          selectedDate={state.selectedDate}
          dispatch={dispatch}
          dateRange={getWeekDateRange(firstDateOfWeek)}
        />
        <div className={Styles.sidebarAndMain}>
          <Sidebar
            dispatch={dispatch}
            miniCalMonthStart={state.miniCalMonthStart}
            selectedDate={formattedDate}
          />
          <MainSection firstDateOfWeek={firstDateOfWeek} dispatch={dispatch} />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
