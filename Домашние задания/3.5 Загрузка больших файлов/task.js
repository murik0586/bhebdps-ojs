
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const fileInput = document.getElementById('file');
    const progress = document.getElementById('progress');

    form.addEventListener('submit', (event) => {
        event.preventDefault();


        if (fileInput.files.length === 0) {
            alert('Пожалуйста, выберите файл.');
            return;
        }

        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file);

        const xhr = new XMLHttpRequest();


        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                const percentComplete = event.loaded / event.total;
                progress.value = percentComplete;
            }
        });


        xhr.addEventListener('load', () => {
            if (xhr.status === 201 || xhr.status === 200) {
                alert('Файл успешно загружен!');
                progress.value = 0; // Сброс прогресса
                form.reset(); // Очистка формы
                // Обновляем отображение имени файла
                const fileDesc = document.querySelector('.input__wrapper-desc');
                if (fileDesc) {
                    fileDesc.textContent = 'Имя файла...';
                }
            } else {
                alert(`Ошибка загрузки: ${xhr.status} ${xhr.statusText}`);
            }
        });


        xhr.addEventListener('error', () => {
            alert('Произошла ошибка сети. Попробуйте позже.');
        });

        xhr.addEventListener('abort', () => {
            alert('Загрузка была прервана.');
        });


        xhr.open('POST', form.action);
        xhr.send(formData);
    });
});