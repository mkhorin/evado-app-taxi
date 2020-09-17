'use strict';

Front.Order = class Order extends Front.LoadableContent {

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

Front.OrderList = class OrderList extends Front.LoadableContent {

    init () {
        super.init();
        this.pagination = new Front.Pagination(this);
        this.pagination.pageSize = 6;
        this.on('change:pagination', this.onChangePagination.bind(this));
    }

    getUrl () {
        return super.getUrl('list');
    }

    getPostData () {
        return {
            class: 'order',
            view: 'myOrders',
            start: this.pagination.getOffset(),
            length: this.pagination.getPageSize(),
            filter: this.getFilter()
        };
    }

    getFilter () {
    }

    onChangePagination (event, {page}) {
        this.load();
    }

    render (data) {
        let items = data && data.items;
        items = Array.isArray(items) ? items : [];
        items = items.map(this.renderItem, this).join('');
        const template = items ? 'list' : 'empty';
        return this.resolveTemplate(template, {items});
    }

    renderItem (data) {
        data.state = this.getItemTitle('_state', data);
        data.date = Jam.FormatHelper.asDatetime(data._createdAt);
        data.client = this.getItemTitle('client', data);
        return this.resolveTemplate('item', data);
    }

    renderError () {
        const text = super.renderError(...arguments);
        return this.resolveTemplate('error', {text});
    }

    onDone (data) {
        super.onDone(data);
        this.pagination.setTotal(data && data.totalSize);
        this.$content.append(this.pagination.render());
        this.translateContainer();
    }
};

Front.NewOrder = class NewOrder extends Front.LoadableContent {

    init () {
        super.init();
        this.$modal = this.$container.closest('.new-order-modal');
        this.$modalError = this.$modal.find('.modal-error');
        this.$modal.on('click', '[data-command="create"]', this.onCreate.bind(this));
        this.front.on('action:newOrder', this.onNewOrder.bind(this));
    }

    getCommand (name) {
        return this.$modal.find(`[data-command="${name}"]`);
    }

    getUrl (action = 'defaults') {
        return super.getUrl(action);
    }

    getForm () {
        return this.getHandler('Form');
    }

    getPostData () {
        return {
            class: 'order'
        };
    }

    render (data) {
        this.data = data;
        return this.resolveTemplate('order', data);
    }

    renderError () {
        const text = super.renderError(...arguments);
        return this.resolveTemplate('error', {text});
    }

    onAfterDone () {
        super.onAfterDone();
        const form = this.getForm();
    }

    onNewOrder (event) {
        this.$content.html('');
        this.$modalError.addClass('hidden');
        this.$modal.modal();
        this.load();
    }

    onCreate () {
        const form = this.getForm();
        if (!form.validate()) {
            return false;
        }
        const data = {
            class: 'order',
            data: form.serialize()
        };
        this.front.ajaxQueue.post(this.getUrl('create'), data)
            .done(this.onCreateDone.bind(this))
            .fail(this.onCreateFail.bind(this));
    }

    onCreateDone (data) {
        this.$modal.modal('hide');
        this.front.getHandler('OrderList').load();
    }

    onCreateFail (data) {
        const form = this.getForm();
        form.setErrors(data.responseText);
        if (!form.hasError()) {
            this.$modalError.removeClass('hidden').html(data.responseText || data.statusText);
        }
    }
};

Front.ViewOrder = class ViewOrder extends Front.LoadableContent {

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
        this.$modal.modal();
        this.id = order;
        this.load();
    }
};

Front.WaitingOrderList = class WaitingOrderList extends Front.OrderList {

    getPostData () {
        return {
            class: 'order',
            view: 'waitingOrders',
            start: this.pagination.getOffset(),
            length: this.pagination.getPageSize(),
            filter: this.getFilter()
        };
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
