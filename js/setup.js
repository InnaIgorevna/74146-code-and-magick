'use strict';
window.utils = (function () {
  // Возвращает рандомный элемет массива
  function getRandomArrayElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  var fillElement = function (element, color) {
    element.style.fill = color;
  };
  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };
  return {
    getRandomArrayElement: getRandomArrayElement,
    fillElement: fillElement,
    changeElementBackground: changeElementBackground
  };
})();
window.debounce = (function () {
  var DEBOUNCE_INTERVAL = 500; // ms
  var lastTimeout;
  function debounce(fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  }
  return debounce;
})();
(function () {
  var COAT_COLORS = [
    'rgb(146, 100, 161)',
    'rgb(215, 210, 55)',
    'rgb(241, 43, 107)',
    'rgb(101, 137, 164)',
    'rgb(0, 0, 0)',
    'rgb(215, 210, 55)',
    'rgb(56, 159, 117)',
    'rgb(241, 43, 107)'
  ];
  var EYES_COLORS = [
    'red',
    'orange',
    'yellow',
    'green',
    'lightblue',
    'blue',
    'purple'
  ];
  var getWizardsURL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/code-and-magick/data';
  var wizards = [];
  var coatColor;
  var eyesColor;
  function updateWizards() {
    window.renderWizards(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  }
  function onLoad(res) {
    wizards = res;
    updateWizards();
  }
  function onError(res) {
    var setupSimilarLabel = document.querySelector('.setup-similar-list');
    setupSimilarLabel.innerHTML = '<div class="response-error-text">' + 'Ошибка! ' + res + '</div>';
  }
  var wizardCoat = document.querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.wizard-eyes');
// Изменение цвета мантии персонажа, по клику

  wizardCoat.addEventListener('click', function () {
    window.colorizeElement(wizardCoat, COAT_COLORS, function (elem, randCol) {
      coatColor = randCol;
      window.utils.fillElement(elem, randCol);
      window.debounce(updateWizards);
    });
  });
// Изменение цвета глаз персонажа, по клику
  wizardEyes.addEventListener('click', function () {
    window.colorizeElement(wizardEyes, EYES_COLORS, function (elem, randCol) {
      eyesColor = randCol;
      window.utils.fillElement(elem, randCol);
      window.debounce(updateWizards);
    });
  });
  function namesComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }
  function getRank(wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  }
  window.load(getWizardsURL, onLoad, onError);
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

// Изменение цвета огненого шара, по клику
  setupFireballWrap.addEventListener('click', function () {
    window.colorizeElement(setupFireballWrap, FIREBALL_COLORS, window.utils.changeElementBackground);
  });
  // Показываем блок setup-similar
  document.querySelector('.setup-similar').classList.remove('hidden');
  // Блог с переносом вещей из магазина в инвентарь
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var draggedItem = null;
  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      artifactsElement.style.outline = '2px dashed red';
    }
  });
  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });
  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    artifactsElement.style.outline = '';
    evt.target.appendChild(draggedItem);
  });
  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });
  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
})();

