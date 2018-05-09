import moment from 'moment';

export const CAROUSEL_PERSONS = [
  '1 PERSON',
  '2 PERSONS',
  '3 PERSONS',
  '4 PERSONS',
  '5 PERSONS',
  '6 PERSONS',
  '7 PERSONS',
  '8 PERSONS',
  '9 PERSONS',
  '10 PERSONS',
  '11 PERSONS',
  '12 PERSONS',
  '13 PERSONS',
  '14 PERSONS',
  '15 PERSONS',
  '16 PERSONS',
  '17 PERSONS',
  '18 PERSONS',
  '19 PERSONS',
  '20 PERSONS',
  '21 PERSONS',
  '22 PERSONS',
  '23 PERSONS',
  '24 PERSONS',
  '25 PERSONS',
  '26 PERSONS',
  '27 PERSONS',
  '28 PERSONS',
  '29 PERSONS',
  '30 PERSONS'
];

export const CAROUSEL_ROOMS = [
  '1 ROOM',
  '2 ROOMS',
  '3 ROOMS',
  '4 ROOMS',
  '5 ROOMS',
  '6 ROOMS',
  '7 ROOMS',
  '8 ROOMS',
  '9 ROOMS',
  '10 ROOMS'
];

export const getDates = (start, stop) => {
  // Method to get an array of dates between 2 dates
  const dateArray = [];
  let currentDate = moment(start);
  const stopDate = moment(stop);
  while (currentDate <= stopDate) {
    const dateObj = {
      dayOfWeek: moment(currentDate).format('ddd'),
      dayOfMonth: moment(currentDate).format('D'),
      month: moment(currentDate).format('MMM')
    };

    dateArray.push(dateObj);
    currentDate = moment(currentDate).add(1, 'days');
  }
  return dateArray;
};
