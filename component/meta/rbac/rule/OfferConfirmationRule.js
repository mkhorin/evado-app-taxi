/**
 * @copyright Copyright (c) 2020 Maxim Khorin (maksimovichu@gmail.com)
 *
 * Driver can only confirm offer for waiting orders
 */
'use strict';

const Base = require('evado/component/meta/rbac/rule/BaseRule');

module.exports = class OfferConfirmationRule extends Base {

    execute () {
        return this.isObjectTarget()
            ? this.checkAccess(this.getTarget())
            : false;
    }

    async checkAccess (offer) {
        const order = await offer.related.resolve('order');
        return order.getStateName() === 'waiting';
    }
};