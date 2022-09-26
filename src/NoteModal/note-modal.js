const template = document.createElement('template');
template.innerHTML = 
`
  <style>
      @import url("https://fonts.googleapis.com/css2?family=Material+Icons");
      *{
          box-sizing: border-box;
          font-family: Arial, Helvetica, sans-serif;
      }
      .note-existing {
          background-color: white;
          display: flex;
          flex-direction: column;
          border: 0.5px solid black;
          padding: 5px;
          border-radius: 5px;
          width: 500px;   
          box-shadow: 0 3px 5px rgb(0 0 0 / 20%);
      }
      [contentEditable]:empty:not(:focus):before {
        content: attr(data-placeholder)
      }
      .note-header {
          padding: 10px;
          font-size: 22px;
          font-family: "Google Sans",Arial,sans-serif;
          font-size: 1.375rem;
          font-weight: 400;
          letter-spacing: 0;
          line-height: 1.75rem;
          border:none;
          outline: none;
          overflow: auto;
      }
      .note-body {
          padding: 5px 10px 5px;
          letter-spacing: .00625em;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5rem;
          border: none;
          outline: none;
          overflow: auto;
      }
      .note-last-updated {
          margin-left: auto;
          padding: 0 10px 0;
          font-size: 0.75rem;
          font-weight: 400; 
      }
      .note-buttons{
          display:flex;
          flex-direction: row;
          padding: 5px 10px 0;
      }
      .note-buttons>div span{
        cursor:pointer;
      }    
      button {
          padding: 5px 20px;
      }
      button.close {
          margin-left: auto; 
          border: 2px solid transparent;
          border-radius: 5px;  
          background-color: white;
          font-size: 14px;
      }
      button.close:hover {
          background-color: revert;
      }
  </style>
  
  <div class="note-existing">
    <div class="note-header" data-placeholder="Title" contentEditable></div>
    <div class="note-body" data-placeholder="Enter the note here .." contentEditable> </div>
    <div class="note-last-updated"> Edited 27:29m </div>
    <div class="note-buttons">
      <div style="display: flex; align-items: center;">
        <span class="material-icons" id="make-copy" style="margin-right: 20px;">content_copy</span>
        <span class="material-icons "id ="make-bold">format_bold</span>
        <span class ="material-icons" id = "make-italics"> format_italic </span>
        <span class = "material-icons" id = "make-underlined"> format_underlined </span>
        <span class="material-icons" style="margin-left: 5px;">delete</span> 
      </div>
      <button class="close">Close</button>
    </div>
</div>

`;

class NoteModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('.note-header').textContent = this.getAttribute('header');
    this.shadowRoot.querySelector('.note-body').textContent = this.getAttribute('body');
  }
  
  connectedCallback() {
    this.shadowRoot.querySelector(".note-buttons #make-copy").addEventListener("click", this.makeCopy.bind(this));
    this.shadowRoot.querySelector(".note-buttons #make-bold").addEventListener("click", this.makeBold.bind(this));
    this.shadowRoot.querySelector(".note-buttons #make-italics").addEventListener("click", this.makeItalics.bind(this));
    this.shadowRoot.querySelector(".note-buttons #make-underlined").addEventListener("click", this.makeUnderlined.bind(this));
    console.log('connected!', this, window.getSelection().toString());
    // this.header = this.getAttribute("header");
    // this.body = this.getAttribute("body");
    // this.render();

  }

  makeCopy() {
    let copyNoteHeader = this.shadowRoot.querySelector(".note-header");
    let copyNoteBody = this.shadowRoot.querySelector(".note-body");
    let copyText = `${copyNoteHeader.textContent}` + `\n` + `${copyNoteBody.textContent}`;
    // copyNoteBody.select();
    // copyNoteBody.setSelectionRange(0, 99999);
    // let selectedText = window.getSelection().toString();
    navigator.clipboard.writeText(copyText);
  }
  
  makeBold() { 

    let selection = this.shadowRoot.querySelector(".note-body");
    selection.focus(); // make it the active element so the command is applied to it
    this.parentNode.parentNode.parentNode.execCommand('bold', false, null);
    // if (selection.style.fontWeight == "bolder") {
    //   selection.style.fontWeight = "normal";
    // } else {
    //   selection.style.fontWeight = "bolder";
    // }
    console.log(this.parentNode.parentNode.parentNode, window.getSelection());

    // const userSelection = window.getSelection();
    // const selectedTextRange = userSelection.getRangeAt(0);
    // selectedTextRange.surroundContents(strongElement);
  }
  makeItalics() {
    let text = this.shadowRoot.querySelector(".note-body").innerText;
    let selection = globalThis.getSelection().toString();
    let italicText = `<em>${selection}</em>`;
    this.shadowRoot.querySelector(".note-body").innerText = text.replace(selection, italicText);
  }
  makeUnderlined() {
    let text = this.shadowRoot.querySelector(".note-body").innerText;
    let selection = globalThis.getSelection();
    let underlineText = "<u>" + selection + "</u>";
    this.shadowRoot.querySelector(".note-body").innerText = text.replace(selection, underlineText);
  }

  render() {
    this.header;
    this.body;
  }
}
window.customElements.define('note-modal', NoteModal);
