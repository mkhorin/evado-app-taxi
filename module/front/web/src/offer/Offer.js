/**
 * @copyright Copyright (c) 2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Front.Offer = class Offer extends Front.Loadable {

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
        this.modal?.hide();
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
        this.modal = Jam.showModal(this.$modal);
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