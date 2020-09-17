/**
 * @copyright Copyright (c) 2020 Maxim Khorin (maksimovichu@gmail.com)
 */
'use strict';

// assign role to user according registration type
// emit event according registration type

const Base = require('areto/base/Base');

module.exports = class UserRegistration extends Base {

    execute (data) {
        if (data.user.isClient()) {
            return this.assignRole('client', 'clientRegistration', data);
        }
        if (data.user.isDriver()) {
            return this.assignRole('driver', 'driverRegistration', data);
        }
    }

    async assignRole (role, event, data) {
        const rbac = this.module.getRbac();
        await rbac.assignItem(role, data.user.getId());
        await rbac.load();
        await this.module.emit(event, data);
    }
};