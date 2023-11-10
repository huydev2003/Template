export default function formatDate(inputDate) {
  const date = new Date(inputDate);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";

  // Chuyển đổi giờ sang định dạng 12 giờ
  const formattedHours = hours % 12 || 12;

  // Định dạng giờ và phút để luôn có 2 chữ số
  const formattedHoursStr = formattedHours.toString().padStart(2, "0");
  const minutesStr = minutes.toString().padStart(2, "0");

  const formattedDate = `Ngày ${day}-${month}-${year}, ${formattedHoursStr}:${minutesStr} ${ampm}`;
  return formattedDate;
}
