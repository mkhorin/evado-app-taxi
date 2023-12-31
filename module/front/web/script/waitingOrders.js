'use strict';

Vue.component('waiting-orders', {
    props: {
        pageSize: {
            type: Number,
            default: 3
        }
    },
    data () {
        return {
            items: []
        };
    },
    computed: {
        empty () {
            return !this.items.length;
        }
    },
    async created () {
        this.$on('load', this.onLoad);
        await this.reload();
    },
    methods: {
        async reload () {
            await this.load(0);
        },
        async load (page) {
            const {pageSize} = this;
            const data = await this.fetchJson('list', {
                class: 'order',
                view: 'waitingOrders',
                length: pageSize,
                start: page * pageSize
            });
            this.$emit('load', {...data, pageSize, page});
        },
        onLoad ({items}) {
            this.items = this.formatItems(items);
        },
        formatItems (items) {
            return items.map(item => ({
                id: item._id,
                end: item.end,
                price: item.price,
                start: item.start,
                client: item.client?._id,
                clientName: item.client?._title
            }));
        },
    },
    template: '#waiting-orders'
});