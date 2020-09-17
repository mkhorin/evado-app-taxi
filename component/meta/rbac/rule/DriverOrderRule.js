/**
 * @copyright Copyright (c) 2020 Maxim Khorin (maksimovichu@gmail.com)
 */
'use strict';

// driver can read orders in Waiting state
// driver can read orders with his offer

const Base = require('evado/component/meta/rbac/rule/BaseRule');

module.exports = class DriverOrderRule extends Base {

    execute () {
        return this.isObjectTarget() ? this.checkAccess(this.getTarget()) : true;
    }

    async checkAccess (order) {
        if (order.getStateName() === 'waiting') {
            return true;
        }
        const meta = order.class.meta;
        const driver = await meta.getClass('driver').find({user: this.getUserId()}).id();
        return !!await meta.getClass('offer').find({order: order.getId(), driver}).id();
    }

    async getObjectFilter () { // filter objects in list
        const meta = this.getBaseMeta();
        const driver = await meta.getClass('driver').find({user: this.getUserId()}).id();
        const orders = await meta.getClass('offer').find({driver}).column('order');
        const state = {_state: 'waiting'};
        return orders.length ? ['OR', state, {_id: orders}] : state;
    }
};