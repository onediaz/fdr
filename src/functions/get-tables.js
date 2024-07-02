import { generateClient } from "aws-amplify/api";
import { listStudentTables, listStudents } from '../graphql/queries';
const client = generateClient();

/**
 * 
 * @param {String} name 
 */
async function getTablesByClassroomName(name, students) {
    try {
        const classroom = await client.graphql({
            query: listStudentTables,
            variables: {
                filter: {
                    name: {
                        eq: name
                    }
                }
            }
        });
        let tables = [];
        let tableStudents = [];
        // go through each table object and create a JSON object that is more user friendly to use than what is fetched
        for (let table of classroom.data.listStudentTables.items) {
            let t = {
                'name': '',
                'classroom': '',
                'students': [],
                'id': ''
            };
            t.name = table.name;
            t.id = table.id;
            t.classroom = table.classroom;
            tableStudents = JSON.parse(table.students);
            // for each student in the table get the actual student object
            for (let tStudent of tableStudents) {
                let student = students.find(stud => stud.id === tStudent.id);
                if(student) {
                    t.students.push(student);
                }
            }
            tables.push(t);
        }
        return tables;
        // return classroom.data.listClassrooms.items[0];
    } catch(error) {
        console.log(error);
        console.log('failed to get transaction by ID');
        return [];
    }
}

export {getTablesByClassroomName};