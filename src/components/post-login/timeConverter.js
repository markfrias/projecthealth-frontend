import moment from "moment"

// Accepts an array of time and returns an array of time converted to strings
// Returns in chronological order
export function convertTimesToStrings(array) {
    const convertedItems = array.map((item) => {
        let convertedItem;
        let newFormat;
        newFormat = moment(new Date(item)).format("HH");
        //console.log(newFormat)
        switch (newFormat) {
            case '00':
                convertedItem = 'midnight';
                break;
            case '01':
                convertedItem = 'one';
                break;
            case '02':
                convertedItem = 'two';
                break;
            case '03':
                convertedItem = 'three';
                break;
            case '04':
                convertedItem = 'four';
                break;
            case '05':
                convertedItem = 'five';
                break;
            case '06':
                convertedItem = 'six';
                break;
            case '07':
                convertedItem = 'seven';
                break;
            case '08':
                convertedItem = 'eight';
                break;
            case '09':
                convertedItem = 'nine';
                break;
            case '10':
                convertedItem = 'ten';
                break;
            case '11':
                convertedItem = 'eleven';
                break;
            case '12':
                convertedItem = 'twelve';
                break;
            case '13':
                convertedItem = 'thirteen';
                break;
            case '14':
                convertedItem = 'fourteen';
                break; case '15':
                convertedItem = 'fifteen';
                break;
            case '16':
                convertedItem = 'sixteen';
                break;
            case '17':
                convertedItem = 'seventeen';
                break;
            case '18':
                convertedItem = 'eighteen';
                break;
            case '19':
                convertedItem = 'nineteen';
                break;
            case '20':
                convertedItem = 'twenty';
                break;
            case '21':
                convertedItem = 'twentyOne';
                break;
            case '22':
                convertedItem = 'twentyTwo';
                break;
            case '23':
                convertedItem = 'twentyThree';
                break;
            default:
                convertedItem = 'twelve';
                break;


        }

        return convertedItem;
    })

    return convertedItems;
}