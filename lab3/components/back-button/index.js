export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document.getElementById("back-button").addEventListener("click", listener);
    }

    getHTML() {
        return `<button id="back-button" class="btn" style="background-color: #DB3F59; border: none; border-radius: 4px; padding: 8px 20px; color: white; font-family: 'Roboto', sans-serif; font-weight: 500; margin-bottom: 20px;">← Назад</button>`;
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}
