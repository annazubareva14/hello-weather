const addDay = (date, days) => {
  const today = new Date(date);

  today.setDate(today.getDate() + days);

  return today;
};

export default addDay;
