import dayjs from "dayjs";

export const formatDate = (date: string) => {
  return dayjs(date).format(`YYYY MMM DD HH:mm:ss`);
};
