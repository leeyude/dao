export const YearOptions = function(){
  const yearStart = 1920;
  const yearNow = 2017;
  const yearSeries = [];

  for(i=yearNow; i>=yearStart; i--){
    yearSeries.push(i);
  };

  return yearSeries;
};


export const MonthOptions = function(){
  const monthOptions = [{
    name: 'January',
    monthNum: 1,
    traditionalChineseText: '一月'
  },
  {
    name: 'February',
    monthNum: 2,
    traditionalChineseText: '二月'
  },
  {
    name: 'March',
    monthNum: 3,
    traditionalChineseText: '三月'
  },
  {
    name: 'April',
    monthNum: 4,
    traditionalChineseText: '四月'
  },
  {
    name: 'May',
    monthNum: 5,
    traditionalChineseText: '五月'
  },
  {
    name: 'June',
    monthNum: 6,
    traditionalChineseText: '六月'
  },
  {
    name: 'July',
    monthNum: 7,
    traditionalChineseText: '七月'
  },
  {
    name: 'August',
    monthNum: 8,
    traditionalChineseText: '八月'
  },
  {
    name: 'September',
    monthNum: 9,
    traditionalChineseText: '九月'
  },
  {
    name: 'October',
    monthNum: 10,
    traditionalChineseText: '十月'
  },
  {
    name: 'November',
    monthNum: 11,
    traditionalChineseText: '十一月'
  },
  {
    name: 'December',
    monthNum: 12,
    traditionalChineseText: '十二月'
  }];

  return monthOptions;
};

export const GetDayOptions = function(month, year){
  const getMonth = month;
  const getYear = year;
  if(month.length>0 && year.length>0){
    const text =  year+ "-"+ month;
    const daysInMonth = moment(text, "YYYY-MM").daysInMonth();
    const dayOptions = [];
    for(i=1; i<=daysInMonth; i++){
      dayOptions.push(i);
    }
    return dayOptions;
  }else{
    return false;
  }
};
