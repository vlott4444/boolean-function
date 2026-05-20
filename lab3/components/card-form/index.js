export class CardFormComponent {
    constructor(parent, cardData = null) {
        this.parent = parent;
        this.cardData = cardData;
    }

    getHTML() {
        const isEdit = !!this.cardData;
        const title = isEdit ? this.cardData.title : '';
        const text = isEdit ? this.cardData.text : '';
        const icon = isEdit ? this.cardData.icon : '';

        return `
            <div class="card p-4" style="max-width: 500px; margin: 0 auto;">
                <h2 class="mb-4">${isEdit ? 'Редактировать карточку' : 'Добавить карточку'}</h2>
                <div class="mb-3">
                    <label class="form-label">Заголовок</label>
                    <input type="text" id="card-title" class="form-control" value="${title}">
                </div>
                <div class="mb-3">
                    <label class="form-label">Текст</label>
                    <textarea id="card-text" class="form-control" rows="4">${text}</textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">URL картинки</label>
                    <input type="text" id="card-icon" class="form-control" value="${icon}">
                </div>
                <button id="save-button" class="btn btn-primary" style="background-color: #DB3F59; border: none;">Сохранить</button>
            </div>
        `;
    }

    render(listener) {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        const saveBtn = document.getElementById('save-button');
        if (saveBtn) {
            saveBtn.addEventListener('click', listener);
        }
    }
}
