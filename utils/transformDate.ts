export default function transformDate(dateStr: string) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = new Intl.DateTimeFormat("it-IT", { month: "long" }).format(
    date
  );
  const day = date.getDate();
  return `${day} ${month}, ${year}`;
}
