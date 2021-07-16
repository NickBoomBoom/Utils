export interface Day {
  date: Date;
  data: {
    year: number;
    month: number;
    day: number;
    text: string; // 当前日期 2020/10/10
    week: number; // 0-6
    current: boolean; // 是否当前月
  };
}
