export class SubjectCarouselComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(data, onDetailClick, onEditClick, onDeleteClick) {
        console.log('Данные для карусели:', data);

        const slides = data.map((item, i) => {
            const active = i === 0 ? 'active' : '';
            // Обработка пути к изображению
            const imagePath = item.icon || item.src || 'images/default.png';

            return `
                <div class="carousel-item ${active}">
                    <div class="d-flex justify-content-center align-items-center" style="min-height: 550px;">
                        <div class="text-center">
                            <div style="display: flex; justify-content: center; margin-bottom: 20px;">
                                <img src="${imagePath}"
                                     style="width: 200px; height: 200px; object-fit: contain;"
                                     onerror="this.onerror=null; this.src='/images/default.png'">
                            </div>
                            <h3 style="font-family: 'Rubik', sans-serif; font-weight: 600; color: #001A36; margin-bottom: 15px;">${this.escapeHtml(item.title)}</h3>
                            <p style="font-family: 'Roboto', sans-serif; color: #4A5568; max-width: 300px; margin: 0 auto; font-size: 14px;">${this.escapeHtml(item.text)}</p>
                            <div class="d-flex gap-2 justify-content-center">
                                <button class="btn detail-btn mt-3" data-id="${item.id}" style="background-color: #DB3F59; border: none; border-radius: 4px; padding: 8px 24px; font-family: 'Roboto', sans-serif; font-weight: 500; color: white; cursor: pointer;">Подробнее</button>
                                <button class="btn edit-btn mt-3" data-id="${item.id}" style="background-color: #DB3F59; border: none; border-radius: 4px; padding: 8px 24px; font-family: 'Roboto', sans-serif; font-weight: 500; color: white; cursor: pointer;">Редактировать</button>
                                <button class="btn delete-btn mt-3" data-id="${item.id}" style="background-color: #DB3F59; border: none; border-radius: 4px; padding: 8px 24px; font-family: 'Roboto', sans-serif; font-weight: 500; color: white; cursor: pointer;">Удалить</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        const html = `
            <div id="myCarousel" class="carousel slide" data-bs-ride="carousel" style="background-color: #f9f9f9;">
                <div class="carousel-inner">
                    ${slides}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev" style="width: 5%;">
                    <span class="carousel-control-prev-icon" style="background-color: #DB3F59; border-radius: 50%; padding: 20px;"></span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next" style="width: 5%;">
                    <span class="carousel-control-next-icon" style="background-color: #DB3F59; border-radius: 50%; padding: 20px;"></span>
                </button>
            </div>
        `;

        this.parent.innerHTML = html;

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
