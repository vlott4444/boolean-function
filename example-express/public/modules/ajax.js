class Ajax {
    async get(url) {
        try {
            const response = await fetch(url);
            return await this._handleResponse(response);
        } catch (error) {
            console.error('GET ошибка:', error);
            throw error; // Пробрасываем ошибку дальше
        }
    }

    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return await this._handleResponse(response);
        } catch (error) {
            console.error('POST ошибка:', error);
            throw error;
        }
    }

    async patch(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return await this._handleResponse(response);
        } catch (error) {
            console.error('PATCH ошибка:', error);
            throw error;
        }
    }

    async delete(url) {
        try {
            const response = await fetch(url, {
                method: 'DELETE',
            });
            return await this._handleResponse(response);
        } catch (error) {
            console.error('DELETE ошибка:', error);
            throw error;
        }
    }

    async _handleResponse(response) {
        let data = null;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            try {
                data = await response.json();
            } catch (e) {
                console.error('Ошибка парсинга JSON:', e);
                throw e;
            }
        }

        if (!response.ok) {
            throw {
                status: response.status,
                data: data,
                message: `HTTP error ${response.status}`
            };
        }

        // ВСЕГДА возвращаем объект с data и status
        return { data, status: response.status };
    }
}

export const ajax = new Ajax();
