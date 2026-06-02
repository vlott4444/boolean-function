import { MainPage } from '../main/index.js';
import { ajax } from '../../modules/ajax.js';
import { functionUrls } from '../../modules/functionUrls.js';  // ← ИСПРАВЛЕНО

export class CardDeletePage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    async deleteCard() {
        if (confirm('Вы уверены, что хотите удалить эту карточку?')) {
            try {
                const { status } = await ajax.delete(functionUrls.deleteFunctionById(this.id));  // ← ИСПРАВЛЕНО
                if (status === 204 || status === 200) {
                    alert('Карточка успешно удалена!');
                    const mainPage = new MainPage(this.parent);
                    mainPage.render();
                } else {
                    alert('Ошибка при удалении карточки');
                }
            } catch (error) {
                console.error('Ошибка:', error);
                alert('Ошибка при удалении карточки');
            }
        }
    }

    render() {
        this.deleteCard();
    }
}
