'use strict';

Vue.component('order-view', {
    props: {
        order: String
    },
    data () {
        return {
            id: null,
            state: null,
            stateTitle: null,
            price: null,
            info: null,
            clientName: null
        };
    },
    async created () {
        await this.load();
    },
    methods: {
        async load () {
            const data = await this.fetchJson('read', {
                class: 'order',
                id: this.order
            });
            this.id = data._id;
            this.end = data.end;
            this.start = data.start;
            this.state = data._state;
            this.stateTitle = Jam.t(this.getValueTitle('_state', data), 'meta');
            this.price = data.price;
            this.client = data.client?._id;
            this.clientName = data.client?._title;
        }
    },
    template: '#order-view'
});