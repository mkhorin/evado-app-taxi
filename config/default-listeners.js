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
    description: 'Ready order notification',
    events: [
        'meta.base.create.order',
        'meta.base.transit.order.ready'
    ],
    notifications: 'newOrder'
}, {
    description: 'New offer notification',
    events: 'meta.base.create.offer',
    notifications: 'newOffer'
}, {
    description: 'Accepted offer notification',
    events: 'meta.base.transit.offer.accept',
    notifications: 'acceptedOffer'
}, {
    description: 'Confirmed offer notification',
    events: 'meta.base.transit.offer.confirm',
    notifications: 'confirmedOffer'
}];