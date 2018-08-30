
import '@polymer/polymer/lib/elements/dom-if';
import '@polymer/paper-checkbox/paper-checkbox';

import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { customElement, property, query, listen } from "@polymer/decorators";
import { PaperCheckboxElement } from '@polymer/paper-checkbox/paper-checkbox';
import {GestureEventListeners} from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import {DeclarativeEventListeners} from '@polymer/decorators/lib/declarative-event-listeners.js';

@customElement('main-page')
class MainPage extends GestureEventListeners(DeclarativeEventListeners(PolymerElement)) {

    // Property declarations with observers.

    @property({ type: String })
    message: string = '';

    @property({ type: Boolean, observer: MainPage.prototype.togglePie })
    pie: boolean = false;

    @property({ type: Boolean })
    loadComplete: boolean = false;

    @query('#omgpie')
    omgpie!: PaperCheckboxElement;

    constructor() {
        super();

        this.message = 'Hello World! I\'m a Polymer element. :)';
    }

    ready() {
        super.ready();

        console.log(this.tagName);
        this.omgpie.focus();
    }

    togglePie() {
        if (this.pie && !this.loadComplete) {
            import('./lazy-element.js').then((LazyElement) => {
                console.log("LazyElement loaded.");
            }).catch((reason) => {
                console.log("LazyElement failed to load.", reason);
            });
            this.loadComplete = true;
        }
    }

    @listen('tap', document)
    onDocumentScroll(event: Event) {
        console.log('A tap occurred.');
    }

    static get template() {
        return html`
            <style>
                paper-checkbox {
                --paper-checkbox-checked-ink-color: #FFFFFF;
                --paper-checkbox-unchecked-ink-color: #FFFFFF;
                }
            </style>

            <h1>Start Polymer 3.0 with TypeScript</h1>
            <p>[[message]]</p>
            <paper-checkbox id="omgpie" toggles noink checked={{pie}}>I like pie.</paper-checkbox>
            <template is="dom-if" if=[[pie]]>
                <lazy-element><p>lazy loading...</p></lazy-element>
            </template>
        `;
    }
}
