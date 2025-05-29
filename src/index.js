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

let cards = Array.from(document.querySelectorAll('.card__slider'));
let indicators = [];
let currentIndex = 0;
let startX = 0;
let isMobile = false;

function showCard(index) {
  cards.forEach((card, i) => {
    const offset = (i - index) * 110;
    card.style.transform = `translateX(${offset}%)`;
  });

  updateIndicator(index);
  currentIndex = index;
}

function resetCardsPosition() {
  cards.forEach(card => {
    card.style.transform = 'translateX(0%)';
  });
  currentIndex = 0;
}

function updateIndicator(index = currentIndex) {
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle('indicator_open', isMobile);
    indicator.classList.toggle('active', i === index);
  });
}

function handleTouchStart(e) {
  startX = e.touches[0].clientX;
}

function handleTouchMove(e) {
  const currentX = e.touches[0].clientX;
  const diffX = startX - currentX;

  if (Math.abs(diffX) > 50) {
    const isSwipingLeft = diffX > 0;
    const isSwipingRight = diffX < 0;

    if ((isSwipingLeft && currentIndex < cards.length - 1) ||
        (isSwipingRight && currentIndex > 0)) {
      if (e.cancelable) {
        e.preventDefault();
      }

      const newIndex = isSwipingLeft ? currentIndex + 1 : currentIndex - 1;
      showCard(newIndex);
    }

    startX = currentX;
  }
}

function updateIndicatorsList() {
  indicators = Array.from(document.querySelectorAll('.indicator__slider'));
}

function clearIndicatorHandlers() {
  const currentIndicators = document.querySelectorAll('.indicator__slider');
  currentIndicators.forEach((indicator) => {
    if (indicator.parentNode) {
      const clone = indicator.cloneNode(true);
      indicator.parentNode.replaceChild(clone, indicator);
    }
  });
}

function addTouchHandlers() {
  cards.forEach(card => {
    card.addEventListener('touchstart', handleTouchStart, { passive: false });
    card.addEventListener('touchmove', handleTouchMove, { passive: false });
  });
}

function removeTouchHandlers() {
  cards.forEach(card => {
    card.removeEventListener('touchstart', handleTouchStart, { passive: false });
    card.removeEventListener('touchmove', handleTouchMove, { passive: false });
  });
}

function setupMobile() {
  isMobile = true;
  cards = Array.from(document.querySelectorAll('.card__slider'));
  clearIndicatorHandlers();
  updateIndicatorsList();

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => showCard(index));
  });

  addTouchHandlers();
  showCard(currentIndex);
}

function teardownDesktop() {
  isMobile = false;
  resetCardsPosition();
  updateIndicator();
  removeTouchHandlers();
}

function handleResponsiveInit() {

  if (window.innerWidth < 1024 && !isMobile) {
    setupMobile();
  } else if (window.innerWidth >= 1024 && isMobile) {
    teardownDesktop();
  }
}

window.addEventListener('resize', handleResponsiveInit);
document.addEventListener('DOMContentLoaded', () => {
  handleResponsiveInit();
});

