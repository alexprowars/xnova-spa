import dayjs from 'dayjs';

import 'dayjs/locale/en.js';
import 'dayjs/locale/ru.js';

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { defineNuxtPlugin } from '#imports';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(dayOfYear);
dayjs.extend(weekOfYear);
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

dayjs.locale('ru');

export default defineNuxtPlugin(() => {
});