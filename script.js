window.onload = function() {
    // Переменные для хранения чисел и операций


    let a = '';
    let b = '';
    let expressionResult = '';
    let selectedOperation = null;
    let lastResult = null;  // для накапливаемых операций

    // Получаем доступ к экрану калькулятора
    const outputElement = document.getElementById("result");

    // Получаем все кнопки с цифрами
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

    // Функция вычисления факториала (цикл)
    function factorial(n) {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    // Функция обработки нажатия на цифровые кнопки
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {

            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                a += digit;
            }
            outputElement.innerHTML = a;
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit;
                outputElement.innerHTML = b;
            }
        }
    }

    // Настраиваем обработчики для цифровых кнопок
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    document.getElementById("btn_bg_color").onclick = function() {
        let colors = ['#f0f0f0', '#ffe6e6', '#e6ffe6', '#e6e6ff', '#fff0e6'];
        let currentColor = document.body.style.backgroundColor;
        let nextColor = colors[(colors.indexOf(currentColor) + 1) % colors.length] || colors[0];
        document.body.style.backgroundColor = nextColor;
    }


    document.getElementById("btn_op_sqrt").onclick = function() {
        let current = outputElement.innerHTML;
        let newValue = Math.sqrt(Number(current));
        outputElement.innerHTML = newValue;
        if (!selectedOperation) {
            a = newValue.toString();
        } else {
            b = newValue.toString();
        }
    }

    // ========== ЗАДАНИЕ 3: Возведение в квадрат x² (умножить на само себя) ==========
    document.getElementById("btn_op_square").onclick = function() {
        let current = outputElement.innerHTML;
        let num = Number(current);
        let newValue = num * num;  // умножаем число на само себя
        outputElement.innerHTML = newValue;
        if (!selectedOperation) {
            a = newValue.toString();
        } else {
            b = newValue.toString();
        }
    }

    // ========== ЗАДАНИЕ 4: Факториал x! (цикл) ==========
    document.getElementById("btn_op_factorial").onclick = function() {
        let current = outputElement.innerHTML;
        let num = Number(current);
        if (num < 0 || !Number.isInteger(num)) {
            outputElement.innerHTML = "Ошибка";
            return;
        }
        let newValue = factorial(num);
        outputElement.innerHTML = newValue;
        if (!selectedOperation) {
            a = newValue.toString();
        } else {
            b = newValue.toString();
        }
    }

    // ========== ЗАДАНИЕ 5: Добавление трех нулей 000 ==========
    document.getElementById("btn_op_000").onclick = function() {
        let current = outputElement.innerHTML;
        if (current === '0') return;
        let newValue = current + '000';  // просто добавляем "000" к строке
        outputElement.innerHTML = newValue;
        if (!selectedOperation) {
            a = newValue;
        } else {
            b = newValue;
        }
    }

    // ========== ЗАДАНИЕ 6 + 7: Накапливаемое сложение и вычитание ==========
    document.getElementById("btn_op_plus").onclick = function() {
        if (a === '') return;
        if (lastResult !== null) {
            a = lastResult.toString();  // сохраняем предыдущий результат
        }
        selectedOperation = '+';
    }

    document.getElementById("btn_op_minus").onclick = function() {
        if (a === '') return;
        if (lastResult !== null) {
            a = lastResult.toString();  // сохраняем предыдущий результат
        }
        selectedOperation = '-';
    }


    document.getElementById("btn_result_color").onclick = function() {
        let colors = ['#f0f0f0', '#ffcccc', '#ccffcc', '#ccccff', '#ffffcc'];
        let currentColor = outputElement.style.backgroundColor;
        let nextColor = colors[(colors.indexOf(currentColor) + 1) % colors.length] || colors[0];
        outputElement.style.backgroundColor = nextColor;  // меняем цвет экрана
    }

    // Кнопка смены знака +/-
    document.getElementById("btn_op_plusminus").onclick = function() {
        let current = outputElement.innerHTML;
        let newValue = Number(current) * (-1);
        outputElement.innerHTML = newValue;
        if (!selectedOperation) {
            a = newValue.toString();
        } else {
            b = newValue.toString();
        }
    }

    // Кнопка процента %
    document.getElementById("btn_op_proc").onclick = function() {
        let current = outputElement.innerHTML;
        let result = Number(current) / 100;
        outputElement.innerHTML = result;
        if (!selectedOperation) {
            a = result.toString();
        } else {
            b = result.toString();
        }
    }

    // Кнопка backspace ⌫
    document.getElementById("btn_op_back").onclick = function() {
        let current = outputElement.innerHTML;
        if (current === '0' || current.length === 1) {
            outputElement.innerHTML = '0';
            if (!selectedOperation) {
                a = '0';
            } else {
                b = '0';
            }
        } else {
            let newValue = current.slice(0, -1);
            outputElement.innerHTML = newValue;
            if (!selectedOperation) {
                a = newValue;
            } else {
                b = newValue;
            }
        }
    }

    // Кнопка умножения
    document.getElementById("btn_op_mult").onclick = function() {
        if (a === '') return;
        selectedOperation = 'x';
    }
    this.document.getElementById("btn_op_mod").onclick = function() {
        if (a === '') return;
        selectedOperation = 'mod';
    }

    // Кнопка деления
    document.getElementById("btn_op_div").onclick = function() {
        if (a === '') return;
        selectedOperation = '/';
    }

    // Кнопка очистки
    document.getElementById("btn_op_clear").onclick = function() {
        a = '';
        b = '';
        selectedOperation = null;
        expressionResult = '';
        outputElement.innerHTML = '0';
        lastResult = null;
    }

    // Кнопка равно (с накоплением)
    document.getElementById("btn_op_equal").onclick = function() {
        if (a === '' || b === '' || !selectedOperation) {
            return;
        }

        switch(selectedOperation) {
            case 'mod':
                res0 = Math.floor((+a)/(+b));
                expressionResult = (+a) - (res0 * (+b));
                break;
            case 'x':
                expressionResult = (+a) * (+b);
                break;
            case '+':
                expressionResult = (+a) + (+b);
                break;
            case '-':
                expressionResult = (+a) - (+b);
                break;
            case '/':
                if (+b === 0) {
                    outputElement.innerHTML = "Ошибка";
                    return;
                }
                expressionResult = (+a) / (+b);
                break;
            default:
                break;
        }

        // Сохраняем результат для накопления
        lastResult = expressionResult;

        a = expressionResult.toString();
        b = '';
        selectedOperation = null;
        outputElement.innerHTML = a;
    }
};
