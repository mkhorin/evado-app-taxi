/**
 * @copyright Copyright (c) 2020 Maxim Khorin (maksimovichu@gmail.com)
 *
 * Driver can only create offer for waiting orders
 */
'use strict';

const Base = require('evado/component/meta/rbac/rule/BaseRule');

module.exports = class OfferCreationRule extends Base {

    async execute () {
        const order = this.isObjectTarget()
            ? await this.getTarget().related.resolve('order')
            : this.params.model; // master model
        return order
            ? order.getStateName() === 'waiting'
            : false;
    }
};