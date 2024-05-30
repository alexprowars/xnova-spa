import dayjs from 'dayjs'

import 'dayjs/locale/en.js'
import 'dayjs/locale/ru.js'

import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
import dayOfYear from 'dayjs/plugin/dayOfYear.js'
import weekOfYear from 'dayjs/plugin/weekOfYear.js'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import { defineNuxtPlugin } from '#imports';

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(dayOfYear)
dayjs.extend(weekOfYear)
dayjs.extend(customParseFormat)
dayjs.extend(relativeTime)

dayjs.locale('ru')

export default defineNuxtPlugin(() => {
});