import axios from 'axios';

/**
 * 
 * @param {String} name 
 */
async function getTablesByClassroomName(name, students) {
    try {
        let res = await axios({
          method: 'get',
          url: 'https://xd68fappf0.execute-api.us-east-2.amazonaws.com/fdr-db/student-tables-db'
        });
        return res.data;
    } catch(error) {
        console.log(error);
        console.log('failed to get transaction by ID');
        return [];
    }
}

export {getTablesByClassroomName};