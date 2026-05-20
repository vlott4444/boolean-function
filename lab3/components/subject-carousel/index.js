export class SubjectCarouselComponent {
    constructor(parent) {
        this.parent = parent;
        this.carousel = null; // Сохраняем экземпляр
    }

    render(data, listener) {
    const slides = data.map((item, i) => {
        const active = i === 0 ? 'active' : '';
        return `
            <div class="carousel-item ${active}">
                <div class="d-flex justify-content-center align-items-center" style="min-height: 550px;">
                    <div class="text-center">
                        <div style="display: flex; justify-content: center; margin-bottom: 20px;">
                            <img src="${item.icon}" style="width: 200px; height: 200px; object-fit: contain;">
                        </div>
                        <h3 style="font-family: 'Rubik', sans-serif; font-weight: 600; color: #001A36; margin-bottom: 15px;">${item.title}</h3>
                        <p style="font-family: 'Roboto', sans-serif; color: #4A5568; max-width: 300px; margin: 0 auto; font-size: 14px;">${item.text}</p>
                        <button class="btn btn-primary subject-btn mt-3" data-id="${item.id}" style="background-color: #DB3F59; border: none; border-radius: 4px; padding: 8px 24px; font-family: 'Roboto', sans-serif; font-weight: 500;">Подробнее</button>
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

    // ИНИЦИАЛИЗАЦИЯ КАРУСЕЛИ
    const carouselElement = document.getElementById('myCarousel');
    if (carouselElement) {
        if (typeof bootstrap !== 'undefined') {
            new bootstrap.Carousel(carouselElement, {
                interval: 3000,
                wrap: true
            });
            console.log('Карусель запущена! 🎠');
        } else if (typeof window.bootstrap !== 'undefined') {
            new window.bootstrap.Carousel(carouselElement, {
                interval: 3000,
                wrap: true
            });
            console.log('Карусель запущена (через window)! 🎠');
        } else {
            console.error('Bootstrap не найден! Проверьте подключение скрипта в index.html');
        }
    } else {
        console.error('Элемент #myCarousel не найден в DOM');
    }

    // Обработчики кнопок
    const buttons = document.querySelectorAll('.subject-btn');
    buttons.forEach(button => {
        button.addEventListener('click', listener);
    });
    }
}
