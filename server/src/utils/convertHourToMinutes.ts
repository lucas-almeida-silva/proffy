export default function convertHourToMinutes(time: string) {
  const [hour, minutes] = time.split(':').map(Number);
  const timeInMinutes = (hour * 60) + minutes;
  
  return timeInMinutes;
}

export function convertMinutesToHours(minutes: number) {
  const totalHours = minutes / 60;
  const hours = Math.floor(totalHours);
  const min = (totalHours - hours) * 60; 
  
  const result = `${hours < 10 ? "0" + hours : hours}:${min < 10 ? "0" + min : min}`

  return result;
}