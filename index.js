// ================= НАСТРОЙКА ДАННЫХ СТУДЕНТА =================
const fio = "Никита Ваш_Фамилия_Имя"; // Укажите ваши ФИО
const group = "Ваша-Группа-123";      // Укажите вашу группу
const journalNumber = 5;               // УКАЖИТЕ ВАШ НОМЕР ПО ЖУРНАЛУ
// =============================================================

// Функция вычисления числа Пи до N знаков после запятой (алгоритм Чудновского)
function calculatePi(digits) {
    if (digits === 0) return "3";
    
    // Используем BigInt для вычислений высокой точности
    const DIGITS_PER_TERM = 14n;
    const terms = BigInt(Math.ceil(digits / 14)) + 1n;
    
    const DIGITS = BigInt(digits);
    const ONE = 10n ** (DIGITS + 20n); // Запас точности для промежуточных вычислений
    
    let k = 0n;
    let sumA = 0n;
    let sumB = 0n;
    
    let a_k = ONE;
    
    while (k < terms) {
        if (k > 0n) {
            // Рекуррентное соотношение для членов ряда
            const num = 12n * (6n * k - 5n) * (2n * k - 1n) * (6n * k - 1n);
            const den = k * k * k * 26680n * 640320n * 640320n;
            a_k = (a_k * num) / den;
        }
        
        const termA = a_k;
        const termB = termA * k;
        
        if (k % 2n === 1n) {
            sumA -= termA;
            sumB -= termB;
        } else {
            sumA += termA;
            sumB += termB;
        }
        k++;
    }
    
    const C = 426880n * 10005n ** 5n / 10n; // Скорректированная константа
    const piLarge = (C * ONE) / (13591409n * sumA + 545140134n * sumB);
    
    // Форматируем результат в строку с точкой
    const piStr = piLarge.toString().slice(0, digits + 1);
    return piStr[0] + "." + piStr.slice(1);
}

// Вывод информации в консоль ровно в 3 строки
console.log(fio);
console.log(group);
console.log(calculatePi(journalNumber));
