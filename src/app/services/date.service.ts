import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class DateService {

  convertDate(dateString: string): string {
    const date = new Date(dateString);

    // Example: "March 17, 2026, 3:30 PM"
    const humanReadable = date.toLocaleString('en-US', {
      weekday: 'long', // optional: 'Wednesday'
      year: 'numeric',
      month: 'long', // 'March'
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true, // 12-hour format
      timeZoneName: 'short', // shows timezone abbreviation
    });

    console.log(humanReadable);
    return humanReadable;
  }


}
