
async function updateStudentTables(selectedStudents, table, tables, remainingStudents, students) {
    try {
        let newTableIndex = tables.findIndex(t => t.id === table.id);
        for (let student of selectedStudents) {
            if (student.tableId === table.id) {
                continue;
            } else if (student.tableId === 'remaining'){
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
        console.log(error);
    }
}

export {updateStudentTables}