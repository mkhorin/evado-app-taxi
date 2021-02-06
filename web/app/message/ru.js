'use strict';
/**
 * Extend default translations
 *
 * Use: Jam.t('Some text')
 * Use: <span data-t="">Some text</span>
 * Use: <div title="Some text" data-t=""></div>
 * Use: <input placeholder="Some text" type="text" data-t="">
 */
Object.assign(Jam.I18n.defaults, {

});

/**
 * Define custom translation category
 *
 * Use: Jam.t('Some text', 'custom')
 * Use: <span data-t="custom">Some text</span>
 * Use: <div title="Some text" data-t="custom"></div>
 * Use: <input placeholder="Some text" type="text" data-t="custom">
 * Use: <div title="Some text" data-t-title="custom" data-t="">Text</div>
 */
Jam.I18n.custom = {

    'Some text': 'Некоторый текст'
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