/**
 * @copyright Copyright (c) 2020 Maxim Khorin (maksimovichu@gmail.com)
 *
 * Client can read offer related to his order
 */
'use strict';

const Base = require('evado/component/meta/rbac/rule/BaseRule');

module.exports = class ClientOfferRule extends Base {

    execute () {
        return this.isObjectTarget()
            ? this.checkAccess(this.getTarget())
            : true;
    }

    async checkAccess (offer) {
        const order = await offer.related.resolve('order');
        const client = await order.related.resolve('client');
        return this.isUser(client.get('user'));
    }

    /**
     * Filter objects in list
     */
    async getObjectFilter () {
        const meta = this.getBaseMeta();
        const user = this.getUserId();
        const clientClass = meta.getClass('client');
        const client = await clientClass.find({user}).id();
        const orderClass = meta.getClass('order');
        const orders = await orderClass.find({client}).ids();
        return {order: orders};
    }
};