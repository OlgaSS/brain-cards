import { createCategory } from './components/createCategory.js';
import { createEditCategory } from './components/createEditCategory.js';
import { createHeader } from './components/createHeader.js';
import { createElement } from './helper/createElement.js';
import { fetchCards, fetchCategories } from './service/api.service.js';

const initApp = async () => {
    const headerParent = document.querySelector('.header');
    const app = document.querySelector('#app');

    const headerObj = createHeader(headerParent);
    const categoryObj = createCategory(app);
    const editCategoryObj = createEditCategory(app);

    const allSectionUnmount = () => {
        categoryObj.unmount();
        editCategoryObj.unmount();
    }

    const renderIndex = async (event) => {
        event?.preventDefault();
        allSectionUnmount();
        const categories = await fetchCategories();
        if (categories.error) {
            app.append(createElement('p', {
                className: 'server-error',
                textContent: 'Ошибка сервера, попробуйте зайти позже.'
            }));
            return;
        }
        categoryObj.mount(categories);
    }
    renderIndex();

    headerObj.headerLogoLink.addEventListener('click', renderIndex);
    headerObj.headerButton.addEventListener('click', () => {
        allSectionUnmount();
        headerObj.updateHeaderTitle('Новая категория');
        editCategoryObj.mount();
    });

    categoryObj.categoryList.addEventListener('click', async (e) => {
        const categoryItem = e.target.closest('.category__item');

        if (e.target.closest('.category__edit')) {
            const dataCards = await fetchCards(categoryItem.dataset.id);
            allSectionUnmount();
            headerObj.updateHeaderTitle('Редактор');
            editCategoryObj.mount(dataCards);
            return
        }
    })
};
initApp();


