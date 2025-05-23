import './styles/popup.scss';
import './styles/style.scss';
import './styles/global.scss';
import { openPopup, addListener } from './components/popup';
import { setEventListeners } from './components/valid';

const popup = document.querySelector('.popup');
const popupOverlay = document.querySelector('.popup-overlay');
const buttonCard = document.querySelectorAll('.button_card');


buttonCard.forEach(button => {
    button.addEventListener('click', () => {
        openPopup(popup, popupOverlay)
    })
})

addListener(popup, popupOverlay)


setEventListeners()

//like 

const isLike = document.querySelectorAll('.card__like')

const like = (isLikeCore) => {
    isLikeCore.classList.toggle('active_like')
}

isLike.forEach(likes => {
    const isLikeCore = likes.querySelector('.card__like_core')
    likes.addEventListener('click', () => like(isLikeCore))
})


// slider 

const card_first = document.querySelector('.card_type-fourth');
const card_second = document.querySelector('.card_type-fifth');
const indicators = document.querySelectorAll('.indicator__slider');
let isCard1Active = true;
let startX = 0;
let currentX = 0;
let diffX = 0;


function toggleCards() {
    if (isCard1Active) {
        card_first.style.transform = 'translateX(-110%)';
        card_second.style.transform = 'translateX(0%)';
    } else {
        card_first.style.transform = 'translateX(0%)';
        card_second.style.transform = 'translateX(110%)';
    }
    isCard1Active = !isCard1Active;
}

function toggleCardsStart() {
    card_first.style.transform = 'translateX(0%)';
    card_second.style.transform = 'translateX(0%)';
}

function updateIndicator() {
    indicators.forEach((indicator, index) => {
        indicator.classList.add('indicator_open');
        if (index === (isCard1Active ? 0 : 1)) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function handleTouchStart(e) {
    startX = e.touches[0].clientX;
}

function handleTouchMove(e) {
    currentX = e.touches[0].clientX;
    diffX = startX - currentX;

    if (Math.abs(diffX) > 50) {
        e.preventDefault();
        toggleCards();
        updateIndicator();
        startX = currentX;
    }
}

card_first.addEventListener('touchstart', handleTouchStart, { passive: false });
card_first.addEventListener('touchmove', handleTouchMove, { passive: false });
card_second.addEventListener('touchstart', handleTouchStart, { passive: false });
card_second.addEventListener('touchmove', handleTouchMove, { passive: false });


const swapResize = () => {
    if (window.innerWidth <= 1024) {

        indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                indicator.classList.add('indicator_open');
                const slideIndex = indicator.dataset.slide - 1;
                if (slideIndex !== (isCard1Active ? 0 : 1)) {
                    toggleCards();
                    updateIndicator();
                }
            });
    });

    } else {
        indicators.forEach(indicator => {
            indicator.classList.remove('indicator_open')
        })
        toggleCardsStart()
    }
}

window.addEventListener('resize', swapResize) 

