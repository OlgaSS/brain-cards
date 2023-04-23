import { createElement } from '../helper/createElement.js';
import { shuffle } from '../helper/shuffle.js';
import { showAlert } from '../components/showAlert.js';

export const createPairs = (parent) => {

    const pairs = createElement('section', {
        className: 'card section-offset',
    });

    const container = createElement('div', {
        className: 'container card__container',
    });

    const btnReturn = createElement('button', {
        className: 'card__return',
        ariaLabel: 'Возврат к категориям',
    });

    const btnCard = createElement('button', {
        className: 'card__item',
    });

    const cardFront = createElement('span', {
        className: 'card__front',
        textContent: 'слово',
    });

    const cardBack = createElement('span', {
        className: 'card__back',
        textContent: 'слово',
    });

    btnCard.append(cardFront, cardBack)
    container.append(btnReturn, btnCard);
    pairs.append(container);

    let dataCards = [];

    const flipCard = () => {
        btnCard.classList.add('card__item_flipped');
        btnCard.removeEventListener('click', flipCard);
        setTimeout(() => {
            btnCard.classList.remove('card__item_flipped');
            setTimeout(() => {
                btnCard.index++;
                if (btnCard.index === dataCards.length) {
                    cardFront.textContent = 'карточки закончены';
                    showAlert('Так держать!', 3500);
                    setTimeout(() => {
                        btnReturn.click();
                    }, 2000)
                    return
                }

                cardFront.textContent = dataCards[btnCard.index][0];
                cardBack.textContent = dataCards[btnCard.index][1];
                btnCard.addEventListener('click', flipCard);
            }, 100);
        }, 1500)
    }

    const cardControler = (data) => {
        dataCards = [...data];
        btnCard.index = 0;

        cardFront.textContent = data[btnCard.index][0];
        cardBack.textContent = data[btnCard.index][1];

        btnCard.addEventListener('click', flipCard);
    }

    const mount = (data) => {
        parent.append(pairs);
        const shuffledArray = shuffle(data.pairs);
        cardControler(shuffledArray);
    };

    const unmount = () => {
        pairs.remove();
        btnCard.removeEventListener('click', flipCard);
    };

    return { mount, unmount, btnReturn }
}