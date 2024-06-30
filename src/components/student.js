import './styling/StudentComponent.css';
import { CheckboxField } from "@aws-amplify/ui-react";

const StudentComponent = ({student, selectedStudents, setSelectedStudents, table}) => {

    const handleSelectStudent = (student) => {
        setSelectedStudents(prevSelected => {
            if (prevSelected.some(selectedStudent => selectedStudent.id === student.id)) {
                return prevSelected.filter(selectedStudent => selectedStudent.id !== student.id);
            } else {
                return [...prevSelected, {...student, 'tableId': table.id}];
            }
        });
        console.log(selectedStudents);
    };

    return (
        <div className="student_dnd_container">
            <div className="student_dnd_header">
                <div className="student_dnd_name">
                    {student.name}
                </div>
                <div className="student_dnd_check">
                    <CheckboxField
                        onChange={() => handleSelectStudent(student)}
                        checked={selectedStudents.some(selectedStudent => selectedStudent.id === student.id)}
                        label=""
                    />
                </div>
            </div >

            <div className="student_dnd_body">
                <div className="student_dnd_profile_picture">

                </div>
                <div className="student_dnd_balance">
                    {student.balance}
                </div>
            </div>
        </div>
    );
};

export default StudentComponent;