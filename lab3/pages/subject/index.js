import {SubjectDetailComponent} from "../../components/subject-detail/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";

export class SubjectPage {
    constructor(parent, subject) {
        this.parent = parent;
        this.subject = subject;
    }

    get pageRoot() {
        return document.getElementById('subject-page');
    }

    getHTML() {
        return `<div id="subject-page" class="container mt-4 d-flex justify-content-center"></div>`;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const detail = new SubjectDetailComponent(this.pageRoot);
        detail.render(this.subject);
    }
}
