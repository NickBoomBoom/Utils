import { sliceArrary } from './feature'
interface Day {
  date: Date,
  data: {
    day: string,  // 当前日期 2020/10/10
    week: number, // 0-6
    current: boolean // 是否当前月
  }

}

interface Calenda {
  year: number,
  month: number,
  days: Day[]
}

/**
 * 补0操作
 * @param num 
 * @return sting 
 */
function _fill(num: number): string {
  if (num < 10) {
    return `0${num}`
  }
  return `${num}`
}

/**
 * 转化成Date对象
 * @param date 
 */
function _date(date: any): Date {
  if (date instanceof Date) {
    return date
  }
  if (typeof date === 'string') {
    date = date.replace('-', '/')
  }
  return new Date(date)
}
/**
 * 返回周几
 * @param week Date.getDay() 获取的周几 0 -6
 * @return 周几
 */
function _week(week: number): string {
  const WEEK: string[] = [
    '周日',
    '周一',
    '周二',
    '周三',
    '周四',
    '周五',
    '周六',
  ]
  return WEEK[week]
}

function getYMDW(date: any) {
  date = _date(date)
  const [year, month, day, week] = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getDay()]
  return {
    year, month, day, week
  }
}

/**
 * 返回 周起始数组
 * @param weekStart 周起始
 */
function _weeks(weekStart): number[] {
  const WEEKS: number[] = [0, 1, 2, 3, 4, 5, 6]
  const startIndex: number = WEEKS.findIndex(t => t === weekStart)
  const header: number[] = WEEKS.splice(startIndex, WEEKS.length)
  const footer: number[] = WEEKS.splice(0, startIndex)
  return [
    ...header,
    ...footer
  ]
}

/**
 * 首补足
 * @param week 周几
 * @param weekStart 周起始
 */
function getStartMend(week: number, weekStart: number): number {
  const weeks: number[] = _weeks(weekStart)
  const index: number = weeks.findIndex(t => t === week)
  const startIndex: number = weeks.findIndex(t => t === weekStart)
  return Math.abs(startIndex - index)
}

/**
 * 尾补足
 * @param week 周几
 * @param weekStart 周起始
 */
function getEndMend(week: number, weekStart: number): number {
  const weeks: number[] = _weeks(weekStart)
  const index: number = weeks.findIndex(t => t === week)
  return weeks.filter((t, ti) => ti > index).length
}
/**
 * 返回月份数据
 * @param date Date 对象 或 可被new Date对象解析; 
 * @param weekStart number 周开始 0 - 6 ,默认0 从周日开始
 * @return Day[]
 */
function createMonth(date: Date | number | string, weekStart: number = 1): Day[] {
  const newDate: Date = _date(date)
  const weekEnd: number = weekStart - 1 < 0 ? 6 : weekStart - 1 // 可以优化
  const year: number = newDate.getFullYear()
  const month: number = newDate.getMonth() // 当前月份的Date对象展示,非实际月份,实际月份需+1
  const currentMonth: number = month + 1  // 当前月份 
  const nextMonth: number = month + 1 // 下一月份 
  const prevMonth: number = month - 1 // 上一月份
  const days: number = new Date(year, nextMonth, 0).getDate()  // 将月份下移到下一个月份，同时将日期设置为0；由于Date里的日期是1~31，所以Date对象自动跳转到上一个月的最后一天；getDate（）获取天数即可。
  let res = []
  for (let i = 1; i <= days; i++) {
    let day: number = i
    let week: number = new Date(year, month, day).getDay() // 0 - 6 ; 周日 - 周六

    // 补足上月尾信息
    if (i === 1) {
      if (weekStart !== week) {
        const mendDays = getStartMend(week, weekStart) // 需要补足天数
        for (let _i = mendDays; _i > 0; _i--) {
          const prevDate = new Date(year, month, -_i + 1)
          const dateInfo = getYMDW(prevDate)
          res.push({
            date: prevDate,
            data: {
              day: `${dateInfo.year}/${dateInfo.month}/${dateInfo.day}`,
              week: dateInfo.week,
              current: false,
            }
          })
        }
      }
    }

    res.push({
      date: new Date(year, month, day),
      data: {
        day: `${year}/${currentMonth}/${day}`,
        week,
        current: true,
      }
    })


    // 补足下月首信息
    if (i === days) {
      if (week !== weekEnd) {
        const mendDays = getEndMend(week, weekStart)
        for (let _i = 0; _i < mendDays; _i++) {
          const nextDate = new Date(year, nextMonth, _i + 1)
          const dateInfo = getYMDW(nextDate)
          res.push({
            date: nextDate,
            data: {
              day: `${dateInfo.year}/${dateInfo.month}/${dateInfo.day}`,
              week: dateInfo.week,
              current: false,
            }
          })

        }
      }
    }
  }

  // 转二维排列数组
  res = sliceArrary(res, 7)

  return res
}


export {
  createMonth
}