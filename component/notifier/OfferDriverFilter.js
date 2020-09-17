/**
 * @copyright Copyright (c) 2020 Maxim Khorin (maksimovichu@gmail.com)
 */
'use strict';

const Base = require('areto/base/Base');

module.exports = class OfferDriverFilter extends Base {

    async getUsers (data) {
        const offer = data.model;
        const driver = await offer.related.resolve('driver');
        return driver.get('user');
    }
};