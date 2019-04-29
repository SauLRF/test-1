let forms=document.querySelector(".bank-card_container");
let buttonPay=document.querySelector(".bank-card-pay");
forms.addEventListener('input',validate);
//любое действие при невалидном поле, по ТЗ обводим в красную рамку
function addError(item){
  item.style.border="3px solid red";
}
//очищаем при валидном
function resetError(item){
  item.style.border="";
}
const result={
  validate: false,
};
//валидация формы
function validate(e) {
  let item=e.target;
  switch (item.className) {
    //валидация поля номера карты
    case "bank-card_number":
      if(!/\d{4}/.test(item.value) || item.value.length<4 || item.value.length>4) {
          addError(item); result.validate=false;
          }
      else {resetError(item);
          result.validate=true;
          }
      break;
      //валидация поля имени
    case "bank-card_name":
       if(!/^[A-Za-z]+$/.test(item.value) || item.value.length<4){
         addError(item);
         result.validate=false;
         }
       else {
         resetError(item);
         result.validate=true;}
       break;
       //валидация поля сvv кода
    case "bank-card-cvv":
       if(!/\d{3}/.test(item.value) || item.value.length<3 || item.value.length>3) {
         addError(item);
         result.validate=false;
        }
      else {resetError(item);
           result.validate=true;}
      break;
  }};

  function submitForm(e, form){
   e.preventDefault();
   if(result.validate) {
   fetch('file.php', {
     method: 'post',
     body: new  FormData(form),
   }).then(function(response) {
     return response.json();
   }).then(function(data) {
     alert('данные обработаны')
   }).catch(function(err) {
     alert('Что пошло не так')
   });
} else {alert("Пожалуйста заполните поля корректно")}};

let buttonMenu=document.querySelector(".open-menu");
let mobileSize=window.matchMedia('(max-width:480px)');

let nav=document.querySelector(".sidebar");
function openMenu(ms){
  if(ms.matches) {
     nav.classList.add('open');
     buttonMenu.addEventListener('click',function(){
       nav.classList.toggle('open');
       if(nav.className=="sidebar") {
         buttonMenu.style.left="230px"
       } else {buttonMenu.style.left="10px" }
     });
} else {nav.classList.remove("open");};}

  openMenu(mobileSize);

// готовим селект для выбора месяца
let titleDay=document.querySelector('.bank-cad_day_title');
let daycontainer=document.querySelector('.bank-card_day');
let ulDay=document.querySelector(".bank-card-day-container");
for(var i=0; i<12;i++){
  let li=document.createElement('li');
  li.innerHTML=i+1;
  ulDay.appendChild(li);
}
daycontainer.addEventListener('click',function(){
  ulDay.classList.toggle('open');
})
ulDay.addEventListener('click',function(e){
  if(e.target.tagName!="LI") return;
   titleDay.innerHTML=e.target.innerHTML;
})
//селект для выбора года
let titleMonth=document.querySelector('.bank-cad_month_title');
let monthcontainer=document.querySelector('.bank-card_month');
let ulMonth=document.querySelector(".bank-card-month-container");
for(var i=0; i<31;i++){
  let li=document.createElement('li');
  li.innerHTML=1999+i;
  ulMonth.appendChild(li);
}
monthcontainer.addEventListener('click',function(){
  ulMonth.classList.toggle('open');
})
ulMonth.addEventListener('click',function(e){
  if(e.target.tagName!="LI") return;
   titleMonth.innerHTML=e.target.innerHTML;
})
