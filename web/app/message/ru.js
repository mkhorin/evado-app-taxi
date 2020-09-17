'use strict';

// evado/web/jam/utility/I18n.js

// extend default translation category
// use: <span data-t="">Some text</span>
// use: <div title="Some text"></div>
// use: <input placeholder="Some text" type="text" />

Object.assign(Jam.I18n.defaults, {

});

// define custom translation category
// use: <span data-t="custom">Any text</span>
// use: <div data-t="custom" title="Any text"></div>
// use: <input data-t="custom" placeholder="Any text" type="text"/>
// use: <div data-t-title="customTitle" title="Any title" data-t="custom">Any text</div>

Jam.I18n.custom = {

    'Any text': 'Любой текст'
};

Jam.I18n.customTitle = {

    'Any title': 'Любой заголовок'
};

// METADATA

Jam.I18n.meta = {

    'Accept': 'Принять',
    'Accepted': 'Принято',
    'Active offer': 'Активное предложение',
    'Additional info': 'Дополнительная информация',
    'All current offers will be deleted': 'Все текущие предложения будут удалены',

    'Cancel': 'Отменить',
    'Cancelled': 'Отменено',
    'Client': 'Клиент',
    'Close': 'Закрыть',
    'Closed': 'Закрыто',
    'Confirm': 'Подтвердить',

    'Do you want to cancel this approved deal?': 'Отменить эту согласованную сделку?',
    'Do you want to close this deal?': 'Закрыть эту сделку?',
    'Draft': 'Черновик',
    'Driver': 'Водитель',

    'Edit': 'Редактировать',
    'End point': 'Конечная точка',

    'In progress': 'В ходе выполнения',
    'Info': 'Информация',

    'My accepted offers': 'Мои принятые предложения',
    'My client': 'Мой клиент',
    'My driver': 'Мой водитель',
    'My offers': 'Мои предложения',
    'My orders': 'Мои заказы',

    'Name': 'Имя',
    'New': 'Новое',

    'Offer': 'Предложение',
    'Offers': 'Предложения',
    'Order': 'Заказ',
    'Orders': 'Заказы',

    'Price': 'Цена',

    'Ready': 'Готово',

    'Start point': 'Начальная точка',
    'State': 'Состояние',

    'User': 'Пользователь',

    'Waiting': 'Ожидание',
    'Waiting orders': 'Ожидающие заказы',

};