'use strict';

window.renderWizards = (function () {
  var WIZARD_COUNT = 4;
  function renderWizard(wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    window.utils.fillElement(wizardElement.querySelector('.wizard-coat'), wizard.colorCoat);
    window.utils.fillElement(wizardElement.querySelector('.wizard-eyes'), wizard.colorEyes);
    return wizardElement;
  }

  // fragment-oтстойник(Буфер). После того как собрался блок с волшебником. Этот блок отправляется в отстойник.
  // Добавление идет в конец. И после того как всех волшебников собрали добавляем в блок setup-similar-list
  function renderWizards(wizard) {
    var similarListElement = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARD_COUNT; i++) {
      fragment.appendChild(renderWizard(wizard[i]));
    }
    similarListElement.innerHTML = '';
    similarListElement.appendChild(fragment);
  }
  return renderWizards;
})();
