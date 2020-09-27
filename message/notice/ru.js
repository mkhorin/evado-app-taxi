'use strict';

module.exports = {

    'acceptedOffer.subject': 'Предложение принято',
    'acceptedOffer.text': 'Предложение принято клиентом {model.user.getTitle}',

    'confirmedOffer.subject': 'Предложение подтверждено',
    'confirmedOffer.text': 'Предложение подтверждено водителем {model.user.getTitle}',

    'newOffer.subject': 'Новое предложение',
    'newOffer.text': 'Новое предложение за {model.get.price} от водителя {model.user.getTitle}',

    'newOrder.subject': 'Новый заказ',
    'newOrder.text': 'Заказ от клиента {model.user.getTitle} ожидает предложений'
};