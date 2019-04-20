"use strict";

const UNSENT = 0;
const OPENED = 1;
const HEADERS_RECEIVED = 2;
const LOADING = 3;
const DONE = 4;

function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        let xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === DONE) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.statusText);
                }
            }
        };

        xhr.open('GET', url, true);
        xhr.send();
    });
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsList {
    constructor() {
        this.goods = [];
        this.basket = {amount: 0, contents: []};
    }
    fetchGoods(cb) {
        makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
            this.goods = JSON.parse(goods);
            cb();
        })
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
        document.querySelector('.cart-total').innerHTML = `Сумма: ${this.basket.amount}$`;
        if (this.basket.contents.length === 0) {
            document.querySelector('.cart').innerHTML = 'Корзина пуста.';
            return;
        }
        let basketHtml = '<h3>Корзина:</h3>';
        this.basket.contents.forEach(product => {
            basketHtml += `<div><h4>${product.product_name}</h4><p>Цена: ${product.price}</p><p>Количество: ${product.quantity}</p></div>`;
        });
        document.querySelector('.cart').innerHTML = basketHtml;
    }
    addToBasket(id, quantity, cb) {
        makeGETRequest(`${API_URL}/addToBasket.json?id_product=${id}&quantity=${quantity}`).then((response) => {
            response = JSON.parse(response);
            if (response.result === 1) {
                this.getBasketList(cb);
            } else {
                console.log(response.errorMessage);
            }
        });
    }
    deleteFromBasket(id, cb) {
        makeGETRequest(`${API_URL}/deleteFromBasket.json?id_product${id}`).then((response) => {
            response = JSON.parse(response);
            if (response.result === 1) {
                this.getBasketList(cb);
            } else {
                console.log(response.errorMessage);
            }
        });
    }
    getBasketList(cb) {
        makeGETRequest(`${API_URL}/getBasket.json`).then((basket) => {
            basket = JSON.parse(basket);
            if (basket.result === 0) {
                console.log(basket.errorMessage);
                return;
            }
            this.basket = basket;
            cb();
        })
    }
}

class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

const list = new GoodsList();

list.fetchGoods(() => {list.render();});
list.addToBasket('123', 5, () => {list.render()});
list.deleteFromBasket('123',() => {list.render();});
list.getBasketList(() => {list.render();});


/*
https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses – адрес API;
/catalogData.json – получить список товаров;
/getBasket.json – получить содержимое корзины;
/addToBasket.json – добавить товар в корзину;
/deleteFromBasket.json – удалить товар из корзины.
 */




