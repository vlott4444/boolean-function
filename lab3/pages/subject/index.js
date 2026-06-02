import { SubjectDetailComponent } from "../../components/subject-detail/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from '../../modules/ajax.js';
import { functionUrls } from '../../modules/functionUrls.js';

export class SubjectPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.subject = null;
    }

    get pageRoot() {
        return document.getElementById('subject-page');
    }

    getHTML() {
        return `<div id="subject-page" class="container mt-4 d-flex justify-content-center"></div>`;
    }

    async getData() {
        try {
            const result = await ajax.get(functionUrls.getFunctionById(this.id));
            if (result && result.status === 200 && result.data) {
                this.subject = result.data;
                this.renderData();
            } else {
                console.error('Некорректный ответ от сервера:', result);
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    }

    renderData() {
        const root = this.pageRoot;
        if (!root) {
            console.error('pageRoot не найден');
            return;
        }

        const backButton = new BackButtonComponent(root);
        backButton.render(this.clickBack);

        const detail = new SubjectDetailComponent(root);
        detail.render(this.subject, this.parent);  // ← передаём parent
    }

    clickBack = () => {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.getData();
    }
}
