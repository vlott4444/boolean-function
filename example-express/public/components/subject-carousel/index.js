// components/subject-carousel/index.js
export class SubjectCarouselComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(data, onDetailClick, onEditClick, onDeleteClick) {
        console.log('Данные для отображения:', data);

        const cards = data.map((item) => {
            // Обработка пути к изображению
            const imagePath = item.icon || item.src || 'images/default.png';

            return `
                <div class="col-md-4 col-sm-6 mb-4">
                    <div class="card h-100 text-center" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: transform 0.3s ease;">
                        <div class="card-body" style="padding: 24px;">
                            <div style="display: flex; justify-content: center; margin-bottom: 20px;">
                                <img src="${imagePath}"
                                     style="width: 120px; height: 120px; object-fit: contain;"
                                     onerror="this.onerror=null; this.src='/images/default.png'">
                            </div>
                            <h3 class="card-title" style="font-family: 'Rubik', sans-serif; font-weight: 600; color: #001A36; margin-bottom: 15px; font-size: 18px;">${this.escapeHtml(item.title)}</h3>
                            <p class="card-text" style="font-family: 'Roboto', sans-serif; color: #4A5568; font-size: 14px; line-height: 1.5;">${this.escapeHtml(item.text)}</p>
                            <div class="d-flex flex-wrap gap-2 justify-content-center mt-3">
                                <button class="btn detail-btn" data-id="${item.id}" style="background-color: #DB3F59; border: none; border-radius: 4px; padding: 6px 16px; font-family: 'Roboto', sans-serif; font-weight: 500; color: white; cursor: pointer; font-size: 13px;">Подробнее</button>
                                <button class="btn edit-btn" data-id="${item.id}" style="background-color: #DB3F59; border: none; border-radius: 4px; padding: 6px 16px; font-family: 'Roboto', sans-serif; font-weight: 500; color: white; cursor: pointer; font-size: 13px;">Редактировать</button>
                                <button class="btn delete-btn" data-id="${item.id}" style="background-color: #DB3F59; border: none; border-radius: 4px; padding: 6px 16px; font-family: 'Roboto', sans-serif; font-weight: 500; color: white; cursor: pointer; font-size: 13px;">Удалить</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        const html = `
            <div class="container mt-4">
                <div class="row">
                    ${cards}
                </div>
            </div>
        `;

        this.parent.innerHTML = html;

        // Добавляем эффект при наведении на карточку
        const cardsElements = document.querySelectorAll('.card');
        cardsElements.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });

        // Обработчики для кнопок "Подробнее"
        const detailButtons = document.querySelectorAll('.detail-btn');
        console.log('Найдено кнопок "Подробнее":', detailButtons.length);
        detailButtons.forEach(button => {
            button.removeEventListener('click', onDetailClick);
            button.addEventListener('click', onDetailClick);
        });

        // Обработчики для кнопок "Редактировать"
        const editButtons = document.querySelectorAll('.edit-btn');
        console.log('Найдено кнопок "Редактировать":', editButtons.length);
        editButtons.forEach(button => {
            button.removeEventListener('click', onEditClick);
            button.addEventListener('click', onEditClick);
        });

        // Обработчики для кнопок "Удалить"
        const deleteButtons = document.querySelectorAll('.delete-btn');
        console.log('Найдено кнопок "Удалить":', deleteButtons.length);
        deleteButtons.forEach(button => {
            button.removeEventListener('click', onDeleteClick);
            button.addEventListener('click', onDeleteClick);
        });
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
}
