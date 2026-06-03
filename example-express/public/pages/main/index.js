import { SubjectCarouselComponent } from "../../components/subject-carousel/index.js";
import { SubjectPage } from "../subject/index.js";
import { ajax } from '../../modules/ajax.js';
import { functionUrls } from '../../modules/functionUrls.js';  // ← ИСПРАВЛЕНО: stockUrls → functionUrls

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
                <div class="row mb-3">
                    <div class="col-md-6">
                        <input type="text" id="search-input" class="form-control"
                               placeholder="Поиск по названию...">
                    </div>
                    <div class="col-md-6 text-end">
                        <button id="add-card-btn" class="btn btn-primary"
                                style="background-color: #DB3F59; border: none;">
                            + Добавить карточку
                        </button>
                    </div>
                </div>
                <div id="main-page"></div>
            </div>
        `;
    }

    getData() {
        ajax.get(functionUrls.getFunctions(), (data, status) => {
            if (status === 200 && Array.isArray(data)) {
                this.data = data;
            } else {
                console.error('Ошибка загрузки данных:', status);
                this.data = [];
            }
            this.renderCarousel();
        });
    }

    searchFunctions(query) {
        if (!query || query.trim() === '') {
            this.getData();
            return;
        }

        const searchUrl = `/functions?search=${encodeURIComponent(query)}`;

        ajax.get(searchUrl, (data, status) => {
            if (status === 200 && Array.isArray(data)) {
                this.data = data;
                this.renderCarousel();
            } else {
                console.error('Ошибка поиска:', status);
            }
        });
    }

    renderCarousel() {
        const container = this.pageRoot;

        if (!container) {
            console.error('Контейнер main-page не найден');
            return;
        }

        if (!this.data || this.data.length === 0) {
            container.innerHTML = '<div class="alert alert-warning text-center">Нет данных для отображения</div>';
            return;
        }

        const carousel = new SubjectCarouselComponent(container);
        carousel.render(this.data, this.clickCard.bind(this), this.clickEdit.bind(this), this.clickDelete.bind(this));
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
        const subjectPage = new SubjectPage(this.parent, cardId);
        subjectPage.render();
    }

    clickEdit(e) {
        const cardId = e.target.dataset.id;
        import('../card-edit/index.js').then(module => {
            const editPage = new module.CardEditPage(this.parent, cardId);
            editPage.render();
        }).catch(err => {
            console.error('Страница редактирования не найдена', err);
        });
    }

    clickDelete(e) {
        const cardId = e.target.dataset.id;
        import('../card-delete/index.js').then(module => {
            const deletePage = new module.CardDeletePage(this.parent, cardId);
            deletePage.render();
        }).catch(err => {
            console.error('Страница удаления не найдена', err);
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

        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchFunctions(e.target.value);
            });
        }

        this.getData();
    }
}
