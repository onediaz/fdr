import './styling/ClassroomComponent.css';
import { useCallback, useEffect, useState } from "react";
import StudentTableComponent from "./studenttable";
import { getTablesByClassroomName } from "../functions/get-tables";
import StudentComponent from "./student";
import { createTableForStudents } from '../functions/create-studenttable';
import { getStudentsFromTables, handleDragAndDrop } from '../functions/functions-arrays';
import RemainingStudentsTableComponent from './remainingstudentstable';
import UpdateStudentsComponent from './updatestudents';

const ClassroomComponent = ({classroomName, selectedStudents, setSelectedStudents, students, setStudents}) => {
    const [tables, setTables] = useState(null);
    const [tablename, setTablename] = useState('');
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

    const createNewTable = async () => {
        if(tablename === '') {
            window.alert('Add table name');
        }
        else if(tables.filter(a => a.name === tablename).length !== 0) {
            window.alert('Table Name already exists');
            setTablename('');
        } else if (window.confirm(`Are you sure you want to create a table ${tablename}`)) {
            let newTable = await createTableForStudents(tablename, classroomName);
            tables.push(newTable);
            setTables(tables);
            setTablename('');
        }
        console.log('Creating Table');
    }

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
                    <div className="table_create" >
                        <input type="text" value={tablename} placeholder="Enter Name" onChange={(ev) => setTablename(ev.target.value)} className={'table_create_name'}/>
                        <div className="table_create_button" onClick={createNewTable}>New Table</div>
                    </div>
                </div>
                <div className='classroom_update_settings'>
                    {selectedStudents &&
                        <UpdateStudentsComponent 
                            selectedStudents={selectedStudents} setSelectedStudents={setSelectedStudents}
                            tables={tables} setTables={setTables}
                            remainingStudents={remainingStudents} setRemainingStudents={setRemainingStudents}
                            students={students} setStudents={setStudents}
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