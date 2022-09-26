const template = document.createElement('template');
template.innerHTML = `
<button class="btn"></button>`;

class CreateNote extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector(".btn").innerText = this.getAttribute("text");
    // this.shadowRoot.querySelector('.details > p:nth-of-type(1)').innerText = this.getAttribute('ID');
    // this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
  }

  connectedCallback() {
    this.button = this.getAttribute("text");
    // this.id = this.getAttribute('ID');
    this.render();
  }

  render() {
    this.button;
    // this.id;
    // this.job;
    // this.email;
    // this.phone;
  }
}
window.customElements.define('createNote', CreateNote);
