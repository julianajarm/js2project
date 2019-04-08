"use strict";

//ES 5
var GOODS = [
    {title: 'Shirt', price: '49.99$'},
    {title: 'Potato', price: '0.99$'},
    {title: 'Hat', price: '9.99$'},
    {title: 'Milk', price: '0.99$'},
    {title: 'Trousers', price: '29.99$'},
    {title: 'Shoes', price: '30.99$'}
];

function renderGoodsItem(title, price) {
    return '<div class="goods-item"><h3>' +  title + '</h3><p>' + price + '</p></div>';
}

function renderGoodsList(list) {
    var goodsList = list.map(function (item) {
        return renderGoodsItem(item.title, item.price);
    });
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
}

renderGoodsList(GOODS);


// ES 6
// const GOODS = [
//     {title: 'Shirt', price: '49.99$'},
//     {title: 'Potato', price: '0.99$'},
//     {title: 'Hat', price: '9.99$'},
//     {title: 'Milk', price: '0.99$'},
//     {title: 'Trousers', price: '29.99$'},
//     {title: 'Shoes', price: '30.99$'},
// ];
//
// const renderGoodsItem = (title, price) => `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
//
// const renderGoodsList = list => {
//     const goodsList = list.map (item => renderGoodsItem(item.title, item.price));
//
//     document.querySelector('.goods-list').innerHTML = goodsList.join('');
// };
//
// renderGoodsList(GOODS);
//



