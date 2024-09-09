const selectApp = () => {
  const appButtons = document.querySelectorAll('.app-item__input');
  const buttonSubmit = document.querySelector('.select-button');
  let selectedCount = 0;

  appButtons.forEach((appButton) => {
    appButton.addEventListener('change', () => {
      if (appButton.checked) {
        selectedCount++;
        buttonSubmit.disabled = false;
        buttonSubmit.textContent = `Выбрать (${selectedCount})`;
        appButton.closest('.app-item').classList.add('app-item--active');
      } else {
        selectedCount--;
        appButton.closest('.app-item').classList.remove('app-item--active');
        buttonSubmit.textContent = `Выбрать (${selectedCount})`;
        if (selectedCount === 0) {
          buttonSubmit.disabled = true;
          buttonSubmit.textContent = 'Выбрать';
        }
      }
    });
  });
}

const customSlider = () => {
  const slider = document.querySelector('.custom-slider');
  const thumb = slider.querySelector('.slider-thumb');
  const input = slider.querySelector('.slider-input');
  const progress = slider.querySelector('.slider-progress');
  const valueDisplay = document.querySelector('.slider-value');
  const sliderStartValue = slider.querySelector('.slider-start-value');
  const sliderEndValue = slider.querySelector('.slider-end-value');
  const wordKnowledge = document.querySelector('.word-knowledge__count-number');
  const levelKnowledge = document.querySelector('.level-knowledge__level');
  const descriptionElement = document.querySelector('.level-knowledge__title');
  const submitBtn = document.getElementById('second-step-submit')

  const levelObj = {
    0: {
      word: 'X',
      level: 'X',
      description: 'Ты сможешь спросить местных, где лучший стритфуд.'
    },
    1: {
      word: '1080',
      level: 'A2',
      description: 'Ты сможешь спросить местных, где лучший стритфуд.'
    },
    2: {
      word: '2160',
      level: 'B1',
      description: 'Сможешь обсуждать свои любимые мемы!'
    },
    3: {
      word: '1800',
      level: 'B2',
      description: 'Сможешь вести деловую переписку'
    },
    4: {
      word: '4320',
      level: 'C1',
      description: 'Сможешь поддержать беседу с носителями языка!'
    },
    5: {
      word: '5000',
      level: 'C2',
      description: 'Сможешь вести свой блог или записывать подкасты!'
    }
  }

  sliderStartValue.textContent = `${input.min} ч`;
  sliderEndValue.textContent = `${input.max} ч`;

  function updateSlider(value) {
    const range = input.max - input.min;
    const percentPerPixel = 100 / slider.offsetWidth;
    const offsetPixels = 5;
    const adjustedPercent = percentPerPixel * offsetPixels;
  
    const percent = ((value - input.min) / range) * (100 - 2 * adjustedPercent) + adjustedPercent;
  
    const clampedPercent = Math.max(adjustedPercent, Math.min(100 - adjustedPercent, percent));
  
    thumb.style.left = `${clampedPercent}%`;
    valueDisplay.textContent = value;
    progress.style.width = `${clampedPercent}%`;

    const levelKey = value;
    const levelData = levelObj[levelKey];

    if (levelData) {
      wordKnowledge.textContent = levelData.word;
      levelKnowledge.textContent = levelData.level;
      descriptionElement.textContent = levelData.description;
    }

    if (value > 0) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  }

  input.addEventListener('input', (e) => {
    updateSlider(e.target.value);
  });

  updateSlider(input.value);
}

const playVideo = () => {
  const video = document.getElementById('video');
  video.play();
}

document.addEventListener('DOMContentLoaded', () => {
  const sliderContent = document.getElementById('edlock_slider_content');
  const firstStepButton = document.getElementById('first-step-submit');
  const secondStepButton = document.getElementById('second-step-submit');

  let currentStep = 0;

  function slideToNextStep() {
    if (currentStep < 2) {
      currentStep++;
      sliderContent.style.transform = `translateX(-${currentStep * 375}px)`;
    }
  }

  firstStepButton.addEventListener('click', () => {
    slideToNextStep();
  });

  secondStepButton.addEventListener('click', () => {
    slideToNextStep();
    
    setTimeout(() => {
      playVideo();
    }, 400);
  });

  selectApp();
  customSlider();
})