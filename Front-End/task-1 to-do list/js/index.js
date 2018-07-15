const form = document.querySelector('#addmentee');
const menteeList = document.querySelector('#menteelist');
var mentees = JSON.parse(localStorage.getItem('items')) || [];
const menteeList2 = document.querySelector('#menteelist2');
const smallTab=document.querySelector('#small-tab');

function addMentee(e){
	e.preventDefault();
	const menteeName = (document.querySelector('[name=mentee')).value;

	const mentee = {
		menteeName : menteeName,
		rating:"(none)",
		email:"(none)",
		comments:"(none)"
	}
	this.reset();
	mentees.push(mentee);
	updateList(mentees,menteeList);
	updateList2(mentees,menteeList2);
	localStorage.setItem('items',JSON.stringify(mentees));
}
function updateList(mentees=[],menteeList){
	if(mentees.length != 0){
	menteeList.innerHTML = mentees.map((item,i) => {
		return `
<li class="list-ul-li">
<span>${i+1}. ${item.menteeName}</span><span class="margin-left"><i class="far fa-trash-alt" data-index=${i}></i></span>
</li>`;
	}).join('');}
	else {
		menteeList.innerHTML='<li class="list-ul-li-default">Loading Mentees...</li>';
	}

}
function updateList2(mentees=[],menteeList2){
	if(mentees.length != 0){
	menteeList2.innerHTML = mentees.map((item,i) => {
		return `
<li class="list-ul-li-new" data-index="${i}">
<span>${i+1}. ${item.menteeName}</span>
</li>`;
	}).join('');
	}else{
		menteeList2.innerHTML='<li class="list-ul-li-default">No Mentees to display..</li>';
	}
		smallTab.innerHTML=mentees.map((item,i) => {
		return `<div class="smaller-tab" data-index="${i}">
<div class="align"><p class="label">Name :</p><p class="label1" contenteditable="true" id="name${i}">${item.menteeName}</p></div>
					 <div class="align"><p class="label">Rating :</p><p class="label1" contenteditable="true" id="rating${i}">${item.rating}</p></div>
					 <div class="align"><p class="label">Email :</p><p class="label1" contenteditable="true" id="email${i}">${item.email}</p></div>
				    <div class="align"><p class="label">Comments :</p><p class="label1" contenteditable="true" id="comments${i}">${item.comments}</p ></div>
			</div>`;
	}).join('');

}
function deleteMentee(e){
	if(!e.target.matches('i')) return;

	const dataIndex = Number(e.target.getAttribute('data-index'));
	 mentees= mentees.filter(mentee =>{
		return mentees.indexOf(mentee) !== dataIndex;
	});
updateList(mentees,menteeList);
updateList2(mentees,menteeList2);
localStorage.setItem('items',JSON.stringify(mentees));
}
function displayTab(usedata){
	var c = document.querySelector('#small-tab').children;
    var i;
    for (i = 0; i < c.length; i++) {
       if( Number(c[i].getAttribute('data-index')) ==usedata){
			 c[i].style.display="block";
		 }else{
			 c[i].style.display="none";
		 }
    }
}
function findElement(e){
	if(!e.target.matches('li')) return;
	const usedata=Number(e.target.getAttribute('data-index'));
	displayTab(usedata);

}
function assignVal(e){
	const parent2=e.target.parentNode.parentNode;
	const indexData=Number(parent2.getAttribute('data-index'));
	mentees.forEach((item,i) =>{
		if(mentees.indexOf(item)==indexData){
			if(e.target.getAttribute('id') == `name${i}`){
				item.menteeName=e.target.innerHTML;

			}
			if(e.target.getAttribute('id') == `rating${i}`){
				item.rating=e.target.innerHTML;

				}
			if(e.target.getAttribute('id') == `email${i}`){
				item.email=e.target.innerHTML;

			}
			if(e.target.getAttribute('id') == `comments${i}`){
				item.comments=e.target.innerHTML;

			}
		}
	})
	localStorage.setItem('items',JSON.stringify(mentees));
}

menteeList.addEventListener('click',deleteMentee);
updateList(mentees,menteeList);
updateList2(mentees,menteeList2);
form.addEventListener('submit',addMentee);
updateList(mentees,menteeList);
updateList2(mentees,menteeList2);
menteeList2.addEventListener('click',findElement)
smallTab.addEventListener('keyup',assignVal);
localStorage.setItem('items',JSON.stringify(mentees));
updateList(mentees,menteeList);
updateList2(mentees,menteeList2);

/*<div class="smaller-tab">
<div class="align"><p class="label">Name:</p><p class="label1" contenteditable="true">(none)</p></div>
					 <div class="align"><p class="label">Rating:</p><p class="label1" contenteditable="true">(none)</p></div>
					 <div class="align"><p class="label">Email:</p><p class="label1" contenteditable="true">(none)</p></div>
				    <div class="align"><p class="label">Comments:</p><p class="label1" contenteditable="true">(none)</p ></div>
			</div>		 */
