import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import litLogo from './assets/lit.svg'
import viteLogo from '/vite.svg'


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
   * Copy for the read the docs hint.
   */
  @property()
  docsHint = 'Click on the Vite and Lit logos to learn more'

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0

  render() {
    return html`
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src=${viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://lit.dev" target="_blank">
          <img src=${litLogo} class="logo lit" alt="Lit logo" />
        </a>
      </div>
      <slot></slot>
      <div class="card">
        <button @click=${this._onClick} part="button">
          count is ${this.count}
        </button>
      </div>
      <p class="read-the-docs">${this.docsHint}</p>
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
