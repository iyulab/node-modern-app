import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { FlyoutElement, Position } from './FlyoutElement';

@customElement('sub-nav-tooltip')
export class SubNavTooltip extends FlyoutElement {
    keepHover: boolean = false;
    position: Position = Position.RightCenter;

    @property({ type: String })
    display = '';

    render() {
        return html`
            <div class="container">
                ${this.display}
            </div>
        `;
    }

    static styles = css`
        .container {
            padding: 6px 12px;
            margin: 5px;
            background-color: rgba(0, 0, 0, .65);
            border-radius: 2px;
            box-shadow: none;

            color: #fff;
            font-weight: normal;
            font-size: 14px;
            line-height: 20px;
            white-space: nowrap;
        }
    `;
}