import { createElement } from '../helper/createElement.js';

export const createCategory = (parent) => {
    const category = createElement('section', {
        className: 'category section-offset',
    });

    const container = createElement('div', {
        className: 'container',
    });

    category.append(container);

    const categoryList = createElement('ul', {
        className: 'category__list',
    });

    container.append(categoryList);

    const createCategoryCard = (data) => {
        const item = createElement('li', {
            className: 'category__item',
        });

        item.dataset.id = data.id;

        item.insertAdjacentHTML('afterbegin', `
        <button class="category__card">
            <span class="category__title">${data.title}</span>
            <span class="category__pairs">${data.length} пар</span>
        </button>
        <button class="category__btn category__edit" aria-label="редактировать"></button>
        <button class="category__btn category__del" aria-label="удалить"></button>
        `)

        return item;
    }

    const mount = (data) => {
        categoryList.textContent = '';
        parent.append(category);
        const cards = data.map(createCategoryCard);
        categoryList.append(...cards);
    };

    const unmount = () => {
        category.remove();
    };

    return { mount, unmount, categoryList }
}