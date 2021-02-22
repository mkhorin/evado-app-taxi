/**
 * @copyright Copyright (c) 2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Front.Order = class Order extends Front.Loadable {

    init () {
        super.init();
        this.on('click', '[data-command="readyOrder"]', this.onReadyOrder.bind(this));
        this.on('click', '[data-command="deleteOrder"]', this.onDeleteOrder.bind(this));
        this.on('click', '[data-command="completeOrder"]', this.onCompleteOrder.bind(this));
    }

    getUrl (key = 'read') {
        return super.getUrl(key);
    }

    getPostData () {
        return {
            class: 'order',
            view: 'myOrder',
            id: this.id
        };
    }

    isEditable () {
        return this.data._state === 'draft';
    }

    isInProgress () {
        return this.data._state === 'inProgress';
    }

    isWaiting () {
        return this.data._state === 'waiting';
    }

    render (data) {
        this.data = Object.assign({}, data);
        data.client = this.getItemTitle('client', data);
        data.state = this.getItemTitle('_state', data);
        if (this.isEditable()) {
            data.ready = this.resolveTemplate('ready');
        }
        if (this.isEditable() || this.isWaiting()) {
            data.deletion = this.resolveTemplate('deletion');
        }
        if (this.isInProgress()) {
            data.complete = this.resolveTemplate('complete');
        }
        //data.items = data.items.map(this.renderItem.bind(this)).join('');
        return this.resolveTemplate('order', data);
    }

    renderItem (data) {
        return this.resolveTemplate('item', {
            id: data.item._id
        });
    }

    renderError () {
        const text = super.renderError(...arguments);
        return this.resolveTemplate('error', {text});
    }

    onAfterDone () {
        super.onAfterDone();
    }

    onReadyOrder () {
        this.readyOrder();
    }

    readyOrder () {
        this.toggleLoader(true);
        this.front.ajaxQueue.post(this.getUrl('transit'), {
            class: 'order',
            transition: 'ready',
            id: this.id
        }).done(()=> {
            this.toggleLoader(false);
            this.front.showPage('orders');
        }).fail(this.onFailAjax.bind(this));
    }

    onDeleteOrder () {
        Jam.dialog.confirmDeletion('Delete this order permanently?')
            .then(this.deleteOrder.bind(this));
    }

    deleteOrder () {
        this.toggleLoader(true);
        this.front.ajaxQueue.post(this.getUrl('delete'), {
            class: 'order',
            id: this.id
        }).done(()=> {
            this.toggleLoader(false);
            this.front.showPage('orders');
        }).fail(this.onFailAjax.bind(this));
    }

    onCompleteOrder () {
        Jam.dialog.confirm('Complete this order?').then(this.completeOrder.bind(this));
    }

    completeOrder () {
        this.toggleLoader(true);
        this.front.ajaxQueue.post(this.getUrl('transit'), {
            class: 'order',
            transition: 'close',
            id: this.id
        }).done(() => {
            this.toggleLoader(false);
            this.front.showPage('orders');
        }).fail(this.onFailAjax.bind(this));
    }

    onFailAjax (data) {
        this.toggleLoader(false);
        this.$content.prepend(this.renderError(data));
    }
};

Front.WaitingOrder = class WaitingOrder extends Front.Order {

    getPostData () {
        return {
            class: 'order',
            view: 'waitingOrder',
            id: this.id
        };
    }

    render (data) {
        this.data = Object.assign({}, data);
        data.state = this.getItemTitle('_state', data);
        data.client = this.getItemTitle('client', data);
        return this.resolveTemplate('order', data);
    }
};
