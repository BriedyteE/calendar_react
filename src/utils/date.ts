interface GetAdjecentDate {
  date: Date;
  isPrevious: boolean;
}

export const getDateData = (date: Date) => {
  const dayOfWeek = date.getDay();
  const dayOfMonth = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const formattedDate = [
    year,
    month + 1 > 9 ? month + 1 : `0${month + 1}`,
    dayOfMonth > 9 ? dayOfMonth : `0${dayOfMonth}`,
  ].join("-");

  return {
    dayOfWeek: dayOfWeek === 0 ? 7 : dayOfWeek,
    dayOfMonth,
    month,
    year,
    formattedDate,
    date,
  };
};

export const getAdjecentMonth = ({ date, isPrevious }: GetAdjecentDate) => {
  const month = date.getMonth();
  return new Date(date.getFullYear(), isPrevious ? month - 1 : month + 1, 1);
};

export const getAdjecentWeek = ({ date, isPrevious }: GetAdjecentDate) => {
  const day = date.getDate();
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    isPrevious ? day - 7 : day + 7
  );
};

export const getFirstDateOfWeek = (date: Date) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - date.getDay()
  );
};

export const getFirstDateOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getWeekColumnDayByIndex = (weekStartDate: Date, index: number) => {
  return getDateData(
    new Date(
      weekStartDate.getFullYear(),
      weekStartDate.getMonth(),
      weekStartDate.getDate() + index
    )
  );
};
