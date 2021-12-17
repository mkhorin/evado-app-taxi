'use strict';

Vue.component('offers', {
    props: {
        pageSize: {
            type: Number,
            default: 6
        }
    },
    data () {
        return {
            activeOffer: null,
            activeOrder: null,
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
            this.activeOffer = id;
            this.$refs.offerModal.show();
        },
        onOrder (id) {
            this.activeOrder = id;
            this.$refs.orderModal.show();
        },
        async reload () {
            await this.load(0);
        },
        async load (page) {
            const data = await this.fetchJson('list', {
                class: 'offer',
                view: 'myOffers',
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
                order: item.order,
                state: item._state,
                stateTitle: Jam.t(this.getValueTitle('_state', item), 'meta'),
                price: item.price
            }));
        },
    },
    template: '#offers'
});