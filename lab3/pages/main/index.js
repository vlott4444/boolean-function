import { SubjectCarouselComponent } from "../../components/subject-carousel/index.js";
import { SubjectPage } from "../subject/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return '<div id="main-page"></div>';
    }

    getData() {
        return [
            {
                id: 1,
                icon: "./images/calculators.png",
                title: "Calculators",
                text: "Calculators and convertors for STEM, finance, fitness, construction, cooking, and more"
            },
            {
                id: 2,
                icon: "./images/cheat_sheets.png",
                title: "Cheat Sheets",
                text: "A quick reference guide for math formulas"
            },
            {
                id: 3,
                icon: "./images/groups.png",
                title: "Groups",
                text: "Create a study group and share problems, notes and quizzes"
            }
        ];
    }

    getSubjectById(id) {
        const subjects = {
            1: {
                title: "Calculators",
                text: "Calculators and convertors for STEM, finance, fitness, construction, cooking, and more",
                //teacher: "Symbolab Team",
                //icon: "../images/calculators.png"
            },
            2: {
                title: "Cheat Sheets",
                text: "A quick reference guide for math formulas, including algebra, calculus, and trigonometry.",
                //teacher: "Math Reference",
                //icon: "../images/cheat_sheets.png"
            },
            3: {
                title: "Groups",
                text: "Create a study group and share problems, notes and quizzes with your classmates.",
                //teacher: "Study Together",
                //icon: "../images/groups.png"
            }
        };
        return subjects[id];
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const subject = this.getSubjectById(cardId);
        const subjectPage = new SubjectPage(this.parent, subject);
        subjectPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = this.getData();
        const carousel = new SubjectCarouselComponent(this.pageRoot);
        carousel.render(data, this.clickCard.bind(this));
    }
}
