class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getStocks() {
        return `${this.baseUrl}/stocks`;
    }

    getStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    createStock() {
        return `${this.baseUrl}/stocks`;
    }

    removeStockById(id) {  // ← добавил параметр id
        return `${this.baseUrl}/stocks/${id}`;
    }

    updateStockById(id) {  // ← добавил параметр id
        return `${this.baseUrl}/stocks/${id}`;
    }
}

export const stockUrls = {
    getStocks: () => '/stocks',  // у тебя в бекенде маршрут '/stocks', не '/api/stocks'
    getStockById: (id) => `/stocks/${id}`
}
