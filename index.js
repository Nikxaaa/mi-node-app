
const fio = "Никита Ваш_Фамилия_Имя";
const group = "Ваша-Группа-123";      
const journalNumber = 5;               



function calculatePi(digits) {
    if (digits === 0) return "3";
    
    
    const DIGITS_PER_TERM = 14n;
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
        
        if (k % 2n === 1n) {
            sumA -= termA;
            sumB -= termB;
        } else {
            sumA += termA;
            sumB += termB;
        }
        k++;
    }
    
    const C = 426880n * 10005n ** 5n / 10n; 
    const piLarge = (C * ONE) / (13591409n * sumA + 545140134n * sumB);
    
    const piStr = piLarge.toString().slice(0, digits + 1);
    return piStr[0] + "." + piStr.slice(1);
}

console.log(fio);
console.log(group);
console.log(calculatePi(journalNumber));
