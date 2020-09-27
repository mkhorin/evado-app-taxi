'use strict';

module.exports = {

    'acceptedOffer': {
        active: true,
        subject: 'acceptedOffer.subject',
        text: 'acceptedOffer.text',
        methods: 'popup',
        recipient: {
            Class: 'component/notifier/UserRecipient',
            userAttr: 'driver.user'
        }
    },
    'confirmedOffer': {
        active: true,
        subject: 'confirmedOffer.subject',
        text: 'confirmedOffer.text',
        methods: 'popup',
        recipient: {
            Class: 'component/notifier/UserRecipient',
            userAttr: 'order.client.user'
        }
    },
    'newOffer': {
        active: true,
        subject: 'newOffer.subject',
        text: 'newOffer.text',
        methods: 'popup',
        recipient: {
            Class: 'component/notifier/UserRecipient',
            userAttr: 'order.client.user'
        }
    },
    'newOrder': {
        active: true,
        subject: 'newOrder.subject',
        text: 'newOrder.text',
        methods: 'popup',
        userFilters: 'drivers'
    }
};