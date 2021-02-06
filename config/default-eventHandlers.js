'use strict';

module.exports = {

    'clientInstantiation': {
        label: 'Client creation',
        description: 'Client object creation',
        config: {
            Class: 'evado/component/handler/MetadataClassInstantiation',
            className: 'client'
        }
    },
    'driverInstantiation': {
        label: 'Driver creation',
        description: 'Driver object creation',
        config: {
            Class: 'evado/component/handler/MetadataClassInstantiation',
            className: 'driver'
        }
    },
    'userRegistration': {
        label: 'User registration',
        description: 'User registration handler',
        config: {
            Class: 'component/handler/UserRegistration'
        }
    },
};