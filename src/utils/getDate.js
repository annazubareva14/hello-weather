const getDate = () => {
  const DAY_MILSEC = 24 * 3600 * 1000
  const today = new Date()
  const month = today.toLocaleString('en', { month: 'short' })
  let date
  for (let i = 0; i <= 7; i++) {
    date = new Date(today + DAY_MILSEC * i)
    return `${month} ${date.getDate()}`
  }
}
//   function getDay (date) {
//     const days = ['Вскр', 'Пон', 'Втр', 'Сред', 'Чтв', 'Пят', 'Суб']
//     return `${date.getDate()} ${days[date.getDay()]}`
//   }

export default getDate
