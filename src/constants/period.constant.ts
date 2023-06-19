const makeDayMapVal = (value: number, title: {en: string; ru: string}) => ({
  title,
  value
});

export const TariffDaysMap = {
  0: makeDayMapVal(0, {
    en: 'None',
    ru: 'Отсутствует'
  }),
  7: makeDayMapVal(7, {
    en: 'Week',
    ru: 'Неделя'
  }),
  14: makeDayMapVal(14, {
    en: 'Two Weeks',
    ru: '2 Недели'
  }),
  30: makeDayMapVal(30, {
    en: 'Month',
    ru: 'Месяц'
  }),
  182: makeDayMapVal(182, {
    en: '6 Months',
    ru: 'Полгода'
  }),
  365: makeDayMapVal(365, {
    en: 'Year',
    ru: 'Год'
  }),
  9999: makeDayMapVal(9999, {
    en: 'One Time',
    ru: 'Единоразово'
  })
};

export const TariffDayPeriods = {
  Week: 7,
  Month: 30,
  HalfYear: 182,
  Year: 365,
  Onetime: 9999
};

export const TariffTrialDayPeriods = {
  None: 0,
  Week: 7,
  WeekTwo: 14,
  Month: 30
};
