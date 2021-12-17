'use strict';

const parent = require('evado/config/default-security');

module.exports = {

    metaPermissions: [{
        description: 'Full access to data',
        roles: 'administrator',
        type: 'allow',
        actions: 'all',
        targets: {
            type: 'all'
        }
    }, {
        description: 'Client can create orders',
        roles: 'client',
        type: 'allow',
        actions: 'create',
        targets: {
            type: 'class',
            class: 'order'
        }
    }, {
        description: 'Edit own order',
        roles: 'client',
        type: 'allow',
        actions: ['read', 'update'],
        targets: {
            type: ['class', 'transition'],
            class: 'order'
        },
        rules: 'creator'
    }, {
        description: 'Client can delete his own orders in Draft or Waiting states',
        roles: 'client',
        type: 'allow',
        actions: 'delete',
        targets: {
            type: 'class',
            class: 'order'
        },
        rules: 'orderDeletion'
    }, {
        description: 'Client can read offers related to order',
        roles: 'client',
        type: 'allow',
        actions: 'read',
        targets: {
            type: 'class',
            class: 'offer'
        },
        rules: 'clientOffer'
    }, {
        description: 'Client can accept offers',
        roles: 'client',
        type: 'allow',
        actions: 'update',
        targets: {
            type: 'transition',
            class: 'offer',
            transition: 'accept'
        }
    }, {
        description: 'Client cannot read driver menu',
        roles: 'client',
        type: 'deny',
        actions: 'read',
        targets: {
            type: 'node',
            section: 'main',
            node: ['myDriver', 'myOffers', 'myAcceptedOffers']
        }
    }, {
        description: 'Driver can only create offer for waiting order',
        roles: 'driver',
        type: 'allow',
        actions: 'create',
        targets: {
            type: 'class',
            class: 'offer'
        },
        rules: 'offerCreation'
    }, {
        description: 'Edit own offer',
        roles: 'driver',
        type: 'allow',
        actions: ['read', 'update'],
        targets: {
            type: 'class',
            class: 'offer'
        },
        rules: 'creator'
    }, {
        description: 'Delete allowed own offers',
        roles: 'driver',
        type: 'allow',
        actions: 'delete',
        targets: {
            type: 'class',
            class: 'offer'
        },
        rules: 'offerDeletion'
    }, {
        description: 'Driver cannot accept offers',
        roles: 'driver',
        type: 'deny',
        actions: 'update',
        targets: {
            type: 'transition',
            class: 'offer',
            transition: 'accept'
        }
    }, {
        description: 'Driver can only confirm offer for waiting order',
        roles: 'driver',
        type: 'allow',
        actions: 'update',
        targets: {
            type: 'transition',
            class: 'offer',
            transition: 'confirm'
        },
        rules: 'offerConfirmation'
    }, {
        description: 'Driver can read orders with his offers or waiting orders',
        roles: 'driver',
        type: 'allow',
        actions: 'read',
        targets: {
            type: 'class',
            class: 'order'
        },
        rules: 'driverOrder'
    }, {
        description: 'Driver can close his own offer',
        roles: 'driver',
        type: 'allow',
        actions: 'update',
        targets: {
            type: 'transition',
            class: 'offer',
            transition: 'close'
        },
        rules: 'creator'
    }, {
        description: 'Driver cannot read client menu',
        roles: 'driver',
        type: 'deny',
        actions: 'read',
        targets: {
            type: 'node',
            section: 'main',
            node: ['myClient', 'myOrders']
        }
    }, {
        description: 'User can read own client or driver',
        roles: ['client', 'driver'],
        type: 'allow',
        actions: 'read',
        targets: {
            type: 'class',
            class: ['client', 'driver']
        },
        rules: 'user'
    }, {
        description: 'Can read client or driver public data',
        roles: ['client', 'driver'],
        type: 'allow',
        actions: 'read',
        targets: {
            type: 'view',
            class: ['client', 'driver'],
            view: ['public', 'publicList']
        }
    }],

    permissions: {
        ...parent.permissions,

        'moduleAdmin': {
            label: 'Administration module',
            description: 'Access to Administration module'
        },
        'moduleOffice': {
            label: 'Office module',
            description: 'Access to Office module'
        },
        'moduleStudio': {
            label: 'Studio module',
            description: 'Access to Studio module'
        },
        'moduleApiBaseUpload': {
            label: 'Upload files',
            description: 'Uploading files via basic metadata API module'
        }
    },

    roles: {
        'administrator': {
            label: 'Administrator',
            description: 'Full access to all',
            children: [
                'moduleAdmin',
                'moduleOffice',
                'moduleStudio',
                'moduleApiBaseUpload'
            ]
        },
        'guest': {
            label: 'Guest',
            description: 'Auto-assigned role for anonymous users'
        },
        'user': {
            label: 'User',
            description: 'Default role for authenticated users'
        },
        'client': {
            label: 'Client',
            description: 'Client',
            children: [
                'moduleOffice'
            ]
        },
        'driver': {
            label: 'Driver',
            description: 'Driver',
            children: [
                'moduleOffice'
            ]
        }
    },

    rules: {
        'creator': {
            label: 'Creator',
            description: 'Check user binding as object creator',
            config: {
                Class: 'evado/component/meta/rbac/rule/UserRule',
                userAttr: '_creator'
            }
        },
        'clientOffer': {
            label: 'Client offer',
            description: 'Can client access to offer',
            config: {
                Class: 'component/meta/rbac/rule/ClientOfferRule'
            }
        },
        'driverOrder': {
            label: 'Driver order',
            description: 'Can driver access to order',
            config: {
                Class: 'component/meta/rbac/rule/DriverOrderRule'
            }
        },
        'offerConfirmation': {
            label: 'Offer confirmation',
            description: 'Can driver confirm offer',
            config: {
                Class: 'component/meta/rbac/rule/OfferConfirmationRule'
            }
        },
        'offerCreation': {
            label: 'Offer creation',
            description: 'Can driver create offer',
            config: {
                Class: 'component/meta/rbac/rule/OfferCreationRule'
            }
        },
        'offerDeletion': {
            label: 'Offer deletion',
            description: 'Can driver delete offer',
            config: {
                Class: 'component/meta/rbac/rule/OfferDeletionRule'
            }
        },
        'orderDeletion': {
            label: 'Order deletion',
            description: 'Can client delete order',
            config: {
                Class: 'component/meta/rbac/rule/OrderDeletionRule'
            }
        },
        'user': {
            label: 'User',
            description: 'Check user binding',
            config: {
                Class: 'evado/component/meta/rbac/rule/UserRule'
            }
        }
    },

    // bind users to roles
    assignments: {
        'Adam': 'administrator',
        'Bob': 'client',
        'Denis': 'driver',
        'Sara': 'client',
        'Tom': 'driver'
    },

    // rules to auto-bind users to roles
    assignmentRules: {        
    }
};