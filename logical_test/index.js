const readlineSync = require('readline-sync');


const customSort = (a,b) => {
    const result = a.grade.localeCompare(b.grade);
    if (result == 0) {
        return b.point - a.point
    }
    return result
}

(async () => {
    console.log('')
    console.log(`
        1. Write an efficient function that will find the second largest number in an array of unsorted integers.
        2. Please create a function which can get the name in case of sort the people in grade order asc then
        point order desc
        3. Palindrom
    `);

    const menuChoose = readlineSync.question('Pilih soal test : ')
    const menuWhitelist = ['1', '2', '3'];

    if (menuWhitelist.includes(menuChoose)) {
        if (menuChoose.includes('1')) {
            const inputData = readlineSync.question('Input (ex. 12 5 7 17 8 0 -1 16 7) : ');
            const inputDataToArray = inputData.split(' ').map(x => { return parseInt(x) });
            inputDataToArray.sort((a, b) => {
                return a - b;
            });
            console.log(`Output : ${inputDataToArray[inputDataToArray.length - 2]}`)
        }

        if (menuChoose.includes('2')) {
            const inputData = [
                'evan|50000|D',
                'jefry|70000|C',
                'rizky|30000|D',
                'hanson|10000|B',
                'candra|30000|A',
                'goklas|20000|A',
                'hendra|20000|B',
                'surya|30000|A',
            ]

            console.log(`Input data : ${JSON.stringify(inputData, 0, 2)}`)
            const inputDataToArray = inputData.map(x => {
                return {
                    name: x.split('|')[0],
                    point: parseInt(x.split('|')[1]),
                    grade: x.split('|')[2]
                }
            });
            inputDataToArray.sort(customSort);
            console.log(`Output : ${inputDataToArray.map(x => x.name).join(',')}`)
        }

        if (menuChoose.includes('3')) {
            const inputData = readlineSync.question('Input (ex. racecar) : ');
            const inputDataToArray = inputData.split('').reverse().join('')
            if (inputData.toLowerCase() == inputDataToArray.toLowerCase()) {
                console.log('Output : palindrom')
            }else{
                console.log('Output : not palindrom')
            }
            
        }



    } else {
        console.log('Menu tidak ada dalam list.')
        process.exit(0)
    }

})()