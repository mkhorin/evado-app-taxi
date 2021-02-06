/**
 * @copyright Copyright (c) 2020 Maxim Khorin (maksimovichu@gmail.com)
 */
'use strict';

const Base = require('evado-meta-base/workflow/Transit');

module.exports = class OrderEditTransit extends Base {

    async execute () {
        await this.removeOrderOffers();
    }

    async removeOrderOffers () {
        const offers = await this.model.related.resolve('offers');
        for (const offer of offers) {
            await offer.delete();
        }
    }
};