import {SubjectCarouselComponent} from "../../components/subject-carousel/index.js";
import {SubjectPage} from "../subject/index.js";
import { ajax } from '../../modules/ajax.js';
import { stockUrls } from '../../modules/stockUrls.js';

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `<div id="main-page"></div>`;
    }

    // ИСПРАВЛЕНО: теперь async/await вместо callback
    async getData() {
        try {
            const result = await ajax.get(stockUrls.getStocks());
            // Убедись, что result существует
            if (result && result.status === 200 && result.data) {
                this.renderCarousel(result.data);
            } else {
                console.error('Некорректный ответ от сервера:', result);
                this.renderCarousel(this.getLocalData());
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
            this.renderCarousel(this.getLocalData());
        }
    }

    getLocalData() {
        return [
            {
                id: 1,
                icon: "images/calculators.png",
                title: "Найти значение булевой функции",
                text: "Множество значений функции при переменных и константных входных значениях."
            },
            {
                id: 2,
                icon: "images/cheat-sheets.png",
                title: "Логическое выражение из булевой функции",
                text: "Составление исходного выражения из булевой функции."
            },
            {
                id: 3,
                icon: "images/groups.png",
                title: "Минимизация выражений",
                text: "Минимальное логическое выражение из исходного."
            }
        ];
    }

    renderCarousel(data) {
        const carousel = new SubjectCarouselComponent(this.pageRoot);
        carousel.render(data, this.clickCard.bind(this));
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const subjectPage = new SubjectPage(this.parent, cardId);
        subjectPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.getData(); // теперь это async функция
    }
}
