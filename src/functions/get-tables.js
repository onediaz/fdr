import { generateClient } from "aws-amplify/api";
import { listStudentTables } from '../graphql/queries';
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
        return classroom.data.listStudentTables.items;
    } catch(error) {
        console.log(error);
        console.log('failed to get transaction by ID');
        return [];
    }
}

export {getTablesByClassroomName};