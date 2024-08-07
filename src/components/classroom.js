import './styling/ClassroomComponent.css';
import { useEffect, useState } from "react";
import StudentTableComponent from "./studenttable";
import { getTablesByClassroomName } from "../functions/get-tables";
import { getStudentsFromTables } from '../functions/functions-arrays';
import RemainingStudentsTableComponent from './remainingstudentstable';
import UpdateStudentsComponent from './updatestudents';

const ClassroomComponent = ({classroomName, selectedStudents, setSelectedStudents, students, setStudents}) => {
    const [tables, setTables] = useState(null);
    const [remainingStudents, setRemainingStudents] = useState(null);

    useEffect(() => {
        const fetchTables = async () => {
            let tTables = await getTablesByClassroomName(classroomName, students);
            setTables(tTables);
            let rStudents = getStudentsFromTables(tTables, students);
            setRemainingStudents(rStudents);
        }
        fetchTables();
    }, [students]);

    return (
        <div className="classroom_container">
            <div className='classroom_body'>
                <div className="classroom_tables">
                    {tables && selectedStudents &&
                        tables.map((table) => {
                            return (
                                <StudentTableComponent key={table.id} table={table} tables={tables}
                                    selectedStudents={selectedStudents} setSelectedStudents={setSelectedStudents} 
                                    allStudents={students}
                                />
                            )
                    })}
                </div>
                <div className='classroom_update_settings'>
                    {selectedStudents &&
                        <UpdateStudentsComponent 
                            selectedStudents={selectedStudents} setSelectedStudents={setSelectedStudents}
                            tables={tables} setTables={setTables}
                            remainingStudents={remainingStudents} setRemainingStudents={setRemainingStudents}
                            students={students} setStudents={setStudents}
                            classroomName={classroomName}
                        />
                    }
                </div>
            </div>
            {selectedStudents &&
                <RemainingStudentsTableComponent 
                    selectedStudents={selectedStudents} setSelectedStudents={setSelectedStudents} remainingStudents={remainingStudents}
                />
            }
        </div>
    );
};

export default ClassroomComponent;