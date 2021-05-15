/**
 * @copyright Copyright (c) 2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Front.ViewOrder = class ViewOrder extends Front.Loadable {

    init () {
        super.init();
        this.$modal = this.$container.closest('.view-order-modal');
        this.$modalError = this.$modal.find('.modal-error');
        this.front.on('action:viewOrder', this.onViewOrder.bind(this));
    }

    getUrl (action = 'read') {
        return super.getUrl(action);
    }

    getPostData () {
        return {
            class: 'order',
            id: this.id
        };
    }

    render (data) {
        this.data = data;
        data.client = this.getItemTitle('client', data);
        data.state = this.getItemTitle('_state', data);
        return this.resolveTemplate('order', data);
    }

    renderError () {
        const text = super.renderError(...arguments);
        return this.resolveTemplate('error', {text});
    }

    onViewOrder (event, {order}) {
        this.$content.html('');
        this.$modalError.addClass('hidden');
        this.modal = Jam.showModal(this.$modal);
        this.id = order;
        this.load();
    }
};