'use strict';

Vue.component('order-offers', {
    props: {
        pageSize: {
            type: Number,
            default: 3
        },
        order: String
    },
    data () {
        return {
            activeOffer: null,
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
        onChangeOffer () {
            this.$refs.offerModal.hide();
            this.reload();
        },
        onOffer (id) {
            this.$refs.offerModal.show();
            this.activeOffer = id;
        },
        onOrder () {
            this.$refs.offerModal.hide();
        },
        async reload () {
            await this.load(0);
        },
        async load (page) {
            const data = await this.fetchJson('list', {
                class: 'offer',
                master: {
                    class: 'order',
                    attr: 'offers',
                    id: this.order
                },
                length: this.pageSize,
                start: page * this.pageSize
            });
            const pageSize = this.pageSize;
            this.$emit('load', {...data, pageSize, page});
        },
        onLoad ({items}) {
            this.items = this.formatItems(items);
        },
        formatItems (items) {
            return items.map(item => ({
                id: item._id,
                driver: item.driver?._title,
                state: item._state,
                stateTitle: Jam.t(this.getValueTitle('_state', item), 'meta'),
                price: item.price
            }));
        },
    },
    template: '#order-offers'
});