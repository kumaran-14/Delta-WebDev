const delButton = document.querySelector('#delete')

delButton.addEventListener('click', (e) => {
  e.preventDefault()
  const id = delButton.getAttribute('data-id')
  const username = delButton.getAttribute('data-username')
  var request = new XMLHttpRequest();
  request.open('DELETE', '/appointments/'+ username +'/edit/' + id, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      alert('Deleting Appointment')
      window.location.href = '/'
    }
  };
  request.onerror = function() {
    alert('Could not delete Appointment')
    window.location.href = '/appointments/'+ username +'/edit/' + id
  };
  request.send();
})
