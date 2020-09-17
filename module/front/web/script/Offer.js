'use strict';

Front.Offer = class Offer extends Front.LoadableContent {

    init () {
        super.init();
        this.$modal = this.$container.closest('.offer-modal');
        this.$modalError = this.$modal.find('.modal-error');
        this.front.on('action:offer', this.onOffer.bind(this));
        this.on('click', '[data-command="acceptOffer"]', this.onAcceptOffer.bind(this));
        this.on('click', '[data-command="confirmOffer"]', this.onConfirmOffer.bind(this));
        this.on('click', '[data-command="deleteOffer"]', this.onDeleteOffer.bind(this));
        this.on('click', '[data-command="completeOffer"]', this.onCompleteOffer.bind(this));
    }

    close () {
        this.$modal.modal('hide');
    }

    getUrl (action = 'read') {
        return super.getUrl(action);
    }

    getPostData () {
        return {
            class: 'offer',
            id: this.offer
        };
    }

    render (data) {
        this.data = data;
        data.driver = this.getItemTitle('driver', data);
        data.state = this.getItemTitle('_state', data);
        const state = data._state;
        if (state === 'new' && this.front.isClient()) {
            data.accept = this.resolveTemplate('accept');
        }
        if (this.front.isDriver()) {
            if (state === 'accepted') {
                data.confirm = this.resolveTemplate('confirm');
            }
            if (state === 'new' || state === 'accepted') {
                data.deletion = this.resolveTemplate('deletion');
            }
            if (state === 'inProgress') {
                data.complete = this.resolveTemplate('complete');
            }
        }
        return this.resolveTemplate('offer', data);
    }

    renderError () {
        const text = super.renderError(...arguments);
        return this.resolveTemplate('error', {text});
    }

    onOffer (event, {offer, parentHandler}) {
        this.$content.html('');
        this.$modalError.addClass('hidden');
        this.$modal.modal();
        this.offer = offer;
        this.parentHandler = parentHandler;
        this.load();
    }

    onAcceptOffer () {
        this.acceptOffer();
    }

    acceptOffer () {
        this.toggleLoader(true);
        const data = this.getPostData();
        this.front.ajaxQueue.post(this.getUrl('transit'), {
            transition: 'accept',
            ...data
        }).done(() => {
            this.toggleLoader(false);
            this.close();
            this.parentHandler.load();
        }).fail(this.onFailAjax.bind(this));
    }

    onConfirmOffer () {
        this.confirmOffer();
    }

    confirmOffer () {
        this.toggleLoader(true);
        const data = this.getPostData();
        this.front.ajaxQueue.post(this.getUrl('transit'), {
            transition: 'confirm',
            ...data
        }).done(() => {
            this.toggleLoader(false);
            this.close();
            this.parentHandler.load();
        }).fail(this.onFailAjax.bind(this));
    }

    onDeleteOffer () {
        Jam.dialog.confirmDeletion('Delete this offer permanently?')
            .then(this.deleteOffer.bind(this));
    }

    deleteOffer () {
        this.toggleLoader(true);
        const data = this.getPostData();
        this.front.ajaxQueue.post(this.getUrl('delete'), {
            ...data
        }).done(() => {
            this.toggleLoader(false);
            this.close();
            this.parentHandler.load();
        }).fail(this.onFailAjax.bind(this));
    }

    onCompleteOffer () {
        Jam.dialog.confirm('Complete this offer?')
            .then(this.completeOffer.bind(this));
    }

    completeOffer () {
        this.toggleLoader(true);
        const data = this.getPostData();
        this.front.ajaxQueue.post(this.getUrl('transit'), {
            transition: 'close',
            ...data
        }).done(() => {
            this.toggleLoader(false);
            this.close();
            this.parentHandler.load();
        }).fail(this.onFailAjax.bind(this));
    }

    onFailAjax (data) {
        this.toggleLoader(false);
        this.$content.prepend(this.renderError(data));
    }
};

Front.OfferList = class OfferList extends Front.LoadableContent {

    init () {
        super.init();
        this.pagination = new Front.Pagination(this);
        this.pagination.pageSize = 6;
        this.on('change:pagination', this.onChangePagination.bind(this));
    }

    getUrl (action = 'list') {
        return super.getUrl(action);
    }

    getPostData () {
        return {
            class: 'offer',
            view: 'myOffers',
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
        data.driver = this.getItemTitle('driver', data);
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

Front.NewOffer = class NewOffer extends Front.LoadableContent {

    init () {
        super.init();
        this.$modal = this.$container.closest('.new-offer-modal');
        this.$modalError = this.$modal.find('.modal-error');
        this.$modal.on('click', '[data-command="create"]', this.onCreate.bind(this));
        this.front.on('action:newOffer', this.onNewOffer.bind(this));
    }

    getUrl (action = 'defaults') {
        return super.getUrl(action);
    }

    getForm () {
        return this.getHandler('Form');
    }

    getPostData () {
        return {
            class: 'offer',
            master: {
                class: 'order',
                attr: 'offers',
                id: this.order
            }
        };
    }

    render (data) {
        this.data = data;
        return this.resolveTemplate('offer', data);
    }

    renderError () {
        const text = super.renderError(...arguments);
        return this.resolveTemplate('error', {text});
    }

    onNewOffer (event, {order}) {
        this.$content.html('');
        this.$modalError.addClass('hidden');
        this.$modal.modal();
        this.order = order;
        this.load();
    }

    onCreate () {
        const form = this.getForm();
        if (!form.validate()) {
            return false;
        }
        const data = this.getPostData();
        data.data = form.serialize();
        data.data.order = {links: [this.order]};
        this.front.ajaxQueue.post(this.getUrl('create'), data)
            .done(this.onCreateDone.bind(this))
            .fail(this.onCreateFail.bind(this));
    }

    onCreateDone (data) {
        this.$modal.modal('hide');
        this.front.getHandler('WaitingOrder').load();
    }

    onCreateFail (data) {
        const form = this.getForm();
        form.setErrors(data.responseText);
        if (!form.hasError()) {
            this.$modalError.removeClass('hidden').html(data.responseText || data.statusText);
        }
    }
};

Front.OrderOfferList = class OrderOfferList extends Front.OfferList {

    init () {
        super.init();
        this.order = this.getData('order');
        this.on('click', '[data-command="create"]', this.onCreate.bind(this));
        this.load();
    }

    getUrl (action = 'list-related') {
        return super.getUrl(action);
    }

    getPostData () {
        return Object.assign(super.getPostData(), {
            view: 'list',
            master: {
                id: this.order,
                class: 'order',
                attr: 'offers'
            }
        });
    }

    onCreate () {
        this.front.trigger('action:newOffer', {order: this.order});
    }

    resolveTemplate (name, data) {
        return super.resolveTemplate(name, data, '##', '##');
    }
};