'use strict';

const front = new Vue({
    el: '#front',
    props: {
        csrf: String,
        client: String,
        driver: String,
        authUrl: String,
        dataUrl: String,
        fileUrl: String,
        metaUrl: String,
        thumbnailUrl: String,
        userId: String
    },
    propsData: {
        ...document.querySelector('#front').dataset
    },
    data () {
        return {
            activePage: 'main-page',
            activeOrder: null
        };
    },
    computed: {
        activePageProps () {
            return {
                ...this.defaultPageProps,
                ...this.pagePros
            };
        },
        defaultPageProps () {
            return {};
        },
        pagePros () {
            switch (this.activePage) {
                case 'order':
                    return {
                        key: this.activeOrder,
                        order: this.activeOrder
                    };
            }
        }
    },
    created () {
        this.$on('main-page', this.onMainPage);
        this.$on('offers', this.onOffers);
        this.$on('orders', this.onOrders);
        this.$on('order', this.onOrder);
        this.$on('photo', this.onPhoto);
        this.$on('waiting-orders', this.onWaitingOrders);
    },
    methods: {
        onMainPage () {
            this.activePage = 'main-page';
        },
        onOrders () {
            if (this.requireAuth()) {
                this.activePage = 'orders';
            }
        },
        onOrder (id) {
            this.activePage = 'order';
            this.activeOrder = id;
        },
        onOffers () {
            this.activePage = 'offers';
        },
        onWaitingOrders () {
            this.activePage = 'waiting-orders';
        }
    }
});