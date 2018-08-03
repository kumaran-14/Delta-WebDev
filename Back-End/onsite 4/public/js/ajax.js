/*(function(){
	var socket = io();
	socket.on('stock price update', function(price) {
		$('#stockprice').text(price);
	});
})()*/


var form = document.querySelector('#form')
var p = document.querySelector('#uname')
function parseIntoEncodedData(data){
	var urlEncodedData = "";
  var urlEncodedDataPairs = [];
  var name;
  for(name in data) {
    urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
  }
  urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
  return urlEncodedData;
}
function ajaxReq(data){
var xhr = new XMLHttpRequest
var urlEncodedData = parseIntoEncodedData(data)

xhr.onload = () => {
	if(xhr.status === 200){
		 p.innerHTML = xhr.responseText
		console.log(xhr.responseText)
	}
}

let url = `http://localhost:8000/bid`
xhr.open('POST',url)
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.send(urlEncodedData)
xhr.onerror = () => {
	console.log('Book status Cannot be Updated')
}
};

function runAjaxReq(e){
	e.preventDefault()
	ajaxReq({
		price:document.querySelector('#input').value,
		username:document.querySelector('body').getAttribute('data-name'),
		timer:true,
	})
}

document.querySelector('#form').addEventListener('submit',runAjaxReq)
