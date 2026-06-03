export class CardFormComponent {
    constructor(parent, data = null) {
        this.parent = parent;
        this.data = data;
    }

    getHTML() {
        const title = this.data?.title || '';
        const text = this.data?.text || '';
        const icon = this.data?.src || this.data?.icon || '';

        return `
            <div class="card mt-4">
                <div class="card-body">
                    <h5 class="card-title">${this.data ? 'Редактировать карточку' : 'Добавить новую карточку'}</h5>

                    <div class="mb-3">
                        <label for="card-title" class="form-label">Заголовок</label>
                        <input type="text" class="form-control" id="card-title" value="${title}" required>
                    </div>

                    <div class="mb-3">
                        <label for="card-text" class="form-label">Текст</label>
                        <textarea class="form-control" id="card-text" rows="3" required>${text}</textarea>
                    </div>

                    <div class="mb-3">
                        <label for="card-icon" class="form-label">URL иконки</label>
                        <input type="text" class="form-control" id="card-icon" value="${icon}" placeholder="images/calculators.png">
                    </div>

                    <button id="save-card-btn" class="btn" style="background-color: #DB3F59; color: white; border: none;">Сохранить</button>
                </div>
            </div>
        `;
    }

    render(saveHandler) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const saveBtn = document.getElementById('save-card-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', saveHandler);
        }
    }
}
