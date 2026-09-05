const http = require('http');


const fio = "Вероника Грудская";
const group = "401";      
const journalNumber = 5;               



function calculatePi(digits) {
    if (digits === 0) return "3";
    const terms = BigInt(Math.ceil(digits / 14)) + 1n;
    const DIGITS = BigInt(digits);
    const ONE = 10n ** (DIGITS + 20n);
    let k = 0n;
    let sumA = 0n;
    let sumB = 0n;
    let a_k = ONE;
    while (k < terms) {
        if (k > 0n) {
            const num = 12n * (6n * k - 5n) * (2n * k - 1n) * (6n * k - 1n);
            const den = k * k * k * 26680n * 640320n * 640320n;
            a_k = (a_k * num) / den;
        }
        const termA = a_k;
        const termB = termA * k;
        if (k % 2n === 1n) { sumA -= termA; sumB -= termB; } 
        else { sumA += termA; sumB += termB; }
        k++;
    }
    const C = 426880n * 10005n ** 5n / 10n;
    const piLarge = (C * ONE) / (13591409n * sumA + 545140134n * sumB);
    const piStr = piLarge.toString().slice(0, digits + 1);
    return piStr + "." + piStr.slice(1);
}


const server = http.createServer((req, res) => {
 
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    
    const piResult = calculatePi(journalNumber);

    
    res.end(`
        <h2>Информация о студенте:</h2>
        <p><b>ФИО:</b> ${fio}</p>
        <p><b>Группа:</b> ${group}</p>
        <p><b>Число ПИ (до ${journalNumber} знака):</b> ${piResult}</p>
    `);
});


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер успешно запущен! Откройте браузер и перейдите по адресу: http://localhost:${PORT}`);
});
