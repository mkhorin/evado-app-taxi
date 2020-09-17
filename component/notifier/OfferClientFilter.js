/**
 * @copyright Copyright (c) 2020 Maxim Khorin (maksimovichu@gmail.com)
 */
'use strict';

const Base = require('areto/base/Base');

module.exports = class OfferClientFilter extends Base {

    async getUsers (data) {
        const offer = data.model;
        const order = await offer.related.resolve('order');
        const client = await order.related.resolve('client');
        return client.get('user');
    }
};