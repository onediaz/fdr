import { generateClient } from "aws-amplify/api";
import { listStudentTables } from '../graphql/queries';
const client = generateClient();

/**
 * 
 * @param {String} name 
 */
async function getTablesByClassroomName(name) {
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
        return classroom.data.listStudentTables.items;
        // return classroom.data.listClassrooms.items[0];
    } catch(error) {
        console.log('failed to get transaction by ID');
        return [];
    }
}

export {getTablesByClassroomName};