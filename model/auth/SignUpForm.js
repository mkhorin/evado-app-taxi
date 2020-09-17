'use strict';

const Base = require('evado/model/auth/SignUpForm');

module.exports = class SignUpForm extends Base {

    static getConstants () {
        return {
            RULES: super.RULES.concat([
                ['type', 'required'],
                ['type', 'range', {range: ['client', 'driver']}]
            ])
        };
    }
};
module.exports.init(module);