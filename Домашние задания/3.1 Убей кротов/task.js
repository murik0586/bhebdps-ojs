// task.js

(() => {
    // Переменные для подсчета очков
    let deadCount = 0;
    let lostCount = 0;

    // Получаем элементы для отображения статистики
    const deadElement = document.getElementById('dead');
    const lostElement = document.getElementById('lost');

    // Функция для проверки окончания игры
    function checkGameOver() {
        if (deadCount === 10) {
            alert('Поздравляем! Вы убили всех кротов! Вы победили!');
            resetGame();
            return true;
        }

        if (lostCount === 5) {
            alert('Игра окончена! Вы проиграли. Попробуйте еще раз!');
            resetGame();
            return true;
        }

        return false;
    }

    // Функция сброса игры
    function resetGame() {
        deadCount = 0;
        lostCount = 0;
        deadElement.textContent = deadCount;
        lostElement.textContent = lostCount;
    }

    // Функция для получения лунки по индексу
    function getHole(index) {
        return document.getElementById(`hole${index}`);
    }

    // Регистрируем обработчики для каждой лунки
    for (let i = 1; i <= 9; i++) {
        const hole = getHole(i);

        hole.addEventListener('click', function() {
            // Проверяем, есть ли крот в лунке
            if (this.classList.contains('hole_has-mole')) {
                // Попали в крота
                deadCount++;
                deadElement.textContent = deadCount;

                // Удаляем крота из лунки (чтобы нельзя было кликнуть дважды)
                this.classList.remove('hole_has-mole');
            } else {
                // Промах
                lostCount++;
                lostElement.textContent = lostCount;
            }

            // Проверяем условия победы/поражения
            checkGameOver();
        });
    }
})();