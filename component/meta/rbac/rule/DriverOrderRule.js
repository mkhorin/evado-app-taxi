/**
 * @copyright Copyright (c) 2020 Maxim Khorin (maksimovichu@gmail.com)
 *
 * Driver can read orders in Waiting state
 * Driver can read orders with his offer
 */
'use strict';

const Base = require('evado/component/meta/rbac/rule/BaseRule');

module.exports = class DriverOrderRule extends Base {

    execute () {
        return this.isObjectTarget()
            ? this.checkAccess(this.getTarget())
            : true;
    }

    async checkAccess (order) {
        const state = order.getStateName();
        if (state === 'waiting') {
            return true;
        }
        const {meta} = order.class;
        const user = this.getUserId();
        const driverClass = meta.getClass('driver');
        const driver = await driverClass.find({user}).id();
        const offerClass = meta.getClass('offer');
        const offerQuery = offerClass.find({
            order: order.getId(),
            driver
        });
        const id = await offerQuery.id();
        return !!id;
    }

    /**
     * Filter objects in list
     */
    async getObjectFilter () {
        const meta = this.getBaseMeta();
        const user = this.getUserId();
        const driverClass = meta.getClass('driver');
        const driver = await driverClass.find({user}).id();
        const offerClass = meta.getClass('offer');
        const orders = await offerClass.find({driver}).column('order');
        const state = {_state: 'waiting'};
        return orders.length ? ['or', state, {_id: orders}] : state;
    }
};