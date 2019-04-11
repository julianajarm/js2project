"use strict";

class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            {title: 'Shirt', price: 150},
            {title: 'Socks', price: 50},
            {title: 'Jacket', price: 350},
            {title: 'Shoes', price: 250},
        ];
    }
    calcTotal () {
        let total = 0;
        for ( let i = 0; i < this.goods.length; i++ ) {
            total += this.goods[i].price;
        }
        return total;
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
        document.querySelector('.cart-total').innerHTML =  `Сумма вашей покупки: ${this.calcTotal()}$`;

    }
    addOneMoreItem(){} //добавит кнопку, нажав на которую, можно добавить еще один такой же товар в корзину
    deleteFromCart(){} //добавит кнопку для удаления товара из корзины
    clearCart() {} //очистить корзину от товаров

}

const list = new GoodsList();
list.fetchGoods();
list.render();


