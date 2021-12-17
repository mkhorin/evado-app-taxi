'use strict';

Vue.component('order', {
    props: {
        order: String
    },
    data () {
        return {
            id: null,
            end: null,
            start: null,
            client: null,
            clientName: null,
            state: null,
            stateTitle: null,
            price: null,
            info: null
        };
    },
    computed: {
        editable () {
            return this.state === 'draft';
        },
        inProgress () {
            return this.state === 'inProgress';
        },
        waiting () {
            return this.state === 'waiting';
        }
    },
    async created () {
        await this.load();
    },
    methods: {
        onNewOffer () {
            this.$refs.newOfferModal.show();
        },
        onCreateOffer () {
            const form = this.$refs.newOfferForm;
            if (form.validate()) {
                this.$refs.newOfferModal.hide();
                this.createOffer(form.serialize());
            }
        },
        async createOffer (data) {
            try {
                await this.fetchText('create', {
                    class: 'offer',
                    master: this.getFetchParams({attr: 'offers'}),
                    data
                });
                this.$refs.offers.reload();
            } catch (err) {
                this.showError(err);
            }
        },
        async onComplete () {
            await Jam.dialog.confirm('Is the trip over?');
            await this.fetchText('transit', this.getFetchParams({
                transition: 'close'
            }));
            this.toOrders();
        },
        async onDelete () {
            await Jam.dialog.confirmDeletion('Delete this order permanently?');
            try {
                await this.fetchText('delete', this.getFetchParams());
                this.toOrders();
            } catch (err) {
                this.showError(err);
            }
        },
        async onReady () {
            await this.fetchText('transit', this.getFetchParams({
                transition: 'ready'
            }));
            this.toOrders();
        },
        async load () {
            const data = await this.fetchJson('read', this.getFetchParams({
                view: this.isClient() ? 'myOrder' : 'waitingOrder'
            }));
            this.id = data._id;
            this.end = data.end;
            this.start = data.start;
            this.client = data.client?._id;
            this.clientName = data.client?._title;
            this.state = data._state;
            this.stateTitle = Jam.t(this.getValueTitle('_state', data), 'meta');
            this.price = data.price;
            this.info = data.info;
        },
        getFetchParams (params) {
            return {
                class: 'order',
                id: this.order,
                ...params
            };
        }
    },
    template: '#order'
});