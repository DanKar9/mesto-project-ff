

// Функция, которая добавляет класс с ошибкой
function showInputError  (validationConfig,formElement, inputElement, errorMessage) {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

// Функция, которая удаляет класс с ошибкой
function hideInputError  (validationConfig,formElement, inputElement)  {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
}; 


function isValid  (validationConfig,formElement, inputElement)  {

  if(inputElement.validity.patternMismatch){
      inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  }else {
      inputElement.setCustomValidity('')
  }
  
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(validationConfig,formElement, inputElement, inputElement.validationMessage);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(validationConfig,formElement, inputElement);
  }
};

function setEventListeners  (validationConfig,formElement)  {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(validationConfig, inputList, buttonElement);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      
      isValid(validationConfig,formElement, inputElement)
      toggleButtonState(validationConfig,inputList, buttonElement);
    });
  });
}; 

export function enableValidation  (validationConfig)  {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
      formElement.addEventListener('submit', function(evt){
          evt.preventDefault()
      })
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(validationConfig,formElement);
  });
};

function hasInvalidInput  (inputList) {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
}; 


function toggleButtonState  (validationConfig,inputList, buttonElement)  {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
        buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
        // иначе сделай кнопку активной
        buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}; 

export function clearValidation(formElement, validationConfig) {
       const inputList = Array.from(
        formElement.querySelectorAll(validationConfig.inputSelector)
      );
       const buttonElement = formElement.querySelector(
         validationConfig.submitButtonSelector
      );
       inputList.forEach((inputElement) => {
         hideInputError(validationConfig, formElement, inputElement);
       });
       toggleButtonState(validationConfig, inputList, buttonElement);
    }



