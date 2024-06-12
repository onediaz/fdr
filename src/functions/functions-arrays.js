
function sortArrayByAttribute (key, direction, array) {
    try {
        const sortedArray = [...array].sort((a,b) => {
            if (direction === 'ascending') {
                if (key === 'likes') {
                    const aLikes = JSON.parse(a[key]);
                    const bLikes = JSON.parse(b[key]);
                    return aLikes.total - bLikes.total;
                } else if (typeof a[key] === 'number') {
                    return a[key] - b[key];
                } else {
                    return a[key].localeCompare(b[key]);
                }
            } else {
                if (key === 'likes') {
                    const aLikes = JSON.parse(a[key]);
                    const bLikes = JSON.parse(b[key]);
                    return bLikes.total - aLikes.total;
                } else if (typeof a[key] === 'number') {
                    return b[key] - a[key];
                } else {
                    return b[key].localeCompare(a[key]);
                }
            }
        });
        console.log(sortedArray)
        return sortedArray;
    } catch(error) {
        return [];
    }
}

/**
 * 
 * @param {Array} array, must be sorted, where each item is an object that contains the attribute key
 * @param {String} key attribute within each item of Array 
 * @returns 
 */
function removeDuplicates (array, key) {
    let insert_index = 1;
    for (let i = 1; i < array.length; i++) {
        if (array[i][key] === array[i-1][key]) {
            continue;
        }
        if (insert_index !== i) {
            array[insert_index][key] = array[i][key];
         }
        insert_index += 1;
    }
    return array.splice(0,insert_index);
}

export {sortArrayByAttribute, removeDuplicates};