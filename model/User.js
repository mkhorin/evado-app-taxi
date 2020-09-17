'use strict';

const Base = require('evado/model/User');

module.exports = class User extends Base {

    static getConstants () {
        return {
            ATTRS: super.ATTRS.concat(
                'type'
            ),
            RULES: super.RULES.concat([
                ['type', 'string']
            ])
        };
    }

    isClient () {
        return this.get('type') === 'client';
    }

    isDriver () {
        return this.get('type') === 'driver';
    }
};
module.exports.init(module);