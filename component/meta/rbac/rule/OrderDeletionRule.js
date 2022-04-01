/**
 * @copyright Copyright (c) 2020 Maxim Khorin (maksimovichu@gmail.com)
 *
 * Client can only delete his own order in Draft or Waiting states
 */
'use strict';

const Base = require('evado/component/meta/rbac/rule/BaseRule');

module.exports = class OrderDeletionRule extends Base {

    execute () {
        return this.isObjectTarget() ? this.checkAccess(this.getTarget()) : false;
    }

    async checkAccess (order) {
        const state = order.getStateName();
        if (state !== 'draft' && state !== 'waiting') {
            return false;
        }
        const client = await order.related.resolve('client');
        return this.isUser(client.get('user'));
    }
};