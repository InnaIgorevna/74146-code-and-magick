'use strict';

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
// Возвращает рандомное целое число oт min до max
function getRandom(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}
// Возвращает рандомный элемет массива
function getRandomArrayElement(arr) {
  return arr[getRandom(0, arr.length)];
}
// Возвращает полное имя волшебника
function getWizardName() {
  var name = getRandomArrayElement(NAMES);
  var surname = getRandomArrayElement(SURNAMES);
  if (getRandom(0, 2) === 0) {
    return name + ' ' + surname;
  } else {
    return surname + ' ' + name;
  }
}
// Возвращает цвет плаща
function getWizardCoatColor() {
  return getRandomArrayElement(COAT_COLORS);
}
// Возвращает цвет глаз
function getWizardEyesColor() {
  return getRandomArrayElement(EYES_COLORS);
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
function showWizard() {
  var similarListElement = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  var wizards = createWizards();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
}
// Показываем блок setup
function showSetup() {
  document.querySelector('.setup').classList.remove('hidden');
}
// Показываем блок setup-similar
function showSimilarList() {
  document.querySelector('.setup-similar').classList.remove('hidden');
}

showSetup();
showWizard();
showSimilarList();
