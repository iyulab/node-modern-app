import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@iyulab/u-components/components/spinners'

@customElement('busy-indicator')
export class BusyIndicator extends LitElement {

  @property({ type: String })
  message?: string;

  @property({ type: Boolean, reflect: true })
  open: boolean = true;
  
  render() {
    return html`
      <div class="container">
        <u-spinner 
          size="70px"
          width="5px"
          trackColor="#E1E1E1"
        ></u-spinner>
        <div>${this.message}</div>
      </div>
    `;
  }

  public busy() {
    this.open = true;
    // this.hidden = false;
  }

  public unbusy() {
    this.open = false;
    // this.hidden = true;
  }
  
  static styles = css`
    :host {
      display: none;
    }
    
    :host([open]) {
      z-index: 999;
      display: block;
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      cursor: wait;
    }
    
    .container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #2224;
    }
  `;

}