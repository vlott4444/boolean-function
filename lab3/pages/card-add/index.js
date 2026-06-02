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

    async saveCard() {
        const title = document.getElementById('card-title')?.value;
        const text = document.getElementById('card-text')?.value;
        const icon = document.getElementById('card-icon')?.value;

        if (!title || !text) {
            alert('Заполните заголовок и текст');
            return;
        }

        const postData = {
            title: title,
            text: text,
            src: icon || 'images/default.png'
        };

        console.log('Отправляемые данные:', postData);

        try {
            const { data, status } = await ajax.post(stockUrls.createStock(), postData);
            if (status === 201 || status === 200) {
                alert('Карточка добавлена!');
                const mainPage = new MainPage(this.parent);
                mainPage.render();
            } else {
                console.error('Ошибка при добавлении, статус:', status);
                alert(`Ошибка ${status}: не удалось добавить карточку`);
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка при добавлении карточки');
        }
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
