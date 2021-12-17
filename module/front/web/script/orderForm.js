'use strict';

Vue.component('order-form', {
    extends: Vue.component('model-form'),
    methods: {
        loadMeta () {
            const attrs = [{
                name: 'start',
                label: 'Departure address',
                type: 'string',
                required: true
            }, {
                name: 'end',
                label: 'Destination address',
                type: 'string',
                required: true
            }, {
                name: 'price',
                label: 'Desired price',
                type: 'string',
                required: true
            }, {
                name: 'info',
                label: 'Additional info',
                type: 'text',
                required: false
            }];
            return {attrs};
        },
        loadData () {
            return {};
        }
    }
});