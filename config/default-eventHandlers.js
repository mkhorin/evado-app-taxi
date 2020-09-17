'use strict';

module.exports = {

    'clientInstantiation': {
        label: 'Client creation',
        description: 'Client object creation',
        config: {
            Class: 'evado/component/handler/MetaClassInstantiation',
            className: 'client'
        }
    },
    'driverInstantiation': {
        label: 'Driver creation',
        description: 'Driver object creation',
        config: {
            Class: 'evado/component/handler/MetaClassInstantiation',
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