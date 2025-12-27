import { browser } from '$app/environment';

// Создаем реактивный класс для управления избранным
class FavoritesManager {
    // Список ID товаров в избранном
    ids = $state<number[]>([]);

    constructor() {
        if (browser) {
            const saved = localStorage.getItem('favorites');
            if (saved) this.ids = JSON.parse(saved);
        }
    }

    // Проверка, есть ли товар в избранном
    has(id: number) {
        return this.ids.includes(id);
    }

    // Переключатель (добавить/удалить)
    toggle(id: number) {
        if (this.has(id)) {
            this.ids = this.ids.filter(i => i !== id);
        } else {
            this.ids = [...this.ids, id];
        }
        if (browser) {
            localStorage.setItem('favorites', JSON.stringify(this.ids));
        }
    }
}

// Экспортируем единственный экземпляр (синглтон)
export const favorites = new FavoritesManager();