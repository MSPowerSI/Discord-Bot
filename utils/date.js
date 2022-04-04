function formatDate(template, date) {
  const specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function (t, item, i) {
    return t.split(specs[i]).join(item)
  }, template)
}

module.exports = {
  formatDate
}