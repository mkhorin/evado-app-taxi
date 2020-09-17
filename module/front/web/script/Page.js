'use strict';

Front.Page = class Page extends Front.Element {

    init () {
        this.name = this.getData('page');
        this.front.on('show:page', this.onPage.bind(this));
    }

    onPage (event, data) {
        if (this.name === data.name) {
            this.activate(data);
        }
    }

    activate () {
        this.front.togglePage(this.name);
    }

    showPage () {
        this.front.showPage(this.name, ...arguments);
    }
};

Front.MainPage = class MainPage extends Front.Page {
};

Front.OrdersPage = class OrdersPage extends Front.Page {

    init () {
        super.init();
        this.list = this.getHandler('OrderList');
        this.front.on('action:orders', this.onOrders.bind(this));
    }

    activate () {
        super.activate();
        this.list.load();
    }

    onOrders () {
        this.showPage();
    }
};

Front.OrderPage = class OrderPage extends Front.Page {

    init () {
        super.init();
        this.order = this.getHandler('Order');
        this.front.on('action:order', this.onOrder.bind(this));
    }

    activate (data) {
        super.activate();
        this.order.setInstance(data.order);
    }

    onOrder (event, data) {
        this.showPage(data);
    }
};

Front.WaitingOrdersPage = class WaitingOrdersPage extends Front.Page {

    init () {
        super.init();
        this.list = this.getHandler('WaitingOrderList');
        this.front.on('action:waitingOrders', this.onWaitingOrders.bind(this));
    }

    activate () {
        super.activate();
        this.list.load();
    }

    onWaitingOrders () {
        this.showPage();
    }
};

Front.WaitingOrderPage = class WaitingOrderPage extends Front.Page {

    init () {
        super.init();
        this.order = this.getHandler('WaitingOrder');
        this.front.on('action:waitingOrder', this.onOrder.bind(this));
    }

    activate (data) {
        super.activate();
        this.order.setInstance(data.order);
    }

    onOrder (event, data) {
        this.showPage(data);
    }
};

Front.OffersPage = class OffersPage extends Front.Page {

    init () {
        super.init();
        this.list = this.getHandler('OfferList');
        this.front.on('action:offers', this.onOffers.bind(this));
    }

    activate () {
        super.activate();
        this.list.load();
    }

    onOffers () {
        this.showPage();
    }
};

Front.OfferPage = class OfferPage extends Front.Page {

    init () {
        super.init();
        this.offer = this.getHandler('Offer');
        this.front.on('action:offer', this.onOffer.bind(this));
    }

    activate (data) {
        super.activate();
        this.offer.setInstance(data.offer);
    }

    onOffer (event, data) {
        this.showPage(data);
    }
};