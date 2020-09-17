/**
 * @copyright Copyright (c) 2020 Maxim Khorin (maksimovichu@gmail.com)
 */
'use strict';

const Base = require('evado-meta-base/workflow/Transit');

module.exports = class OfferCancellationTransit extends Base {

    async run () {
        const order = await this.model.related.resolve('order');
        await order.updateState('waiting');
    }
};