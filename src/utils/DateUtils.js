/**
 * Returns the working days
 *
 * @param start Number Date as unix epoch
 * @param end Number Date as unix epoch
 * @return Number The days number
 */
export function calcWorkingDays(start, end) {
    let days = 0;

    // Scan every date until end date
    for (let i = start + 60 * 60 * 24; i < end; i += 60 * 60 * 24) {
        let date = new Date(i * 1000);

        if (isWorkingDay(date)) {
            days++;
        }
    }

    return days;
}

/**
 *
 * @param date Date
 * @return {boolean}
 */
function isWorkingDay(date) {
    let dayOfWeek = date.getDay();
    let day = date.getDate();
    let month = date.getMonth() + 1; // returned month starts from 0, so we add 1 to start from 1

    // Check if the day is  Sat or Sun
    if (dayOfWeek === 6 || dayOfWeek === 0) {
        return false;
    }

    // Scan the array with the public holidays
    for (let i in PUBLIC_HOLIDAYS) {
        if (PUBLIC_HOLIDAYS[i][0] === day && PUBLIC_HOLIDAYS[i][1] === month) {
            return false;
        }
    }

    // Check easter based public holidays
    let easter = calcEaster(date.getFullYear());
    // shift one day to calc "clean" Monday since this is public holiday
    easter.setTime(easter.getTime() + 1000 * 60 * 60 * 24);
    if (isSameDay(easter, date)) {
        return false;
    }

    return true; // finally
}

// Source http://karamatskos.blogspot.com/2012/04/blog-post_07.html
function calcEaster(year) {
    let a = (year % 19);
    let b = (year % 4);
    let c = (year % 7);
    let d = (a * 19 + 15) % 30
    let e = (2 * b + 4 * c + 6 * d + 6) % 7;

    let aprilDate = d + e + 4;

    let easter = new Date();
    // Reset the date to 00:00
    easter.setHours(0);
    easter.setMinutes(0);
    easter.setSeconds(0);
    easter.setFullYear(year);

    if (aprilDate > 30) { // It should be may
        easter.setDate(aprilDate - 30);
        easter.setMonth(4); // may
    } else {
        easter.setDate(aprilDate);
        easter.setMonth(3); // april
    }

    return easter;
}

/**
 * Test if  the 2 dates belong to the same date.
 *
 * @param date1 Date
 * @param date2 Date
 * @return {boolean}
 */
function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}

/**
 * An array of public Greek holidays to exclude
 *
 * @type {number[][]}
 */
const PUBLIC_HOLIDAYS = [
    [1, 1],
    [6, 1],
    [25, 3],
    [1, 5],
    [15, 8],
    [28, 10],
    [25, 12],
    [26, 12],
];

