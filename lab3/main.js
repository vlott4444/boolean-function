// main.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {MainPage} from "./pages/main/index.js";

const gridStyles = document.createElement('style');
gridStyles.textContent = `
    .card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .card:hover {
        box-shadow: 0 8px 24px rgba(0,0,0,0.15) !important;
    }

    @media (max-width: 768px) {
        .col-md-4 {
            flex: 0 0 100%;
            max-width: 100%;
        }
    }
`;
document.head.appendChild(gridStyles);

const root = document.getElementById('root');

const mainPage = new MainPage(root);
mainPage.render();
