
inOutputDataStudents();
let height = prompt('Введите, пожалуйста, высоту треугольника');
drawTriangle(height);
drawRewerseTriangle(height);

let email = prompt('Введите пожалуйста почту');
verifyEmail(email);

/* Задача 1 */
function inOutputDataStudents() {
    var line = getAboutStudent();
    outputInfo(line);
}

function getAboutStudent() {
    var name = prompt('Ваше имя');
    var lastName = prompt('Ваша фамилия');
    var otchestvo = prompt('Ваше отчество');
    var group = prompt('Номер группы');

    return [
        'Домашняя работа "Функции"',
        `Выполнил: студент гр.${group}`,
        `${lastName} ${name} ${otchestvo}`,
    ];

}


function outputInfo(outLine) {
    var maxCount = outLine[0];

    for (let i =0; i < outLine.length; i++) {
        let lengthSubstr = outLine[i].length;
        maxCount = (maxCount > lengthSubstr) ? maxCount : lengthSubstr;
    }

    maxCount += 2;
    var ramka = '*'.repeat(maxCount);

    console.log(ramka);
    for (let i =0; i < outLine.length; i++) {

        let lengthSubstr = outLine[i].length;
        let countSpaces = maxCount - (lengthSubstr + 2);
        let spaces = (countSpaces) ? ' '.repeat(countSpaces) : '';

        console.log(`*${outLine[i]}${spaces}*`);
    }
    console.log(ramka);
}

/* Задача 2 */

function drawTriangle(height, spaceCount = 0) {

    if(!height) {
        return;
    }

    drawTriangle(height - 1, spaceCount + 1);
    var starsCount = (2 * height) - 1;
    console.log(' '.repeat(spaceCount) + '*'.repeat(starsCount));
}

function drawRewerseTriangle(height) {
    console.log('Перевернутый треугольник');

    if(!height) {
        return;
    }

    var starsCount
    for(let i = height, spaceCount = 0; i > 0; i--, spaceCount++) {
        starsCount = (2 * i) - 1;
        console.log(' '.repeat(spaceCount) + '*'.repeat(starsCount));
    }
}

/*
Задача 3*/

function verifyEmail(email) {

    if(!hasTrueSymbols(email)) {
        console.log('Почта может содержать только буквы латинского алфавита и цифры, @, -, _, .');
        return;
    }

    if(!hasTrueFstAndLstSmbl(email)) {
        console.log('Почта не может начинаться или оканчиваться на "_,-, @, .');
        return;
    }

    if(wrongSmblInRow(email)) {
        console.log('Почта не может содержать повторяющиеся друг за другом "_,-, @, .');
        return;
    }

    if(hasAnyDog(email)) {
        console.log('Почта не может содержать несколько символов @');
        return;
    }

    if(!trueLengthEmail(email)) {
        console.log('Имя почты до знака @ должна быть больше 2');
        return;
    }

    if(!hasDotes(email)) {
        console.log('Имя почты после @ должно иметь точку');
        return;
    }

    if(!verifyDigit(email)) {
        console.log('Имя почты не может начинаться с цифры, и(или) не может состоять только из цифры');
        return;
    }

    if(!verifyDomen(email)) {
        console.log('Имя почты не может содержать домен (.ru, .by ...) длиной менее 2 символов и более 11 символов');
        return;
    }

}

function hasTrueSymbols(email){
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwyz0123456789-_@.';

    for (let i = 0; i < email.length; i++) {
        if(alphabet.indexOf(email[i]) === -1) {
            return false;
        }
    }

    return true;
}

function hasTrueFstAndLstSmbl(email) {
    var wrongSymbol = '@-_.';

    if (
        (wrongSymbol.indexOf(email[0]) === 0) ||
        (wrongSymbol.indexOf(email[email.length - 1]) !== -1)
    ) {
        return false;
    }
    return true;
}

function wrongSmblInRow(email) {

    var wrongSymbol = '@-_.';

    for (let i = 0; i < email.length; i++) {
        var pos = wrongSymbol.indexOf(email[i]);

        if(pos !== -1) {
            if(wrongSymbol.indexOf(email[i + 1]) !== -1) {
                return true;
            }
        }
    }
    return false;
}

function hasAnyDog(email) {
    var countDog = 0;

    for (let i = 0; i < email.length; i++) {
        if(email[i] === '@') {
            countDog++;
        }
    }

    return (countDog > 1);
}

function trueLengthEmail(email) {
    var countSmblBeforeDog = 0;
    for (let i = 0; i < email.length; i++) {
        if(email[i] === '@') {
            break;
        }
        countSmblBeforeDog++;
    }

    return (countSmblBeforeDog > 2);
}

function hasDotes(email) {
    var countDotes = 0;

    for (let i = 0; i < email.length; i++) {

        if (email[i] === '@') {

            for(let k = i + 2; k < email.length; k++) {
                if(email[k] === '.') {
                    countDotes++;
                }
            }
        }
    }

    return (countDotes > 0);
}

function verifyDigit(email) {
    if('0123456789'.indexOf(email[0]) === 0) {
        return false;
    }

    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwyz';

    if(alphabet.indexOf(email[0]) === -1) {
        return false;
    }

    return true;
}

function verifyDomen(email) {
    var countDomen = 0;

    var lastDotes = email.lastIndexOf('.');
    var dog = email.indexOf('@');

    if(lastDotes === -1 || dog === -1) {
        return false;
    }

    /*если точка идет до собачки*/
    if(lastDotes < dog) {
        return false;
    }

    for (let i = lastDotes + 1; i < email.length; i++) {
        countDomen++;
    }

    return ((countDomen >= 2) && (countDomen <= 11));
}
