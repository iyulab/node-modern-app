import { html, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";

import type { IEntityHandler, IResultValue } from "../../data";
import type { UForm } from "@iyulab/u-components/components/form";
import { UModalContent } from "@iyulab/u-components/components/modal/UModalContent";
import { UModernApp } from "../../core/UModernApp";
import "@iyulab/u-components/components/form";

import baseStyle from "../../styles/tailwind.css?inline";

export interface IEntityEditFormProps {
  title?: string;
  handler: IEntityHandler;
}

@customElement("entity-edit-form")
export class EntityEditForm
  extends UModalContent
  implements IEntityEditFormProps
{
  static styles = [unsafeCSS(baseStyle)];

  @state() isReady: boolean = false;
  @state() handler: IEntityHandler;
  @state() fields: any;

  constructor(props: IEntityEditFormProps) {
    super();
    this.label = props.title;
    this.handler = props.handler;
    this.initAsync();
  }

  render() {
    if (!this.isReady || !this.fields) {
      return html`<busy-indicator></busy-indicator>`;
    }
    return html`
      <u-form
        .meta=${this.fields}
        .context=${this.handler.data}
        @submit=${this.ok}
        @cancel=${this.cancel}
      ></u-form>
      <slot name="footer"></slot>
    `;
  }

  public async initAsync() {
    await this.handler.readyAsync();
    this.fields = this.handler.fields;
    this.isReady = true;
  }

  private async ok(event: CustomEvent) {
    const form = event.target as UForm;
    try {
      form.loading = true;
      const r = await this.handler.saveAsync();
      if (r.success) {
        this.requestConfirm(event.detail);
        this.close({ success: true, value: this.handler.data });  
      } else {
        const message = r.value ?? r.errors?.join("\n") ?? "Unknown error";
        UModernApp.error(message);
      }
    } catch (error: any) {
      UModernApp.error(error.message);
    } finally {
      form.loading = false;
    }
  }

  private cancel() {
    this.requestCancel("cancel");
    this.close({ success: false });
  }

  private close(result: IResultValue) {
    this.dispatchEvent(new CustomEvent("close", {
      detail: result,
      bubbles: true,
      composed: true,
    }));
  }
}
