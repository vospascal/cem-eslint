import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
type CharacterSpecies = 'human'|'droid'|'wookie'|'ewok'

/**
 * 
 * @aria-rules label - please supply a label attribute for accessibility
 * @aria-rules labelledby - please supply a labelledby attribute for accessibility
 * 
 * @deprecated - this element is deprecated
 * 
 */
@customElement('your-element')
export class YourElement extends LitElement {

  static styles = [
    css`
        :host {
            display: block;
            color:#5865f2;
        }
    `
  ]

  /** Species of the starwars character. */
  @property({ reflect: true }) species: CharacterSpecies = "human";

  render() {
    return html`
      <slot></slot>
      <div class="card">
        species: ${this.species}
      </div>
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'your-element': YourElement
  }
}
