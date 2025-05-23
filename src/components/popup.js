export const addListener = (popup, popupOverlay) => {

    const popupClose = popup.querySelector('.popup_close');

    popupClose.addEventListener('click', () => closePopup(popup, popupOverlay))
}

export const openPopup = (popup, popupOverlay) => {
    popup.classList.add('popup_open')
    popupOverlay.classList.add('popup_open')
}

const closePopup = (popup, popupOverlay) => {
    popup.classList.remove('popup_open');
    popupOverlay.classList.remove('popup_open')
}