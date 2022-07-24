const getDatesBetweenTwoDate = (startDate, endDate) => {
    const dates = getDates(new Date(startDate), new Date(endDate))

    let dateList = []

    dates.forEach(function (date) {
        console.log(date)
        var todayDate = date.toISOString().slice(0, 10);
        dateList.push(todayDate)
    })

    return dateList
}

function getDates (startDate, endDate) {
    const dates = []
    let currentDate = startDate
    const addDays = function (days) {
      const date = new Date(this.valueOf())
      date.setDate(date.getDate() + days)
      return date
    }
    while (currentDate <= endDate) {
      dates.push(currentDate)
      currentDate = addDays.call(currentDate, 1)
    }
    return dates
}
  
module.exports = {
    getDatesBetweenTwoDate
}