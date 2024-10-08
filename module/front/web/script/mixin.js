'use strict';

Vue.filter('boolean', Jam.FormatHelper.asBoolean.bind(Jam.FormatHelper));
Vue.filter('datetime', Jam.FormatHelper.asDatetime.bind(Jam.FormatHelper));

Vue.mixin({
    data () {
        return {
            loading: false
        };
    },
    mounted () {
        this.translateElement();
    },
    updated () {
        this.translateElement();
    },
    methods: {
        isGuest () {
            return !this.$root.userId;
        },
        isClient () {
            return this.$root.client === 'true';
        },
        isDriver () {
            return this.$root.driver === 'true';
        },
        getDataUrl (action) {
            return `${this.$root.dataUrl}/${action}`;
        },
        getMetaUrl (action) {
            return `${this.$root.metaUrl}/${action}`;
        },
        getRandomId () {
            return `${Date.now()}${Jam.Helper.random(10000, 99999)}`;
        },
        getRefArray (name) {
            const data = this.$refs[name];
            return Array.isArray(data) ? data : data ? [data] : [];
        },
        getValueTitle (key, data) {
            const item = data[key];
            if (item?.hasOwnProperty('_title')) {
                return item._title;
            }
            return data.hasOwnProperty(`${key}_title`) ? data[`${key}_title`] : item;
        },
        fetchJson (action, ...args) {
            return this.fetchByMethod('getJson', this.getDataUrl(action), ...args);
        },
        fetchMeta (action, ...args) {
            return this.fetchByMethod('getJson', this.getMetaUrl(action), ...args);
        },
        fetchText (action, ...args) {
            return this.fetchByMethod('getText', this.getDataUrl(action), ...args);
        },
        fetchByMethod (name, url, data, options) {
            try {
                this.loading = true;
                const csrf = this.$root.csrf;
                return (new Jam.Fetch)[name](url, {csrf, ...data}, options);
            } finally {
                this.loading = false;
            }
        },
        requireAuth () {
            if (this.isGuest()) {
                location.assign(this.$root.authUrl);
                return false;
            }
            return true;
        },
        toMain () {
            this.$root.$emit('main-page');
        },
        toOrders () {
            this.$root.$emit('orders');
        },
        toOrder () {
            this.$root.$emit('order', ...arguments);
        },
        toOffers () {
            this.$root.$emit('offers');
        },
        toWaitingOrders () {
            this.$root.$emit('waiting-orders');
        },
        translateElement () {
            Jam.i18n.translate($(this.$el));
        },
        showError () {
            Jam.dialog.error(...arguments);
        }
    }
});