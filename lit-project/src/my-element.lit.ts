import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
export type CharacterKind = 'c-3po'|'r2d2'|'yoda'|'jedi'|'sith'|'bb8';
type CharacterSize = "medium" | "large";

/**
 * 
 * @aria-rules label - please supply a label attribute for accessibility
 * @aria-rules labelledby - please supply a labelledby attribute for accessibility
 * 
 * @deprecated-attribute size - this attribute is deprecated
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
  @property({ reflect: true }) character: CharacterKind = "sith";


  render() {
    return html`
      <slot></slot>
      <div class="card">
        ${this.size}
      </div>
      <div class="card">
        ${this.character}
      </div>
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
