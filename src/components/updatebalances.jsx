import { useState } from "react";
import { createTransaction } from "../functions/create-transaction";
import { getAllStudents } from "../functions/get-student";
import { updateStudentBalance } from "../functions/update-students";

const UpdateBalancesComponent = ({selectedStudents, setSelectedStudents, allStudents, setStudents}) => {
    const [balance, setBalance] = useState('');
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');

    const onButtonClick = async () => {
        if (selectedStudents.length === 0) {
            window.alert('No students were selected');
        } else if(message === '' || balance === '' || name === '') {
            window.alert('Fill in all fields');
        } else if (selectedStudents.length !== 0) {
            for (let student of selectedStudents) {
                const updatedBalance = Number(balance);
                let updatedStudent = await updateStudentBalance(student.id, updatedBalance);
                createTransaction({'name': name, 'id': '1'}, student, balance, message);
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
                Send Money
            </div>
            <div className="update_balances_body">
                <input 
                        className='update_balances_text_input' type="text" 
                        value={name} placeholder="Add Name" onChange={(ev) => setName(ev.target.value)} 
                />
                <input 
                    className='update_balances_text_input' type="text" 
                    value={message} placeholder="Add Message" onChange={(ev) => setMessage(ev.target.value)} 
                />
                <input 
                    className='update_balances_text_input' type="number"
                    value={balance} min="1" placeholder="Enter Balance" onChange={(ev) => setBalance(ev.target.value)}
                />
            <div onClick={onButtonClick} value={'Move Students'} className="update_student_tables_button"> Update Balances</div>
            {/* <input type="button" onClick={onButtonClick} value={'Update Balances'}/> */}
            </div>
        </div>
    );
};

export default UpdateBalancesComponent;