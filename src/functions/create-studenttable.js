import { generateClient } from "aws-amplify/api";
// import { createStudent } from './graphql/mutations.js';
import { createStudentTable } from '../graphql/mutations';
const client = generateClient();

async function createTableForStudents(name, classroom="default") {
    try {
        console.log("Creating Student Table");
        const newStudentTable = await client.graphql({
            query: createStudentTable,
            variables: {
              input: {
                name: name, 
                students: "{\"users\": []}",
                classroom: classroom
              }
            }
          });
        console.log(newStudentTable.data.createStudentTable);
        console.log('success creating student table');
        return newStudentTable.data.createStudentTable;

    } catch (error) {
        console.log('Error creating student table');
        return new Map();
    }
}

export {createTableForStudents};