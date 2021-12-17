'use strict';

Vue.component('orders', {
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
        onNew () {
            this.$refs.newModal.show();
        },
        onCreate () {
            const form = this.$refs.newForm;
            if (form.validate()) {
                this.$refs.newModal.hide();
                this.create(form.serialize());
            }
        },
        async create (data) {
            try {
                await this.fetchText('create', {
                    class: 'order',
                    data
                });
                this.reload();
            } catch (err) {
                this.showError(err);
            }
        },
        async reload () {
            await this.load(0);
        },
        async load (page) {
            const data = await this.fetchJson('list', {
                class: 'order',
                view: 'myOrders',
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
                end: item.end,
                price: item.price,
                start: item.start,
                stateTitle: Jam.t(this.getValueTitle('_state', item), 'meta'),
                state: item._state
            }));
        },
    },
    template: '#orders'
});