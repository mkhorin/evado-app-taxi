'use strict';

Vue.component('offer-form', {
    extends: Vue.component('model-form'),
    methods: {
        loadMeta () {
            const attrs = [{
                name: 'price',
                label: 'Price',
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