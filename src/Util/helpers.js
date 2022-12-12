import moment from 'moment'

// export default function isEmpty(obj) {
//     for(let key in obj) {
//         if(obj.hasOwnProperty(key))
//             return false;
//     }
//     return true;
// }

export const isEmptyJson = (obj) => {
    return JSON.stringify(obj) === '{}';
}

// get concatenated hours in the form ['09:00-10:00', '10:00-11:00'] from 
// a list of working hours in the form ['09:00', '10:00', '11:00']
export const getConcatedWorkingHours = (working_hours) => {
    let arr = []
    for (let i = 0; i < working_hours.length; i++) {
        // const concat = working_hours[i] + ' - '+ working_hours[i+1];
        // let end = new moment(working_hours[i])
        const concat = working_hours[i] + ' - '+ moment(working_hours[i], "HH:mm").add({hour: 1}).format('HH:mm');
        arr.push(concat)
    }
    return arr
}