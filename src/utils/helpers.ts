export const formatDateToString = (date: Date): string => {
  return date.toISOString().replace("T", " ").split(".")[0];
};
