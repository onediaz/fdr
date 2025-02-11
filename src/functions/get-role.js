import { fetchAuthSession } from "@aws-amplify/auth";

async function getRole () {
    const adminUser = await fetchAuthSession();
    let role = '';
    try {
        const adminExists = adminUser.tokens.accessToken.payload['cognito:groups'];
        if (adminExists.includes('student')){
            role = 'student';
        }
        if(adminExists.includes('admin')) {
            role = 'admin';
        }
        return role;
    }
    catch(error) {
        console.log(error);
        return '';
    }
};

export {getRole};