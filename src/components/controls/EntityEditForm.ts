import { html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "@iyulab/u-components/components/form";
import { UModalContent } from "@iyulab/u-components/components/modal";

import { IEntityHandler, IResultValue } from "../../data";

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

  handler: IEntityHandler;
  fields: any;

  @property() title: string = "";

  @state() errors?: string[];
  @state() isReady: boolean = false;
  @state() isBusy: boolean = false;

  constructor(props: IEntityEditFormProps) {
    super();

    if (props.title) {
      this.title = props.title;
      this.label = this.title;
    }
    this.handler = props.handler;

    this.init();
  }

  async init() {
    await this.handler.readyAsync();
    if (this.title.isNullOrEmpty()) {
      this.title = this.handler.label ?? "";
      this.label = this.title;
    }

    this.fields = this.handler.fields;
    this.isReady = true;
  }

  render() {
    if (!this.isReady || this.fields == null) {
      return html`<busy-indicator></busy-indicator>`;
    }
    // console.log("Field Meta", this.fields);
    // console.log("Data", this.handler.data);
    return html`
      <u-form
        .meta=${this.fields}
        .context=${this.handler.data}
        .onSubmit=${async () => {
          const r = await this.handler.saveAsync();
          if (r.success == false) {
            if (r.value) {
              throw new Error(r.value);
            } else if (r.errors) {
              this.errors = r.errors;
              throw new Error(r.errors.join("\n"));
            }
          }
        }}
        @submit=${this.ok}
        @cancel=${this.cancel}
      ></u-form>
    `;
  }
  
  async ok(e:any) {
    this.requestConfirm(e.detail);
    this.close({ success: true, value: this.handler.data });
  }

  cancel() {
    this.requestCancle("cancel");
    this.close({ success: false });
  }

  close(result: IResultValue) {
    this.dispatchEvent(
      new CustomEvent("close", {
        detail: result,
        bubbles: true,
        composed: true,
      })
    );
  }
}