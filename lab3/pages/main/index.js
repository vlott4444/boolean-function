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

    // Загружает данные с бэкенда и рисует карусель
    getData() {
        ajax.get(stockUrls.getStocks(), (data, status) => {
            if (status === 200 && data) {
                // Данные с сервера получены — рисуем карусель
                this.renderCarousel(data);
            } else {
                // Если сервер не отвечает — используем локальные данные
                console.error('Ошибка загрузки, статус:', status);
                this.renderCarousel(this.getLocalData());
            }
        });
    }
    renderData(items) {
    const carousel = new SubjectCarouselComponent(this.pageRoot);
    carousel.render(items, this.clickCard.bind(this));
    }

    // Локальные данные (если сервер не работает)
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

    // Рисует карусель с переданными данными
    renderCarousel(data) {
        const carousel = new SubjectCarouselComponent(this.pageRoot);
        carousel.render(data, this.clickCard.bind(this));
    }

    getSubjectById(id) {
        const subjects = {
            1: {
                title: "Значение булевой функции",
                text: "Введите логическое выражение с использованием логичесих операторов и входных значений множества {0, 1}.",
                teacher: "Symbolab Team",
                icon: "images/calculators.png"
            },
            2: {
                title: "Логическое выражение из булевой функции",
                text: "Введите значения булевой функции для составления исходного выражения.",
                teacher: "Math Reference",
                icon: "images/cheat-sheets.png"
            },
            3: {
                title: "Минимизация выражений",
                text: "Введите логическое выражение с использованием логичесих операторов и входных значений множества {0, 1}.",
                teacher: "Study Together",
                icon: "images/groups.png"
            }
        };
        return subjects[id];
    }

    clickCard(e) {
    const cardId = e.target.dataset.id;
    const subjectPage = new SubjectPage(this.parent, cardId);  // ← только id
    subjectPage.render();
    }

    render() {
    this.parent.innerHTML = '';
    const html = this.getHTML();
    this.parent.insertAdjacentHTML('beforeend', html);

    this.getData();
}
}
