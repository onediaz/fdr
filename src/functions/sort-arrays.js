
function sortArrayByAttribute (key, direction, array) {
    try {
        const sortedStudents = [...array].sort((a,b) => {
            if (direction === 'ascending') {
                if (typeof a[key] === 'number') {
                    return a[key] - b[key];
                } else {
                    return a[key].localeCompare(b[key]);
                }
            } else {
                if (typeof a[key] === 'number') {
                    return b[key] - a[key];
                } else {
                    return b[key].localeCompare(a[key]);
                }
            }
        });
        return sortedStudents;
    } catch(error) {
        return [];
    }
}

export {sortArrayByAttribute};