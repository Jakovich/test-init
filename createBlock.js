'use strict';

// Генератор файлов блока

// Использование: node createBlock.js [имя блока] [доп. расширения через пробел]

const fs = require('fs');

let blockName = process.argv[2]; // получим имя блока
let extensions = ['less', 'pug']; // расширения по умолчанию

// Если есть имя блока
if (blockName) {

    // Если какая-то ошибка — покажем

    // Обходим массив расширений и создаем файлы, если они еще не созданы
    extensions.forEach(function(extention) {


        let fileContent = ''; // будущий контент файла
        let fileCreateMsg = ''; // будущее сообщение в консоли при создании файла
        let filePath;

        if (extention == 'less') {
            fileContent = '// В этом файле должны быть стили только для БЭМ-блока ' + blockName + ', его элементов, \n// модификаторов, псевдоселекторов, псевдоэлементов, @media-условий...\n// Не пишите здесь другие селекторы.\n\n.' + blockName + ' {\n  \n}\n';

            filePath = 'less/blocks/' + blockName + '.' + extention;


        } else if (extention == 'pug') {
            fileContent = '//' + blockName;
            filePath = 'pug/includes/' + blockName + '.' + extention;
        }



        // Создаем файл, если он еще не существует
        if (fileExist(filePath) === false) {
            fs.writeFile(filePath, fileContent, function(err) {
                if (err) {
                    return console.log('[NTH] Файл НЕ создан: ' + err);
                }
                console.log('[NTH] Файл создан: ' + filePath);
                if (fileCreateMsg) {
                    console.warn(fileCreateMsg);
                }
            });
        }

    });
} else {
    console.log('[NTH] Отмена операции: не указан блок');
}



function fileExist(path) {
    const fs = require('fs');
    try {
        fs.statSync(path);
    } catch (err) {
        return !(err && err.code === 'ENOENT');
    }
}
