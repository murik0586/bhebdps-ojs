// task.js - Корзина товаров

document.addEventListener('DOMContentLoaded', () => {
    const cartProductsContainer = document.querySelector('.cart__products');
    const cartContainer = document.querySelector('.cart');

    // --- Вспомогательные функции ---

    // Получить текущие товары из localStorage
    function getCartItems() {
        try {
            const items = JSON.parse(localStorage.getItem('cartItems'));
            return Array.isArray(items) ? items : [];
        } catch {
            return [];
        }
    }

    // Сохранить товары в localStorage
    function saveCartItems(items) {
        localStorage.setItem('cartItems', JSON.stringify(items));
    }

    // Обновить отображение корзины и видимость
    function renderCart() {
        const items = getCartItems();

        // Очищаем контейнер, но оставляем пустым для перерисовки
        cartProductsContainer.innerHTML = '';

        if (items.length === 0) {
            cartContainer.style.display = 'none';
            return;
        }

        cartContainer.style.display = 'block';

        // Создаем элементы для каждого товара
        items.forEach(item => {
            const productElement = document.createElement('div');
            productElement.className = 'cart__product';
            productElement.dataset.id = item.id;

            // Создаем изображение
            const img = document.createElement('img');
            img.className = 'cart__product-image';
            img.src = item.image;
            img.alt = item.title || 'Товар';

            // Создаем счетчик
            const count = document.createElement('div');
            count.className = 'cart__product-count';
            count.textContent = item.count;

            // Кнопка удаления (для расширенной функциональности)
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '×';
            deleteButton.style.cssText = `
                        position: absolute;
                        top: -5px;
                        right: -5px;
                        background: red;
                        color: white;
                        border: none;
                        border-radius: 50%;
                        width: 20px;
                        height: 20px;
                        cursor: pointer;
                        font-size: 14px;
                        line-height: 20px;
                        text-align: center;
                    `;
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                removeFromCart(item.id);
            });

            productElement.style.position = 'relative';
            productElement.appendChild(img);
            productElement.appendChild(count);
            productElement.appendChild(deleteButton);

            cartProductsContainer.appendChild(productElement);
        });
    }

    function addToCart(productId, imageSrc, quantity, title = '') {
        let items = getCartItems();
        const existingItem = items.find(item => item.id === productId);

        if (existingItem) {
            existingItem.count += quantity;
        } else {
            // Добавляем новый товар
            items.push({
                id: productId,
                image: imageSrc,
                count: quantity,
                title: title
            });
        }

        saveCartItems(items);
        renderCart();
    }

    function removeFromCart(productId) {
        let items = getCartItems();
        items = items.filter(item => item.id !== productId);
        saveCartItems(items);
        renderCart();
    }

    document.querySelectorAll('.product').forEach(product => {
        const decButton = product.querySelector('.product__quantity-control_dec');
        const incButton = product.querySelector('.product__quantity-control_inc');
        const valueElement = product.querySelector('.product__quantity-value');
        const addButton = product.querySelector('.product__add');

        // Уменьшение количества
        if (decButton) {
            decButton.addEventListener('click', () => {
                let currentValue = parseInt(valueElement.textContent, 10);
                if (currentValue > 1) {
                    valueElement.textContent = currentValue - 1;
                }
            });
        }

        // Увелич
        if (incButton) {
            incButton.addEventListener('click', () => {
                let currentValue = parseInt(valueElement.textContent, 10);
                valueElement.textContent = currentValue + 1;
            });
        }

        // Добав в корзину
        if (addButton) {
            addButton.addEventListener('click', () => {
                const productId = product.dataset.id;
                const productImage = product.querySelector('.product__image');
                const productTitle = product.querySelector('.product__title');
                const quantity = parseInt(valueElement.textContent, 10);

                if (productImage) {
                    const imageSrc = productImage.src;
                    const title = productTitle ? productTitle.textContent.trim() : '';

                    animateProductToCart(productImage, () => {
                        addToCart(productId, imageSrc, quantity, title);
                    });
                }
            });
        }
    });


    function animateProductToCart(imageElement, callback) {

        const cartItems = getCartItems();
        if (cartItems.length === 0) {
            if (callback) callback();
            return;
        }

        const targetElement = document.querySelector('.cart__product');
        if (!targetElement) {
            if (callback) callback();
            return;
        }

        // Получаем координаты
        const startRect = imageElement.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();

        // Создаем копию изображения
        const clone = imageElement.cloneNode();
        clone.style.position = 'fixed';
        clone.style.width = imageElement.offsetWidth + 'px';
        clone.style.height = imageElement.offsetHeight + 'px';
        clone.style.left = startRect.left + 'px';
        clone.style.top = startRect.top + 'px';
        clone.style.zIndex = '1000';
        clone.style.pointerEvents = 'none';
        clone.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        document.body.appendChild(clone);

        // Запуск анимацию
        requestAnimationFrame(() => {
            const deltaX = targetRect.left + targetRect.width / 2 - startRect.left - startRect.width / 2;
            const deltaY = targetRect.top + targetRect.height / 2 - startRect.top - startRect.height / 2;

            clone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.3)`;
            clone.style.opacity = '0.5';
        });


        setTimeout(() => {
            clone.remove();
            if (callback) callback();
        }, 850); // Чуть больше, чем время transition
    }

    renderCart();
});