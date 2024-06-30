
async function updateStudentTables(selectedStudents, table, tables, remainingStudents, students) {
    try {
        console.log('Calling UpdateStudentTables');
        let newTableIndex = tables.findIndex(t => t.id === table.id);
        for (let student of selectedStudents) {
            if (student.tableId === table.id) {
                console.log('Student already in table');
                continue;
            } else if (student.tableId === 'remaining'){
                console.log('Student in remaining table');
                remainingStudents = remainingStudents.filter(s => s.id !== student.id);
                tables[newTableIndex].students.push({...student, 'tableId': table.id});
            } else {
                let oldTableIndex = tables.findIndex(t=> t.id === student.tableId);
                // removing student from old table
                let oldTableStudents = tables[oldTableIndex].students.filter(s => s.id !== student.id)
                tables[oldTableIndex].students = oldTableStudents;
                // adding student to new table
                tables[newTableIndex].students.push({...student, 'tableId': table.id});
            }
        }

        return [tables, remainingStudents];

    } catch (error) {
        console.log('Failed to update StudentTables');
        console.log(error);
    }
}

export {updateStudentTables}