'use strict';

module.exports = [{
    description: 'Handle user registrations',
    events: 'auth.register',
    handlers: 'userRegistration'
}, {
    description: 'Create a client on user sign up',
    events: 'clientRegistration',
    handlers: 'clientInstantiation'
}, {
    description: 'Create a driver on user sign up',
    events: 'driverRegistration',
    handlers: 'driverInstantiation'
}, {
    description: 'Ready order notice',
    events: [
        'meta.base.create.order',
        'meta.base.transit.order.ready'
    ],
    notices: 'newOrder'
}, {
    description: 'New offer notice',
    events: 'meta.base.create.offer',
    notices: 'newOffer'
}, {
    description: 'Accepted offer notice',
    events: 'meta.base.transit.offer.accept',
    notices: 'acceptedOffer'
}, {
    description: 'Confirmed offer notice',
    events: 'meta.base.transit.offer.confirm',
    notices: 'confirmedOffer'
}];