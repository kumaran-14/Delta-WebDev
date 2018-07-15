function getEl(selector) {
  return document.querySelector(selector)
}

// On Load of the window
window.onload = function() {
  let year = Number(getEl('thead').getAttribute('data-year'))
  let month = Number(getEl('thead').getAttribute('data-month'))
  let username = getEl('thead').getAttribute('data-username')
  // Bind next and previous button clicks
  getEl('.prev').onclick = function() {
    year = month == 0 ? (month = 11, year - 1) : (--month, year)
    window.location.href = '/calendar/'+ username +'/' + year + '/' + month
  }
  getEl('.next').onclick = function() {
    year = month == 11 ? (month = 0, year + 1) : (++month, year)
    window.location.href = '/calendar/'+ username +'/' + year + '/' + month
  }
  getEl('form').addEventListener('submit', (e) => {
    e.preventDefault()
    let input = e.target.firstElementChild.value
    if (input) {
      let valArr = input.split('-')
      let y = valArr[0]
      let m = valArr[1] - 1
      window.location.href = '/calendar/'+ username +'/' + y + '/' + m
    }
  })
  getEl('table').addEventListener('click', (e) => {
    if (e.target.classList.contains('today') || e.target.classList.contains('normal')) {
      let date = e.target.getAttribute('data-date')
      window.location.href = '/calendar/'+ username +'/' + year + '/' + month + '/' + date
    }
  })
}
