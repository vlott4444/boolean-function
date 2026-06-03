import { ajax } from '../../modules/ajax.js';
import { functionUrls } from '../../modules/functionUrls.js';
import { MainPage } from '../../pages/main/index.js';

export class SubjectDetailComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card" style="width: 500px; border: none; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                <div class="card-body">
                    <h5 class="card-title" style="font-family: 'Rubik', sans-serif; font-weight: 600; color: #001A36;">${this.escapeHtml(data.title)}</h5>
                    <p class="card-text" style="font-family: 'Roboto', sans-serif; color: #4A5568;">${this.escapeHtml(data.text)}</p>
                </div>
            </div>
        `;
    }

    escapeHtml(str) {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    render(data, parentInstance) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}
