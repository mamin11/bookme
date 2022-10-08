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