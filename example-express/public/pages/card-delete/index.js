import { MainPage } from '../main/index.js';
import { ajax } from '../../modules/ajax.js';
import { functionUrls } from '../../modules/functionUrls.js';

export class CardDeletePage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    async deleteCard() {
        if (confirm('Вы уверены, что хотите удалить эту карточку?')) {
            try {
                const { status } = await ajax.delete(functionUrls.deleteFunctionById(this.id));
                if (status === 204 || status === 200) {
                    const mainPage = new MainPage(this.parent);
                    mainPage.render();
                }
            } catch (error) {
                console.error('Ошибка при удалении:', error);
                alert('Не удалось удалить карточку');
            }
        }
    }

    render() {
        this.deleteCard();
    }
}
