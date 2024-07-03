import { useState } from "react";
import { createTransaction } from "../functions/create-transaction";
import { getAllStudents } from "../functions/get-student";
import { updateStudentBalance } from "../functions/update-students";

const UpdateBalancesComponent = ({selectedStudents, setSelectedStudents, allStudents, setStudents}) => {
    const [balance, setBalance] = useState('');
    const [message, setMessage] = useState('');

    const onButtonClick = async () => {
        if (selectedStudents.length === 0) {
            window.alert('No students were selected');
        } else if(message === '' || balance === '') {
            window.alert('Transaction message or balance empty');
        } else if (selectedStudents.length !== 0) {
            for (let student of selectedStudents) {
                const updatedBalance = Number(balance);
                let updatedStudent = await updateStudentBalance(student.id, updatedBalance);
                createTransaction({'name': 'Mr. Diaz', 'id': '1'}, student, balance, message);
            }
            let studs = await getAllStudents();
            setStudents(studs);
            window.alert(`Successfully sent money ${balance} to selected students`);
            setBalance('');
            setMessage('');
            setSelectedStudents([]);

        } else {
            window.alert('Error creating transaction');
        }
    };

    return (
        <div className="update_balances_container">
            <div className="update_balances_header">
                Update Students
            </div>
            <div className="update_balances_body">
                <input 
                    className='' type="text" 
                    value={message} min="1" placeholder="Enter Message" onChange={(ev) => setMessage(ev.target.value)} 
                />
                <input 
                    className='' type="number"
                    value={balance} min="1" placeholder="Enter Balance" onChange={(ev) => setBalance(ev.target.value)}
                />
            <input type="button" onClick={onButtonClick} value={'Update Balances'}/>
            </div>
        </div>
    );
};

export default UpdateBalancesComponent;