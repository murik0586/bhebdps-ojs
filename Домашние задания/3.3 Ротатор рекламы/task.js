// task.js

// Функция для запуска ротатора
function startRotator(rotator) {
    // Находим все элементы с классом rotator__case внутри данного ротатора
    const cases = rotator.querySelectorAll('.rotator__case');

    // Если нет элементов, выходим
    if (cases.length === 0) return;

    // Находим активный элемент
    let currentIndex = 0;
    for (let i = 0; i < cases.length; i++) {
        if (cases[i].classList.contains('rotator__case_active')) {
            currentIndex = i;
            break;
        }
    }

    // Функция для переключения на следующий элемент
    function rotate() {
        // Удаляем класс у текущего активного элемента
        cases[currentIndex].classList.remove('rotator__case_active');

        // Переходим к следующему элементу (циклически)
        currentIndex = (currentIndex + 1) % cases.length;

        // Получаем следующий элемент
        const nextCase = cases[currentIndex];

        // Добавляем класс активному элементу
        nextCase.classList.add('rotator__case_active');

        // Изменяем цвет текста, если указан data-color
        const color = nextCase.dataset.color;
        if (color) {
            nextCase.style.color = color;
        }

        // Получаем скорость для следующего переключения
        const speed = parseInt(nextCase.dataset.speed) || 1000;

        // Устанавливаем следующий таймаут
        timeoutId = setTimeout(rotate, speed);
    }

    // Применяем цвет для первого активного элемента
    const activeCase = cases[currentIndex];
    const initialColor = activeCase.dataset.color;
    if (initialColor) {
        activeCase.style.color = initialColor;
    }

    // Получаем начальную скорость
    const initialSpeed = parseInt(activeCase.dataset.speed) || 1000;

    // Запускаем ротацию
    let timeoutId = setTimeout(rotate, initialSpeed);

    // Возвращаем функцию для остановки ротатора (опционально)
    return function stopRotator() {
        clearTimeout(timeoutId);
    };
}

// Находим все ротаторы на странице
const rotators = document.querySelectorAll('.rotator');

// Запускаем каждый ротатор
rotators.forEach(rotator => {
    startRotator(rotator);
}
);