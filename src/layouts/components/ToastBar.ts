import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

const info = "M453-280h60v-240h-60v240Zm26.982-314q14.018 0 23.518-9.2T513-626q0-14.45-9.482-24.225-9.483-9.775-23.5-9.775-14.018 0-23.518 9.775T447-626q0 13.6 9.482 22.8 9.483 9.2 23.5 9.2Zm.284 514q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.684q-54 54.316-127 86Q563-80 480.266-80Zm.234-60Q622-140 721-239.5t99-241Q820-622 721.188-721 622.375-820 480-820q-141 0-240.5 98.812Q140-622.375 140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z";
const error = "m330-288 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z";
const warning = "m40-120 440-760 440 760H40Zm104-60h672L480-760 144-180Zm340.175-57q12.825 0 21.325-8.675 8.5-8.676 8.5-21.5 0-12.825-8.675-21.325-8.676-8.5-21.5-8.5-12.825 0-21.325 8.675-8.5 8.676-8.5 21.5 0 12.825 8.675 21.325 8.676 8.5 21.5 8.5ZM454-348h60v-224h-60v224Zm26-122Z";
const close = "m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z";

const colors = {
    info: "#2ecc71",    // 인포: 그린 (밝은 그린 계열)
    error: "#e74c3c",   // 에러: 레드
    warning: "#f1c40f"
}

@customElement('toast-bar')
export class ToastBar extends LitElement {
    private hideTimeout?: any;
    private closeTimeout?: any;
    private expanded: boolean = false;

    @query('#container')
    container!: HTMLDivElement;

    @query('#body')
    body!: HTMLDivElement;

    @state()
    status?: "INFO" | "ERROR" | "WARNING";

    @state()
    icon?: string;

    @state()
    color?: string;

    @property({ type: String })
    message?: string;

    connectedCallback(): void {
        super.connectedCallback();
        this.hidden = true;
    }

    async updated(changedProperties: any) {
        super.updated(changedProperties);
        await this.updateComplete;

        if (changedProperties.has('color')) {
            this.style.setProperty('--color-background', this.color!);
        }
    }

    render() {
        return html`
            <div id="container"
                @mouseenter=${this.cancelHideAsync}
                @mouseleave=${this.startHideAsync}>
                <div class="header">
                    <svg class="icon" viewBox="0 -960 960 960">
                        <path d="${this.icon}"></path>
                    </svg>
                    <div class="title">
                        ${this.status}
                    </div>
                    <svg class="close" viewBox="0 -960 960 960"
                        @click=${this.close}>
                        <path d="${close}"></path>
                    </svg>
                </div>
                <div id="body">
                    <div class="message"
                    @click=${this.toggleMessageExpand}>
                        ${this.message}
                    </div>
                </div>
            </div>
        `;
    }

    public async info(message: string) {
        this.icon = info;
        this.status = "INFO";
        this.color = colors.info;
        this.show(message);
        this.startHideAsync();
    }

    public async error(message: string) {
        this.icon = error;
        this.status = "ERROR";
        this.color = colors.error;
        this.show(message);
        this.startHideAsync();
    }

    public async warning(message: string) {
        this.icon = warning;
        this.status = "WARNING";
        this.color = colors.warning;
        this.show(message);
        this.startHideAsync();
    }

    public async show(message: string) {
        this.cancelHideAsync();
        this.message = message;
        this.hidden = false;
    }

    public async close() {
        this.container.classList.remove("hide");
        this.body.classList.remove("expanded");
        this.expanded = false;
        this.message = "";
        this.hidden = true;
    }

    private async startHideAsync() {
        this.hideTimeout = setTimeout(() => {
            this.container.classList.add("hide");
        }, 1000);
        this.closeTimeout = setTimeout(() => {
            this.close();
        }, 2000)
    }

    public async cancelHideAsync() {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }
        if (this.closeTimeout) {
            clearTimeout(this.closeTimeout);
        }
        this.container.classList.remove("hide");
    }

    private toggleMessageExpand() {
        this.expanded = !this.expanded;

        if (this.expanded) {
            this.body.classList.add("expanded");
        } else {
            this.body.classList.remove("expanded");
        }
    }

    static styles = css`
        :host {
            --color-background: #2ecc71;
        }

        #container {
            opacity: 1;
            position: fixed;
            z-index: 10;
            bottom: 10%;
            left: 25%;
            width: 50%;
            display: flex;
            flex-direction: column;
            background: var(--color-background);
            color: #fff;
            border-radius: 4px;
            padding: 8px 12px;
            box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
            transition: opacity 1s ease-in-out;

            &.hide {
                opacity: 0;
            }
        }

        .header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
            user-select: none;

            .icon {
                width: 24px;
                height: 24px;
                fill: #fff;
                fill-rule: evenodd;
            }

            .title {
                flex: 1;
                font-size: 18px;
                font-weight: 600;
            }

            .close {
                position: relative;
                width: 24px;
                height: 24px;
                fill: #fff;
                fill-rule: evenodd;
                cursor: pointer;
            }
        }

        #body {
            margin-top: 5px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 20px;

            .message {
                flex: 1;
                font-size: 14px;
                line-height: 20px;
                font-weight: 300;
            }

            &:hover {
                cursor: n-resize;
                background-color: rgba(0, 0, 0, 0.1);
            }

            &.expanded {
                overflow: auto;
                height: auto;
                white-space: normal;
            }
        }
  `;
}