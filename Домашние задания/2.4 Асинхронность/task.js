class AlarmClock {
    constructor() {
        this.alarmCollection = [];
        this.intervalId = null;
    }

    addClock(time, callback) {
        // Проверка наличия обязательных аргументов
        if (!time || !callback) {
            throw new Error('Отсутствуют обязательные аргументы');
        }

        // Проверка на наличие звонка с таким же временем
        const existingAlarm = this.alarmCollection.find(alarm => alarm.time === time);
        if (existingAlarm) {
            console.warn('Уже присутствует звонок на это же время');
        }

        // Добавление нового звонка
        this.alarmCollection.push({
            time: time,
            callback: callback,
            canCall: true
        });
    }

    removeClock(time) {
        // Удаляем все звонки с указанным временем
        this.alarmCollection = this.alarmCollection.filter(alarm => alarm.time !== time);
    }

    getCurrentFormattedTime() {
        // Возвращаем текущее время в формате HH:MM
        return new Date().toLocaleTimeString("ru-Ru", {
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    start() {
        // Если интервал уже существует, завершаем выполнение
        if (this.intervalId !== null) {
            return;
        }

        // Создаем новый интервал
        this.intervalId = setInterval(() => {
            const currentTime = this.getCurrentFormattedTime();

            // Перебираем все звонки
            this.alarmCollection.forEach(alarm => {
                // Проверяем, нужно ли запустить звонок
                if (alarm.time === currentTime && alarm.canCall === true) {
                    alarm.canCall = false;
                    alarm.callback();
                }
            });
        }, 1000);
    }

    stop() {
        // Останавливаем интервал
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    resetAllCalls() {
        // Сбрасываем возможность запуска всех звонков
        this.alarmCollection.forEach(alarm => {
            alarm.canCall = true;
        });
    }

    clearAlarms() {
        // Останавливаем интервал
        this.stop();
        // Очищаем все звонки
        this.alarmCollection = [];
    }
}