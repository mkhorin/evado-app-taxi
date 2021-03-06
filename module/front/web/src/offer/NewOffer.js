/**
 * @copyright Copyright (c) 2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Front.NewOffer = class NewOffer extends Front.Loadable {

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
        this.modal = Jam.showModal(this.$modal);
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
        this.modal.hide();
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