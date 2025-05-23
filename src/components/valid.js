const popupInput = document.querySelector('.popup__input');

const showInputError = (elem, errorMessage) => {
    const formError = document.querySelector(`.${elem.id}-error`);

    elem.classList.add('popup__input_error');
    formError.textContent = errorMessage;
    formError.classList.add('form_input-error_active');
};
  
const hideInputError = (elem) => {
    const formError = document.querySelector(`.${elem.id}-error`);

    elem.classList.remove('popup__input_error');
    formError.classList.remove('form_input-error_active');
    
    formError.textContent = '';
};

const isValid = (popupInput) => {
    if (popupInput.validity.patternMismatch) {
        popupInput.setCustomValidity(popupInput.dataset.errorMessage);
    } else {
        popupInput.setCustomValidity("");
    }

    if (!popupInput.validity.valid) {
      showInputError(popupInput, popupInput.validationMessage);
    } else {
      hideInputError(popupInput);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
};


const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add('popup__button_disabled');
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('popup__button_disabled');
    }
};

export const setEventListeners = () => {
    const inputList = Array.from(document.querySelectorAll('.popup__input'));
    const buttonElement = document.querySelector('.popup__button');

    toggleButtonState(inputList, buttonElement)
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(inputElement)

        toggleButtonState(inputList, buttonElement)
      });
    });
};