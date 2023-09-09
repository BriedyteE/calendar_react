export enum DateActionType {
  SetDates = "set_dates",
  SetSelectedDate = "set_selected_date",
  SetMiniCalMonthStart = "set_mini_cal_month_start",
}

export interface State {
  miniCalMonthStart: Date;
  selectedDate: Date;
}

interface setDateAction {
  type: DateActionType.SetSelectedDate | DateActionType.SetMiniCalMonthStart;
  payload: { date: Date };
}

interface setDatesAction {
  type: DateActionType.SetDates;
  payload: {
    dates: {
      miniCalMonthStart: Date;
      selectedDate: Date;
    };
  };
}

export type DateAction = setDateAction | setDatesAction;
