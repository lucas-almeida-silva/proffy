export default function convertHourToMinutes(time: string) {
  const [hour, minutes] = time.split(':').map(Number);
  const timeInMinutes = (hour * 60) + minutes;
  
  return timeInMinutes;
}

export function convertMinutesToHours(minutes: number) {
  const hours = minutes / 60;
  const min = Math.ceil((hours - Math.floor(hours)) * 60); 
  const result = `${hours < 10 ? "0" + hours : hours}:${min < 10 ? "0" + min : min}`

  return result;
}