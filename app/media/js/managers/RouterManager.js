import page from 'page';

import routes from '../datas/routes.json';
import events from '../datas/events.json';

import EmitterManager from './EmitterManager';
import HomeView from '../views/HomeView';

class RouterManager {

	constructor() {

		this.switchPage = this.switchPage.bind(this);
		this.switchPopin = this.switchPopin.bind(this);

		this._currentPage = null;
		this._currentPopin = null;

		for (const key in routes) {

			page(routes[key], this.switchPage);
		}

		EmitterManager.on(events.ROUTER_PAGE, this.switchPage);
		EmitterManager.on(events.ROUTER_POPIN, this.switchPopin);
	}

	start() {

		page();
	}

	switchPage(event) {

		let oldPage = null;

		if (this._currentPage) {

			oldPage = this._currentPage;

			EmitterManager.once(events.TRANSITION_START_NEXT, ()=> {

				this._currentPage.transitionIn();
			});
		}

		switch (event.pathname || event) {

			case routes.HOME:
				this._currentPage = new HomeView();
				break;

			default:
				console.error('No route found for', event.pathname);
		}

		if (oldPage) oldPage.transitionOut();
		else this._currentPage.transitionIn();
	}

	switchPopin(/*popinName*/) {

		// if (this._currentPopin) this._currentPopin.transitionOut();

		// switch (popinName) {

			// default:
			// 	this._currentPopin = null;
		// }

		// if (this._currentPopin) this._currentPopin.transitionIn();
	}
}

export default new RouterManager();
