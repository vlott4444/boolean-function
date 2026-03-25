export class SubjectDetailComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card" style="width: 500px; border: none; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

                <div class="card-body">
                    <h5 class="card-title" style="font-family: 'Rubik', sans-serif; font-weight: 600; color: #001A36;">${data.title}</h5>
                    <p class="card-text" style="font-family: 'Roboto', sans-serif; color: #4A5568;">${data.text}</p>

                </div>
            </div>
        `;
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}
