/**
 * @copyright Copyright (c) 2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Front.NewOrder = class NewOrder extends Front.Loadable {

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