import {SubjectDetailComponent} from "../../components/subject-detail/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";
import { ajax } from '../../modules/ajax.js';
import { stockUrls } from '../../modules/stockUrls.js';

export class SubjectPage {
    // Теперь передаем НЕ subject, а id карточки
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;           // ← запоминаем id
        this.subject = null;    // ← данные загрузятся позже
    }

    get pageRoot() {
        return document.getElementById('subject-page');
    }

    getHTML() {
        return `<div id="subject-page" class="container mt-4 d-flex justify-content-center"></div>`;
    }

    // Новый метод — загружает данные с бэкенда
    getData() {
        ajax.get(stockUrls.getStockById(this.id), (data) => {
            this.subject = data;
            this.renderData();  // после загрузки — рисуем
        });
    }

    // Рисуем страницу с загруженными данными
    renderData() {
    // Убедимся, что pageRoot существует
    const root = this.pageRoot;
    if (!root) {
        console.error('pageRoot не найден');
        return;
    }

    const backButton = new BackButtonComponent(root);
    backButton.render(this.clickBack);

    const detail = new SubjectDetailComponent(root);
    detail.render(this.subject);
    }

    clickBack = () => {
    const mainPage = new MainPage(this.parent);
    mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        // Загружаем данные
        this.getData();
    }
}
