import Styles from "../weekCalendar.module.css";
import { convertTo12HourTime } from "../../../utils/converters";
import { v4 as uuidv4 } from "uuid";

interface HoursColumnProps {
  cellIndexes: number[];
}

function HoursColumn({ cellIndexes }: HoursColumnProps) {
  return (
    <div className={Styles.hourColumn}>
      {cellIndexes.map((index) => (
        <div className={`${Styles.cell} ${Styles.hourCell}`} key={uuidv4()}>
          {index === 0 || index === 24 ? "" : convertTo12HourTime(index)}
        </div>
      ))}
    </div>
  );
}

export default HoursColumn;
