import {SubjectCarouselComponent} from "../../components/subject-carousel/index.js";
import {SubjectPage} from "../subject/index.js";
import { ajax } from '../../modules/ajax.js';
import { stockUrls } from '../../modules/stockUrls.js';

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = [];
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div class="container mt-4">
                <button id="add-card-btn" class="btn btn-primary mb-3" style="background-color: #DB3F59; border: none;">+ Добавить карточку</button>
                <div id="main-page"></div>
            </div>
        `;
    }

    // Используем коллбек вместо await
    getData() {
        ajax.get(stockUrls.getStocks(), (data, status) => {
            console.log('Статус:', status, 'Данные:', data);
            if (status === 200 && Array.isArray(data)) {
                this.data = data;
            } else {
                console.error('Ошибка загрузки или данные не массив, используем локальные');
                this.useLocalData();
            }
            this.renderCarousel();
        });
    }

    useLocalData() {
        this.data = [
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

    renderCarousel() {
        if (!this.data || this.data.length === 0) {
            console.error('Нет данных для отображения');
            return;
        }
        const carousel = new SubjectCarouselComponent(this.pageRoot);
        // Передаём два обработчика: для кнопки "Подробнее" и "Изменить"
        carousel.render(this.data, this.clickCard.bind(this), this.clickEdit.bind(this));
    }

    getSubjectById(id) {
        const item = this.data.find(item => item.id == id);
        if (item) {
            return {
                title: item.title,
                text: item.text,
                teacher: "Symbolab Team",
                icon: item.icon
            };
        }
        return {
            title: "Не найдено",
            text: "Данные не загружены",
            teacher: "",
            icon: ""
        };
    }

    clickCard(e) {
    const cardId = e.target.dataset.id;
    const subjectPage = new SubjectPage(this.parent, cardId); // ← передаём id
    subjectPage.render();
    }

    clickEdit(e) {
        const cardId = e.target.dataset.id;
        // Динамический импорт страницы редактирования (если она у тебя есть)
        import('../card-edit/index.js').then(module => {
            const editPage = new module.CardEditPage(this.parent, cardId);
            editPage.render();
        }).catch(err => {
            console.error('Страница редактирования не найдена', err);
        });
    }

    clickAdd() {
        import('../card-add/index.js').then(module => {
            const addPage = new module.CardAddPage(this.parent);
            addPage.render();
        }).catch(err => {
            console.error('Страница добавления не найдена', err);
        });
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const addBtn = document.getElementById('add-card-btn');
        if (addBtn) {
            addBtn.onclick = this.clickAdd.bind(this);
        }

        this.getData();
    }
}
