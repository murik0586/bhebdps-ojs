// task.js
// Находим все ссылки меню

const menuLinks = document.querySelectorAll('.menu__link');

// Функция для закрытия всех подменю
function closeAllSubMenus() {
    const allSubMenus = document.querySelectorAll('.menu_sub');
    allSubMenus.forEach(subMenu => {
        subMenu.classList.remove('menu_active');
    });
}

// Перебираем все ссылки и добавляем обработчики
menuLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        // Находим родительский элемент li с классом menu__item
        const menuItem = this.closest('.menu__item');

        // Ищем вложенное меню внутри этого li
        const subMenu = menuItem.querySelector('.menu_sub');

        // Если вложенное меню есть
        if (subMenu) {
            // Предотвращаем переход по ссылке
            event.preventDefault();

            // Закрываем все открытые подменю
            closeAllSubMenus();

            // Переключаем класс menu_active у найденного подменю
            subMenu.classList.toggle('menu_active');
        }
        // Если вложенного меню нет - ссылка работает как обычно
    });
});