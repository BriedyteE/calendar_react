import { DateAction, DateActionType, State } from "../types/datesReducer";

export function datesReducer(state: State, action: DateAction) {
  switch (action.type) {
    case DateActionType.SetDates: {
      return action.payload.dates;
    }
    case DateActionType.SetMiniCalMonthStart: {
      return {
        ...state,
        miniCalMonthStart: action.payload.date,
      };
    }
    case DateActionType.SetSelectedDate: {
      return {
        ...state,
        selectedDate: action.payload.date,
      };
    }
    default:
      return state;
  }
}
