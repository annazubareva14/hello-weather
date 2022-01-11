const formatDate = (initialDate) => {
  const date = new Date(initialDate);
  const month = date.toLocaleString('en', { month: 'short' });
  const weekday = date.toLocaleString('en', { weekday: 'short' });
  return `${weekday}, ${month} ${date.getDate()}`;
};

export default formatDate;
