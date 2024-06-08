export function formatDate(dateArray) {
    const [year, month, day] = dateArray;
    return `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${String(year).slice(-2)}`;
  }
  
  export function formatTime(timeArray) {
    const [hours, minutes, seconds] = timeArray;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
  