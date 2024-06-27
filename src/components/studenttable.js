import './styling/StudentTableComponent.css';
import { useEffect, useState } from "react";
import StudentComponent from "./student";

/**
 * 
 * @param {table} Table object 
 * @returns 
 */
const StudentTableComponent = ({table, selectedStudents, setSelectedStudents}) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {

        const fetchStudents = async () => {
            // let tStudents = await getStudents();
            // let tStudents = JSON.parse(tables.students || '{"users":[]}');
            let tStudents = [];
            setStudents(tStudents);
        }

        fetchStudents();

    }, [table]);


    return (
        <div className="table_dnd_container">
            <div className="table_dnd_header">
                <div>
                    {table.name}
                </div>
            </div>
            <div className="table_dnd_body">
                {students.map(student => {
                    <div className={`table_dnd_student`}>
                        <StudentComponent student={student} selectedStudents={selectedStudents} setSelectedStudents={setSelectedStudents}/>
                    </div>
                })}
            </div>
        </div>
    );
};

export default StudentTableComponent;