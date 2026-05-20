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
        return `
            <div id="main-page">
                <!-- Место для карусели -->
                <div id="carousel-container"></div>
                <!-- Место для результатов заданий (под каруселью) -->
                <div id="tasks-results" class="tasks-results-grid" style="margin-top: 2rem;"></div>
            </div>
        `;
    }

    // ЗАДАНИЕ 1.3
    sumOfSquares(arr) {
        if (!Array.isArray(arr)) return 0;
        return arr.reduce((sum, num) => sum + (typeof num === 'number' ? num * num : 0), 0);
    }

    //ЗАДАНИЕ 1.8
    arithmeticMean(arr) {
        if (!Array.isArray(arr) || arr.length === 0) return 0;
        const sum = arr.reduce((acc, val) => acc + (typeof val === 'number' ? val : 0), 0);
        return sum / arr.length;
    }

    //2.10
    countPrefixWords(words, str) {
        if (!Array.isArray(words) || typeof str !== 'string') return 0;
        let count = 0;
        for (const word of words) {
            if (str.startsWith(word)) count++;
        }
        return count;
    }

    // 3.1
    mergeObjects(...objects) {
        const result = {};
        for (const obj of objects) {
            if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
                for (const key in obj) {
                    if (!(key in result)) {
                        result[key] = obj[key];
                    }
                }
            }
        }
        return result;
    }

    // Отображение карточек с результатами (стиль как у компонентов)
    displayTasksResults() {
        const container = document.getElementById('tasks-results');
        if (!container) return;

        // Тестовые данные
        const squaresArray = [1, 2, 3, 4];
        const meanArray = [10, 20, 30, 40];
        const words = ["a", "b", "c", "ab", "bc", "abc"];
        const str = "abc";
        const objA = { a: 1, b: 2, c: 3 };
        const objB = { b: 99, d: 4 };
        const objC = { c: 77, e: 5 };

        const sumSq = this.sumOfSquares(squaresArray);
        const mean = this.arithmeticMean(meanArray);
        const prefixCount = this.countPrefixWords(words, str);
        const merged = this.mergeObjects(objA, objB, objC);

        // Карточки в едином стиле (адаптивная сетка)
        container.innerHTML = `
            <style>
                .tasks-results-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 1.5rem;
                }
                .result-card {
                    background: white;
                    border-radius: 1.5rem;
                    padding: 1.2rem 1.5rem;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.05);
                    transition: transform 0.2s, box-shadow 0.2s;
                    border: 1px solid rgba(0,0,0,0.03);
                }
                .result-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 16px 28px rgba(0,0,0,0.1);
                }
                .result-title {
                    font-weight: 700;
                    font-size: 1.2rem;
                    margin-bottom: 0.75rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #1e293b;
                }
                .result-code {
                    background: #f1f5f9;
                    padding: 0.25rem 0.5rem;
                    border-radius: 12px;
                    font-family: monospace;
                    font-size: 0.9rem;
                    color: #0f3b5c;
                }
                .result-desc {
                    color: #334155;
                    font-size: 0.9rem;
                    margin: 0.5rem 0;
                }
                .result-value {
                    font-weight: 600;
                    color: #DB3F59;
                    font-size: 1.1rem;
                    word-break: break-word;
                }
            </style>
            <div class="result-card">
                <div class="result-title">1.3 Сумма квадратов</div>
                <div class="result-desc">Массив: [${squaresArray.join(', ')}]</div>
                <div class="result-value">→ ${sumSq}</div>
            </div>
            <div class="result-card">
                <div class="result-title">1.8 Среднее арифметическое</div>
                <div class="result-desc">Массив: [${meanArray.join(', ')}]</div>
                <div class="result-value">→ ${mean}</div>
            </div>
            <div class="result-card">
                <div class="result-title">2.10 Количество слов-префиксов</div>
                <div class="result-desc">words: [${words.map(w => `"${w}"`).join(', ')}]<br>str: "${str}"</div>
                <div class="result-value">→ ${prefixCount}</div>
            </div>
            <div class="result-card">
                <div class="result-title">3.1 Слияние объектов (первое значение)</div>
                <div class="result-desc">
                    obj1 = ${JSON.stringify(objA)}<br>
                    obj2 = ${JSON.stringify(objB)}<br>
                    obj3 = ${JSON.stringify(objC)}
                </div>
                <div class="result-value">→ ${JSON.stringify(merged)}</div>
            </div>
        `;
    }

    getData() {
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

    getSubjectById(id) {
        const subjects = {
            1: {
                title: "Значение булевой функции",
                text: "Введите логическое выражение с использованием логических операторов и входных значений множества {0, 1}.",
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
                text: "Введите логическое выражение с использованием логических операторов и входных значений множества {0, 1}.",
                teacher: "Study Together",
                icon: "images/groups.png"
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

        // Рендер карусели
        const carouselContainer = document.getElementById('carousel-container');
        if (carouselContainer) {
            const carousel = new SubjectCarouselComponent(carouselContainer);
            carousel.render(this.getData(), this.clickCard.bind(this));
        } else {
            const data = this.getData();
            const carousel = new SubjectCarouselComponent(this.pageRoot);
            carousel.render(data, this.clickCard.bind(this));
        }

        // Отображение результатов под каруселью
        this.displayTasksResults();
    }
}
