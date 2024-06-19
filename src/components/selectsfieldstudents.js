import { SelectField } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { getAllStudents } from "../functions/get-student";


const SelectFieldStudents = ({user}) => {
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            console.log('fetching all students');
            const studentList = (await getAllStudents()).filter(stud => stud.name !== user.name);
            studentList.sort((a, b) => a.name.localeCompare(b.name));
            setStudents(studentList);
        }
        fetchStudents();
    }, []);

    const changeStudent = (val) => {
        setSelectedStudentId(val);
        const student = students.filter(stud => stud.id === val);
    };

    return (
        <>
            <SelectField
                label="all"
                labelHidden
                placeholder="All"
                value={selectedStudentId}
                onChange={(e) => changeStudent(e.target.value)}
            >
                {students.map(student => (
                    <option value={student.id}>{student.name}</option>
                ))}
            </SelectField>
        </>
    );
};

export default SelectFieldStudents; 