function getStringDate(date) {
  return date.getFullYear() + '-' + formatNumber(date.getMonth() + 1) + '-' + formatNumber(date.getDate())
}

function getStartDate(date) {
  return (date.getFullYear()-100) + '-' + formatNumber(date.getMonth() + 1) + '-' + formatNumber(date.getDate())
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


module.exports = {
  getStringDate: getStringDate,
  getStartDate: getStartDate
}