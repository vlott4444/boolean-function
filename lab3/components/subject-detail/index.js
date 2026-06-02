import { ajax } from '../../modules/ajax.js';
import { functionUrls } from '../../modules/functionUrls.js';  // ← ИСПРАВЛЕНО
import { MainPage } from '../../pages/main/index.js';
import { CardEditPage } from '../../pages/card-edit/index.js';

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
                    <button class="btn btn-danger delete-btn" style="margin-right: 10px;">Удалить</button>
                    <button class="btn btn-warning edit-btn">Редактировать</button>
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

    async handleDelete(id, parent) {
        if (confirm('Вы уверены, что хотите удалить эту карточку?')) {
            try {
                const { status } = await ajax.delete(functionUrls.deleteFunctionById(id));
                if (status === 204 || status === 200) {
                    alert('Карточка удалена!');
                    const mainPage = new MainPage(parent);
                    mainPage.render();
                } else {
                    alert('Ошибка при удалении');
                }
            } catch (error) {
                console.error('Ошибка:', error);
                alert('Ошибка при удалении карточки');
            }
        }
    }

    handleEdit(id, parent) {
        const editPage = new CardEditPage(parent, id);
        editPage.render();
    }

    render(data, parentInstance) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);

        const deleteBtn = document.querySelector('.delete-btn');
        const editBtn = document.querySelector('.edit-btn');

        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                this.handleDelete(data.id, parentInstance);
            });
        }
        if (editBtn) {
            editBtn.addEventListener('click', () => {
                this.handleEdit(data.id, parentInstance);
            });
        }
    }
}
