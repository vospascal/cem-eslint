import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'


type InputSize = "medium" | "large";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 * 
 * @aria-rules label - please supply a label attribute for accessibility
 * @aria-rules labelledby - please supply a labelledby attribute for accessibility
 * 
 * @deprecated-attribute size - this attribute is deprecated
 * @deprecated - this element is deprecated
 * 
 */
@customElement('my-element')
export class MyElement extends LitElement {

  static styles = [
    css`
        :host {
            display: block;
            color:#5865f2;
        }
    `
  ]

  /** Size of the text input, either medium or large. */
  @property({ reflect: true }) size: InputSize = "large";


  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0

  render() {
    return html`
      <slot></slot>
      <div class="card">
        <button @click=${this._onClick} part="button">
          count is ${this.count}
        </button>
      </div>
    `
  }

  private _onClick() {
    this.count++
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
