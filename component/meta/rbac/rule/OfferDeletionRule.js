/**
 * @copyright Copyright (c) 2020 Maxim Khorin (maksimovichu@gmail.com)
 */
'use strict';

// driver can only delete his own offer in New or Accepted states

const Base = require('evado/component/meta/rbac/rule/BaseRule');

module.exports = class OfferDeletionRule extends Base {

    execute () {
        return this.isObjectTarget() ? this.checkAccess(this.getTarget()) : false;
    }

    async checkAccess (offer) {
        const state = offer.getStateName();
        if (state !== 'new' && state !== 'accepted') {
            return false;
        }
        const driver = await offer.related.resolve('driver');
        return this.isUser(driver.get('user'));
    }
};