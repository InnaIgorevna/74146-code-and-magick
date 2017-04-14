'use strict';
window.getRandomArrayElement = (function () {
  // Возвращает рандомный элемет массива
  return function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };
})();

window.wizardData = (function () {
  var NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];

  var SURNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var WIZARD_COUNT = 4;

  // Возвращает полное имя волшебника
  function getWizardName() {
    var name = window.getRandomArrayElement(NAMES);
    var surname = window.getRandomArrayElement(SURNAMES);
    if (Math.random() < 0.5) {
      return name + ' ' + surname;
    } else {
      return surname + ' ' + name;
    }
  }
// Возвращает цвет плаща
  function getWizardCoatColor() {
    return window.getRandomArrayElement(COAT_COLORS);
  }
// Возвращает цвет глаз
  function getWizardEyesColor() {
    return window.getRandomArrayElement(EYES_COLORS);
  }
// Возвращаем массив объектов волщебников
  function createWizards() {
    var wizards = [];
    for (var i = 0; i < WIZARD_COUNT; i++) {
      wizards.push({
        name: getWizardName(),
        coatColor: getWizardCoatColor(),
        eyesColor: getWizardEyesColor()
      });
    }
    return wizards;
  }
// Возвращает клонируемый из шаблона #similar-wizard-template блок с волшебником c заполнеными данными из массива
  function renderWizard(wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  }
// fragment-oтстойник(Буфер). После того как собрался блок с волшебником. Этот блок отправляется в отстойник.
// Добавление идет в конец. И после того как всех волшебников собрали добавляем в блок setup-similar-list
  var similarListElement = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  var wizards = createWizards();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
  return {
    getWizardCoatColor: getWizardCoatColor,
    getWizardEyesColor: getWizardEyesColor
  };
})();

(function () {
  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];
// Закрываем блок setup
  function hideSetup() {
    setup.classList.add('hidden');
    setup.style.left = startCoords.x;
    setup.style.top = startCoords.y;
  }
// Показываем блок setup
  function showSetup() {
    setup.classList.remove('hidden');
    startCoords.x = setup.style.left;
    startCoords.y = setup.style.top;
  }
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var wizardCoat = document.querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var setupOpenIcon = document.querySelector('.setup-open-icon');
  var setupFireballWrap = document.querySelector('.setup-fireball-wrap');

  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;
  var startCoords = {};
// Открывает формы
  function openSetup() {
    showSetup();
    // закрываем окно с героем спомощью Esc, а при фокусе в поле ввода имени, форма не закрывается
    document.addEventListener('keydown', function (evt) {
      var userName = document.querySelector('.setup-user-name');
      if (evt.keyCode === ESC_KEY_CODE && userName !== document.activeElement) {
        hideSetup();
      }
    });
  }
// Клик на блок с иконкой пользователя открывает форму
  setupOpen.addEventListener('click', openSetup);
// Клик на крестик формы закрывает её
  setupClose.addEventListener('click', hideSetup);
// Выделение крестика формы и нажатие на enter, закрывает форму
  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      hideSetup();
    }
  });
// открываем окно с героем с помощью Enter
  setupOpenIcon.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      openSetup();
    }
  });
// Изменение цвета мантии персонажа, по клику
  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = window.wizardData.getWizardCoatColor();
  });
// Изменение цвета глаз персонажа, по клику
  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = window.wizardData.getWizardEyesColor();
  });
// Изменение цвета огненого шара, по клику
  setupFireballWrap.addEventListener('click', function () {
    setupFireballWrap.style.background = window.getRandomArrayElement(FIREBALL_COLORS);
  });
  // Показываем блок setup-similar
  document.querySelector('.setup-similar').classList.remove('hidden');
})();
