import {SubjectCarouselComponent} from "../../components/subject-carousel/index.js";
import {SubjectPage} from "../subject/index.js";
import {CardEditPage} from "../card-edit/index.js";
import {CardAddPage} from "../card-add/index.js";
import {CardDeletePage} from "../card-delete/index.js";
import { ajax } from '../../modules/ajax.js';
import { functionUrls } from '../../modules/functionUrls.js';

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.allData = [];


        this.clickDetail = this.clickDetail.bind(this);
        this.clickEdit = this.clickEdit.bind(this);
        this.clickDelete = this.clickDelete.bind(this);
        this.clickAdd = this.clickAdd.bind(this);
        this.searchCards = this.searchCards.bind(this);
        this.getData = this.getData.bind(this);
        this.renderCarousel = this.renderCarousel.bind(this);
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
                            <button id="add-card-btn" class="btn w-100" style="background-color: #DB3F59; border: none; color: white; transition: all 0.3s ease;">Добавить карточку</button>
                        </div>
                    </div>
                    <div id="carousel-container"></div>
                </div>
            </div>
        `;
    }

    async getData() {
        try {
            const result = await ajax.get(functionUrls.getFunctions());
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


    renderCarousel(data) {
        const container = document.getElementById('carousel-container');
        if (!container) return;

        const carousel = new SubjectCarouselComponent(container);

        carousel.render(data, this.clickDetail, this.clickEdit, this.clickDelete);
    }

    clickDetail(e) {
        console.log('clickDetail вызван', e.target.dataset.id);

        const cardId = e.target.dataset.id;
        if (cardId) {
            if (!this.parent) {
                console.error('parent не определен в MainPage');
                return;
            }
            const subjectPage = new SubjectPage(this.parent, cardId);
            subjectPage.render();
        }
    }

    clickEdit(e) {
        console.log('clickEdit вызван', e.target.dataset.id);

        const cardId = e.target.dataset.id;
        if (cardId) {
            if (!this.parent) {
                console.error('parent не определен в MainPage');
                return;
            }
            const editPage = new CardEditPage(this.parent, cardId);
            editPage.render();
        }
    }

    clickDelete(e) {
        console.log('clickDelete вызван', e.target.dataset.id);

        const cardId = e.target.dataset.id;
        if (cardId && confirm('Вы уверены, что хотите удалить эту карточку?')) {
            if (!this.parent) {
                console.error('parent не определен в MainPage');
                return;
            }
            const deletePage = new CardDeletePage(this.parent, cardId);
            deletePage.render();
        }
    }

    clickAdd() {
        console.log('clickAdd вызван');

        if (!this.parent) {
            console.error('parent не определен в MainPage');
            return;
        }
        const addPage = new CardAddPage(this.parent);
        addPage.render();
    }

    render() {
        if (!this.parent) {
            console.error('MainPage: parent не передан в конструктор');
            return;
        }

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
