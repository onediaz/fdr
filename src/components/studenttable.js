import { useEffect, useState } from "react";
import StudentComponent from "./student";

/**
 * 
 * @param {table} Table object 
 * @returns 
 */
const StudentTableComponent = ({table}) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();

        const fetchStudents = async () => {
            // let tStudents = await getStudents();
            let tStudents = [];
            setStudents(tStudents);
        }
    }, [table]);


    return (
        <div className="table_dnd_container">
            <div className="table_dnd_header">
                <div></div>
            </div>
            <div className="table_dnd_body">
                {table.students.map(student => {
                    <StudentComponent student={student}/>
                })}
            </div>
        </div>
    );
};

export default StudentTableComponent;