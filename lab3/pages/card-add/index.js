import { CardFormComponent } from '../../components/card-form/index.js';
import { BackButtonComponent } from '../../components/back-button/index.js';
import { MainPage } from '../main/index.js';
import { ajax } from '../../modules/ajax.js';
import { stockUrls } from '../../modules/stockUrls.js';

export class CardAddPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('card-add-page');
    }

    getHTML() {
        return `<div id="card-add-page" class="container mt-4"></div>`;
    }

    saveCard() {
        const title = document.getElementById('card-title')?.value;
        const text = document.getElementById('card-text')?.value;
        const icon = document.getElementById('card-icon')?.value;

        if (!title || !text) {
            alert('Заполните заголовок и текст');
            return;
        }

        // Сформируем объект с данными в том виде, который ожидает бэкенд
        // Вариант 1: если бэкенд ждёт title, text, icon (как в твоём фронте)
        const postData = {
        title: title,
        text: text,
        src: icon   // поле из формы 'icon' отправляем как 'src'
        };

        // Вариант 2: если бэкенд ждёт name, description, image (раскомментировать и закомментировать вариант 1)
        // let postData = { name: title, description: text, image: icon };

        // Вариант 3: если бэкенд ждёт name, description, imageUrl и т.п. — настрой по своему образцу

        console.log('Отправляемые данные:', postData); // отладка в консоли браузера

        ajax.post(stockUrls.createStock(), postData, (data, status) => {
            if (status === 201 || status === 200) { // 201 Created или 200 OK
                alert('Карточка добавлена!');
                const mainPage = new MainPage(this.parent);
                mainPage.render();
            } else {
                console.error('Ошибка при добавлении, статус:', status, 'ответ сервера:', data);
                alert(`Ошибка ${status}: ${data?.error || 'не удалось добавить карточку'}`);
            }
        });
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        const root = this.pageRoot;
        const backButton = new BackButtonComponent(root);
        backButton.render(() => {
            const mainPage = new MainPage(this.parent);
            mainPage.render();
        });
        const form = new CardFormComponent(root);
        form.render(this.saveCard.bind(this));
    }
}
