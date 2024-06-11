
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

export {sortArrayByAttribute};