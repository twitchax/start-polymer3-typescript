
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { customElement, property, computed } from "@polymer/decorators";

@customElement('lazy-element')
class LazyElement extends PolymerElement {

    @property({ type: String })
    firstName: string = 'First';

    @property({ type: String })
    lastName: string = 'Last';

    @computed('firstName', 'lastName')
    get name() {
        return `${this.firstName} ${this.lastName}`;
    }

    static get template() {
        return html`
            <p>You ([[name]]) like pie.</p>
        `;
    }
}
