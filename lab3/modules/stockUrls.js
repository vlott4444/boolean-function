class FunctionUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }
    getStocks() { return `${this.baseUrl}/functions`; }
    getStockById(id) { return `${this.baseUrl}/functions/${id}`; }
    createStock() { return `${this.baseUrl}/functions`; }
    removeStockById(id) { return `${this.baseUrl}/functions/${id}`; }
    updateStockById(id) { return `${this.baseUrl}/functions/${id}`; }
}

export const stockUrls = new FunctionUrls();
