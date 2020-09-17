/**
 * @copyright Copyright (c) 2020 Maxim Khorin (maksimovichu@gmail.com)
 */
'use strict';

const Base = require('evado/component/notifier/MessageTemplate');

module.exports = class UserNameTemplate extends Base {

    prepareData (data) {
        return {
            user: data.model.user.getTitle()
        };
    }
};