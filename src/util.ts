/*
var re = /apples/gi; 
var str = "Apples are round, and apples are juicy.";
var newstr = str.replace(re, "oranges"); 
console.log(newstr)
*/
export function formatDate(date: string) {
  let year = date.substr(2, 2);
  let month = date.substr(4, 2);
  let day = date.substr(6, 2);

  let hour = parseInt(date.substr(8, 2));
  let minute = date.substr(10, 2);

  let inDay = hour < 12 ? "am" : "pm";

  if (hour === 0) hour = 12;
  if (hour > 12) hour -= 12;

  return `${month}.${day}.${year}\u00A0${hour}:${minute} ${inDay}`;
}
