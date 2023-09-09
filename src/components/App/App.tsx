import Styles from "./app.module.css";

import { useMemo } from "react";
import { useReducer } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Sidebar from "../Sidebar";
import Header from "../Header";
import MainSection from "../MainSection";

import { getDateData, getFirstDateOfWeek } from "../../utils/date";
import { defaultDates } from "../../config/constants";
import { datesReducer } from "../../reducers/datesReducer";

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

  const firstDateOfWeek = useMemo(
    () => getFirstDateOfWeek(state.selectedDate),
    [state.selectedDate]
  );

  const { formattedDate } = getDateData(state.selectedDate);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={Styles.appWrapper}>
        <Header selectedDate={state.selectedDate} dispatch={dispatch} />
        <div className={Styles.sidebarAndMain}>
          <Sidebar
            dispatch={dispatch}
            miniCalMonthStart={state.miniCalMonthStart}
            selectedDate={formattedDate}
          />
          <MainSection firstDateOfWeek={firstDateOfWeek} />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
