// Задача 1. Печатное издание

// Базовый класс PrintEditionItem
class PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this._state = 100;
        this.type = null;
    }

    // Геттер для state
    get state() {
        return this._state;
    }

    // Сеттер для state с валидацией
    set state(newState) {
        if (newState < 0) {
            this._state = 0;
        } else if (newState > 100) {
            this._state = 100;
        } else {
            this._state = newState;
        }
    }

    // Метод fix - увеличивает state в 1.5 раза
    fix() {
        this.state = this._state * 1.5;
    }
}

// Класс Magazine (журнал)
class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.type = "magazine";
    }
}

// Класс Book (книга)
class Book extends PrintEditionItem {
    constructor(author, name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.author = author;
        this.type = "book";
    }
}

// Класс NovelBook (роман)
class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "novel";
    }
}

// Класс FantasticBook (фантастика)
class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "fantastic";
    }
}

// Класс DetectiveBook (детектив)
class DetectiveBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "detective";
    }
}

// Задача 2. Библиотека

class Library {
    constructor(name) {
        this.name = name;
        this.books = [];
    }

    // Добавление книги в библиотеку (только если state > 30)
    addBook(book) {
        if (book.state > 30) {
            this.books.push(book);
        }
    }

    // Поиск книги по ключу и значению
    findBookBy(type, value) {
        for (let i = 0; i < this.books.length; i++) {
            if (this.books[i][type] === value) {
                return this.books[i];
            }
        }
        return null;
    }

    // Выдача книги по названию
    giveBookByName(bookName) {
        for (let i = 0; i < this.books.length; i++) {
            if (this.books[i].name === bookName) {
                const book = this.books[i];
                this.books.splice(i, 1);
                return book;
            }
        }
        return null;
    }
}

// Задача 3. Журнал успеваемости (дополнительное задание)

class Student {
    constructor(name) {
        this.name = name;
        this.marks = {};
    }

    // Добавление оценки по предмету
    addMark(mark, subject) {
        // Валидация оценки (2-5)
        if (mark < 2 || mark > 5) {
            return;
        }

        // Если предмета нет в marks, создаем новый массив
        if (!this.marks[subject]) {
            this.marks[subject] = [];
        }

        this.marks[subject].push(mark);
    }

    // Получение средней оценки по предмету
    getAverageBySubject(subject) {
        // Если предмета нет, возвращаем 0
        if (!this.marks[subject] || this.marks[subject].length === 0) {
            return 0;
        }

        const sum = this.marks[subject].reduce((acc, mark) => acc + mark, 0);
        return sum / this.marks[subject].length;
    }

    // Получение общей средней оценки по всем предметам
    getAverage() {
        const subjects = Object.keys(this.marks);

        if (subjects.length === 0) {
            return 0;
        }

        const totalSum = subjects.reduce((acc, subject) => {
            return acc + this.getAverageBySubject(subject);
        }, 0);

        return totalSum / subjects.length;
    }
}