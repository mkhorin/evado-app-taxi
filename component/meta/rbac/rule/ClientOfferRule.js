/**
 * @copyright Copyright (c) 2020 Maxim Khorin (maksimovichu@gmail.com)
 */
'use strict';

// client can read offer related to his order

const Base = require('evado/component/meta/rbac/rule/BaseRule');

module.exports = class ClientOfferRule extends Base {

    execute () {
        return this.isObjectTarget() ? this.checkAccess(this.getTarget()) : true;
    }

    async checkAccess (offer) {
        const order = await offer.related.resolve('order');
        const client = await order.related.resolve('client');
        return this.isUser(client.get('user'));
    }

    async getObjectFilter () { // filter objects in list
        const meta = this.getBaseMeta();
        const client = await meta.getClass('client').find({user: this.getUserId()}).id();
        const orders = await meta.getClass('order').find({client}).ids();
        return {order: orders};
    }
};