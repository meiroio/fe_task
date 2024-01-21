import { Label } from "@/services/attributesService";

export function formatDateString(inputDate: string): string {
    const date = new Date(inputDate);
  
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
  
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
  
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
  
    return formattedDate;
  }