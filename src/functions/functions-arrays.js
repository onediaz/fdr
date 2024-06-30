
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

/**
 * Tables contain 
 * @param {Array} tables array of Table DB objects
 * @param {Array} students array of Student DB objects
 * @returns Array 
 */
function getStudentsFromTables (tables, students) {
    let nonSeatedStudents = [];
    let seatedStudents = new Set();
    for (let table of tables) {
        let tTable = table.students;
        for (let student of tTable) {
            seatedStudents.add(student);
        }
    }
    for (let student of students) {
        if(seatedStudents.has(student.name)) {
            continue;
        } else {
            nonSeatedStudents.push({...student, 'tableId': 'remaining'});
        }
    }
    console.log(nonSeatedStudents);
    return nonSeatedStudents;
}

function handleDragAndDrop(remainingStudents, tables, result) {
    let source = [];
    let dest = [];
    let sourceId = result.source.droppableId;
    let destId = result.destination.droppableId;

    if(sourceId === destId) {
        if (sourceId === 'remaining') {
            const items = Array.from(remainingStudents);
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem);
            return [items, tables];
        } else {
            let sourceIndex = tables.findIndex(table => table.id === sourceId);
            // const table = JSON.parse(tables[sourceIndex].students);
            const table = tables[sourceIndex].students;
            // source = table.users;

            const items = Array.from(table);
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem);

            // table.students = items;
            // tables[sourceIndex].students = JSON.stringify(table);

            let copyTable = [...tables];
            copyTable[sourceIndex].students = items;

            return [remainingStudents, copyTable];
        }
    }
    else {
        let sourceIndex = tables.findIndex(table => table.id === sourceId);
        let destIndex = tables.findIndex(table => table.id === destId);
        if (sourceIndex === -1) {
            source = Array.from(remainingStudents);
            // const table = JSON.parse(tables[destIndex].students);
            const table = tables[destIndex].students;
            // dest = table.users;

            const [reorderedItem] = source.splice(result.source.index, 1);
            // dest.splice(result.destination.index, 0, reorderedItem);
            table.splice(result.destination.index, 0, reorderedItem);

            // table.users = dest;
            // let copyTable = [...tables];
            // copyTable[destIndex].students = JSON.stringify(table);
            tables[destIndex].students = table;

            // console.log(source, copyTable);
            return [source, tables];
        }
        return [remainingStudents, tables];
    }

}


export {sortArrayByAttribute, removeDuplicates, getStudentsFromTables, handleDragAndDrop};