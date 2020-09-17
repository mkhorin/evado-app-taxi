'use strict';

module.exports = {

    'acceptedOffer': {
        active: true,
        subject: 'acceptedOffer.subject',
        text: 'acceptedOffer.text',
        methods: 'popup',
        recipient: {
            Class: 'component/notifier/OfferDriverFilter'
        },
        template: {
            Class: 'component/notifier/UserNameTemplate'
        }
    },
    'confirmedOffer': {
        active: true,
        subject: 'confirmedOffer.subject',
        text: 'confirmedOffer.text',
        methods: 'popup',
        recipient: {
            Class: 'component/notifier/OfferClientFilter'
        },
        template: {
            Class: 'component/notifier/UserNameTemplate'
        }
    },
    'newOffer': {
        active: true,
        subject: 'newOffer.subject',
        text: 'newOffer.text',
        methods: 'popup',
        recipient: {
            Class: 'component/notifier/OfferClientFilter'
        },
        template: {
            Class: 'component/notifier/NewOfferTemplate'
        }
    },
    'newOrder': {
        active: true,
        subject: 'newOrder.subject',
        text: 'newOrder.text',
        methods: 'popup',
        userFilters: 'drivers',
        template: {
            Class: 'component/notifier/UserNameTemplate'
        }
    }
};