
import { CalendarIcon } from "lucide-react";

const Calendar = ({ className = "", ...props }: { className?: string }) => {
  return <CalendarIcon className={className} {...props} />;
};

export default Calendar;
