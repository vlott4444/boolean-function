import {SubjectCarouselComponent} from "../../components/subject-carousel/index.js";
import {SubjectPage} from "../subject/index.js";
import {CardEditPage} from "../card-edit/index.js";
import {CardAddPage} from "../card-add/index.js";
import {CardDeletePage} from "../card-delete/index.js";
import { ajax } from '../../modules/ajax.js';
import { functionUrls } from '../../modules/functionUrls.js';  // ← ДОЛЖНО БЫТЬ ТАК

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.allData = [];
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div id="main-page">
                <div class="container mt-4">
                    <div class="row mb-4">
                        <div class="col-md-8">
                            <input type="text" id="search-input" class="form-control" placeholder="Поиск по названию...">
                        </div>
                        <div class="col-md-4">
                            <button id="add-card-btn" class="btn w-100" style="background-color: #DB3F59; border: none; color: white; transition: all 0.3s ease;">+ Добавить карточку</button>
                        </div>
                    </div>
                    <div id="carousel-container"></div>
                </div>
            </div>
        `;
    }

    async getData() {
        try {
            const result = await ajax.get(functionUrls.getFunctions());  // ← ИСПРАВЛЕНО
            if (result && result.status === 200 && result.data) {
                this.allData = result.data;
                this.renderCarousel(this.allData);
            } else {
                console.error('Некорректный ответ от сервера:', result);
                this.allData = this.getLocalData();
                this.renderCarousel(this.allData);
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
            this.allData = this.getLocalData();
            this.renderCarousel(this.allData);
        }
    }

    searchCards(searchTerm) {
        if (!searchTerm) {
            this.renderCarousel(this.allData);
            return;
        }
        const filtered = this.allData.filter(card =>
            card.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.renderCarousel(filtered);
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
        const container = document.getElementById('carousel-container');
        if (!container) return;

        const carousel = new SubjectCarouselComponent(container);
        carousel.render(data, this.clickDetail.bind(this), this.clickEdit.bind(this), this.clickDelete.bind(this));
    }

    clickDetail(e) {
        const cardId = e.target.dataset.id;
        if (cardId) {
            const subjectPage = new SubjectPage(this.parent, cardId);
            subjectPage.render();
        }
    }

    clickEdit(e) {
        const cardId = e.target.dataset.id;
        if (cardId) {
            const editPage = new CardEditPage(this.parent, cardId);
            editPage.render();
        }
    }

    clickDelete(e) {
        const cardId = e.target.dataset.id;
        if (cardId && confirm('Вы уверены, что хотите удалить эту карточку?')) {
            const deletePage = new CardDeletePage(this.parent, cardId);
            deletePage.render();
        }
    }

    clickAdd = () => {
        const addPage = new CardAddPage(this.parent);
        addPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        this.getData();

        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchCards(e.target.value);
            });
        }

        const addBtn = document.getElementById('add-card-btn');
        if (addBtn) {
            addBtn.addEventListener('click', this.clickAdd);
        }
    }
}
