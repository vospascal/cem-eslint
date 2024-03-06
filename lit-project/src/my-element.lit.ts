import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
export type CharacterKind = 'c-3po'|'r2d2'|'yoda'|'jedi'|'sith'|'bb8';
type CharacterSize = "medium" | "large";

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

  /** Size of the starwars character. */
  @property({ reflect: true }) size: CharacterSize = "large";


  /** Kind of the starwars character. */
  @property({ reflect: true }) kind: CharacterKind = "sith";
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
