const isoToDateTimeAmPm = (isoString) => {
    if (!isoString) return '';

    const date = new Date(isoString);

    if (isNaN(date.getTime())) return '';
    
    // Extract the day, month, year, hours, and minutes from the date object
    const day = String(date.getDate()).padStart(2, '0');
    const month = Number(String(date.getMonth() + 1).padStart(2, '0')); // Months are zero-based
    const year = date.getFullYear();
    let hours = Number(date.getHours());
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Convert hours from 24-hour to 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    hours = Number(String(hours ? hours : 12).padStart(2, '0')); // Ensure two digits for hours

    const months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec" ];
      const am_pm = hours > 11 ? 'pm' : 'am';
      const hour = hours == 0 ? 12 :
                   hours > 12 ? hours-12 
                   : hours
  
      return `${hour} ${am_pm} - ${months[month]} ${day}th, ${year}`;
};

const dateTimeAmPmToIso = (formattedDate) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const [timePart, datePart] = formattedDate.split(' - ');
    const [hourStr, amPm] = timePart.split(' ');
    const [monthStr, dayStr, yearStr] = datePart.replace(',', '').split(' ');
  
    const month = monthNames.indexOf(monthStr);
    const day = parseInt(dayStr);
    const year = parseInt(yearStr);
    
    let hour = parseInt(hourStr);
    const isPm = amPm.toLowerCase() === 'pm';
  
    if (isPm && hour !== 12) {
      hour += 12;
    } else if (!isPm && hour === 12) {
      hour = 0;
    }
  
    const date = new Date(year, month, day, hour, 0, 0);
    return date.toISOString();
  };
  
  // Example usage:
  const formattedDate = '12 pm - Jan 1st, 2023';
  const isoString = dateTimeAmPmToIso(formattedDate);
  console.log(isoString); // Outputs ISO string
  

export {isoToDateTimeAmPm, dateTimeAmPmToIso};