import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { reaction } from 'mobx';

import { 
  fastButton,
  provideFASTDesignSystem,
} from "@microsoft/fast-components";

import { RelayCommand } from '../../../services/patterns/RelayCommand';
import { ICommand } from '../../../services/patterns/ICommand';
import { ElementMixin } from '../../../core/ElementMixin';

provideFASTDesignSystem().register(
  fastButton()
);

@customElement('u-button')
export class UButton extends  ElementMixin(LitElement) {

  static styles = [
    css`
      :host {
        --neutral-fill-stealth-rest: none;
        --btn-min-width: 80px;
        display: inline-flex;
      }
      
      :host(.block) {
        display: block;
        width: 100%;
        padding: 0.2em 0;
      }

      :host(.block) #btn {
        display: flex;
      }

      #btn {
        min-width: var(--btn-min-width);
      }
    `
  ];

  @property({type: String})
  href: string | null = null;

  @property({type: String, attribute: 'appearance'})
  appearance: string | null = null; // accent, lightweight, neutral, outline, stealth
  
  @property({type: Boolean, attribute: 'accent'})
  accent: boolean = false;  

  @property({type: Boolean, attribute: 'disabled'})
  disabled: boolean = false;

  @property({type: Object})
  command: ICommand | undefined = undefined;

  @property()
  commandParameter?: any = undefined;

  onChangedCommand(command?: RelayCommand) {

    if (command) {
      if (command.content) {
        this.innerText = command.content;
      }

      reaction(
        () => command.content, 
        (content) => {
          this.innerText = content;
        });
    }
  }

  constructor() {
    super();

    if (this.hasAttribute('icon')) {
      this.appearance = 'stealth';
    }
  }
  
  render() {
    
    if (this.accent) {
      this.appearance = "accent";
    } else if (this.href && this.appearance == null) {
      this.appearance = "lightweight";
    }
    
    return html`
      <fast-button id='btn' @click=${this.onClick} .appearance=${this.appearance} ?disabled=${this.disabled}>
        <slot></slot>
      </fast-button>
    `;
  }

  onClick() {
    if (this.command) {
      this.command.execute(this.commandParameter);
    }
    else if (this.href) {
      window.location.href = this.href;
    } else {
      // 아무것도 하지 않음
    }
  }
}