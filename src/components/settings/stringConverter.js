// Accepts an array of time and returns an array of time converted to strings
// Returns in chronological order
export function convertStringToTime(strings) {
    const convertedItems = strings.map((item) => {
        let convertedItem;
        let newFormat = item.reminderTime;

        switch (newFormat) {
            case 'midnight':
                convertedItem = '00';
                break;
            case 'one':
                convertedItem = '01';
                break;
            case 'two':
                convertedItem = '02';
                break;
            case 'three':
                convertedItem = '03';
                break;
            case 'four':
                convertedItem = '04';
                break;
            case 'five':
                convertedItem = '05';
                break;
            case 'six':
                convertedItem = '06';
                break;
            case 'seven':
                convertedItem = '07';
                break;
            case 'eight':
                convertedItem = '08';
                break;
            case 'nine':
                convertedItem = '09';
                break;
            case 'ten':
                convertedItem = '10';
                break;
            case 'eleven':
                convertedItem = '11';
                break;
            case 'twelve':
                convertedItem = '12';
                break;
            case 'thirteen':
                convertedItem = '13';
                break;
            case 'fourteen':
                convertedItem = '14';
                break; case 'fifteen':
                convertedItem = '15';
                break;
            case 'sixteen':
                convertedItem = '16';
                break;
            case 'seventeen':
                convertedItem = '17';
                break;
            case 'eighteen':
                convertedItem = '18';
                break;
            case 'nineteen':
                convertedItem = '19';
                break;
            case 'twenty':
                convertedItem = '20';
                break;
            case 'twentyOne':
                convertedItem = '21';
                break;
            case 'twentyTwo':
                convertedItem = '22';
                break;
            case 'twentyThree':
                convertedItem = '23';
                break;
            default:
                convertedItem = '12';
                break;


        }
        const newItem = new Date(`2018-01-01T${convertedItem}:00:00.0008`)
        return newItem;
    })

    return convertedItems;
}