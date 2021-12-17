'use strict';

Vue.component('offer', {
    props: {
        offer: String
    },
    data () {
        return {
            id: null,
            driver: null,
            driverName: null,
            state: null,
            stateTitle: null,
            price: null,
            info: null,
            order: null
        };
    },
    computed: {
        accepted () {
            return this.state === 'accepted';
        },
        newly () {
            return this.state === 'new';
        },
        inProgress () {
            return this.state === 'inProgress';
        }
    },
    async created () {
        await this.load();
    },
    methods: {
        onOrder (id) {
            this.$emit('order', id);
        },
        onAccept () {
            this.transit('accept');
        },
        onConfirm () {
            this.transit('confirm');
        },
        async onComplete () {
            await Jam.dialog.confirm('Is the trip over?');
            this.transit('close');
        },
        async onDelete () {
            await Jam.dialog.confirmDeletion('Delete this offer permanently?');
            await this.fetchText('delete', this.getFetchParams());
            this.$emit('change');
        },
        async transit (transition) {
            try {
                await this.fetchText('transit', this.getFetchParams({transition}));
                this.$emit('change');
            } catch (err) {
                this.showError(err);
            }
        },
        async load () {
            const data = await this.fetchJson('read', this.getFetchParams());
            this.id = data._id;
            this.driver = data.driver?._id;
            this.driverName = data.driver?._title;
            this.state = data._state;
            this.stateTitle = Jam.t(this.getValueTitle('_state', data), 'meta');
            this.price = data.price;
            this.info = data.info;
            this.order = data.order;
        },
        getFetchParams (params) {
            return {
                class: 'offer',
                id: this.offer,
                ...params
            };
        }
    },
    template: '#offer'
});