import { CardFormComponent } from '../../components/card-form/index.js';
import { BackButtonComponent } from '../../components/back-button/index.js';
import { MainPage } from '../main/index.js';
import { ajax } from '../../modules/ajax.js';
import { functionUrls } from '../../modules/functionUrls.js';

export class CardEditPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.cardData = null;
    }

    get pageRoot() {
        return document.getElementById('card-edit-page');
    }

    getHTML() {
        return `<div id="card-edit-page" class="container mt-4"></div>`;
    }

    async loadData() {
        try {
            const { data, status } = await ajax.get(functionUrls.getFunctionById(this.id));
            if (status === 200 && data) {
                this.cardData = data;
                this.renderForm();
            } else {
                console.error('Ошибка загрузки карточки');
                alert('Не удалось загрузить карточку');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка при загрузке карточки');
        }
    }

    async saveCard() {
        const title = document.getElementById('card-title')?.value;
        const text = document.getElementById('card-text')?.value;
        const icon = document.getElementById('card-icon')?.value;

        if (!title || !text) {
            alert('Заполните заголовок и текст');
            return;
        }

        try {
            const { data, status } = await ajax.patch(functionUrls.updateFunctionById(this.id), {
                title,
                text,
                src: icon
            });
            if (status === 200) {
                alert('Карточка обновлена!');
                const mainPage = new MainPage(this.parent);
                mainPage.render();
            } else {
                console.error('Ошибка при обновлении:', status);
                alert('Ошибка при обновлении карточки');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка при обновлении карточки');
        }
    }

    renderForm() {
        const root = this.pageRoot;
        if (!root) {
            console.error('pageRoot не найден');
            return;
        }

        root.innerHTML = '';

        const backButton = new BackButtonComponent(root);
        backButton.render(() => {
            const mainPage = new MainPage(this.parent);
            mainPage.render();
        });

        const form = new CardFormComponent(root, this.cardData);
        form.render(this.saveCard.bind(this));
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.loadData();
    }
}
