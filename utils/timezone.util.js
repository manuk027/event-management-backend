import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export const isValidTimezone = (timezone) => {
    try {
        dayjs.tz(new Date(), timezone);
        return true;
    } catch (error) {
        return false;
    }
};

export const convertToUTC = (dateTime, zoneName) => {
    return dayjs.tz(dateTime, zoneName).utc().toDate();
};

export const convertFromUTC = (utcDate, zoneName) => {
    return dayjs.utc(utcDate).tz(zoneName);
};