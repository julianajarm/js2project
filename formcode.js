"use strict";

function changeQuotes(){
    let text = document.getElementById('text');
    text.innerHTML = text.innerHTML.replace(/\B'|'\B/ig, '"');
}

//проверка имени при вводе "в режиме онлайн"
function checkName(input){
    let regExp = /^[a-zа-яё]+$/i;
    let valid = regExp.test(input.value);
    document.querySelector('.nameErr').style.display = valid ? 'none' : 'block';
}
//проверка номера телефона, косяк в том, что пользователю самому необходимо вводить скобки и дефис
function checkPhone(input){
    let regExp = /^\+7\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/;
    let valid = regExp.test(input.value);
    document.querySelector('.phoneErr').style.display = valid ? 'none' : 'block';
}
function checkEmail(input){
    let regExp = /^[a-z]+[\-.]?[a-z]+@[a-z]+\.[a-z]{2,4}$/i;
    let valid = regExp.test(input.value);
    document.querySelector('.emailErr').style.display = valid ? 'none' : 'block';
}



