// type UseFormatDateProps =

export default function useFormatDate(date: string | null | undefined) {
  const formattedDate = date
    ? new Date(date).toLocaleString("tr-TR", {
        timeZone: "Europe/Istanbul",
      })
    : "Tarih bilgisi yok";
  return formattedDate;
}
