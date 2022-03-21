import {formatDistanceToNow} from "date-fns";
import { es } from "date-fns/locale";
export const getFormatDistanceToNow = (date: number) => {
  const fromNow = formatDistanceToNow(new Date(date));

  return fromNow;
}