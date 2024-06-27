import './styling/ClassroomComponent.css';
import { useEffect, useState } from "react";
import StudentTableComponent from "./studenttable";
import { getTablesByClassroomName } from "../functions/get-tables";
import StudentComponent from "./student";
import { createTableForStudents } from '../functions/create-studenttable';
import { getStudentsFromTables } from '../functions/functions-arrays';

const ClassroomComponent = ({classroomName, selectedStudents, setSelectedStudents, students}) => {
    const [tables, setTables] = useState([]);
    const [tablename, setTablename] = useState('');
    const [remainingStudents, setRemainingStudents] = useState([]);

    useEffect(() => {
        const fetchTables = async () => {
            let tTables = await getTablesByClassroomName(classroomName);
            setTables(tTables);
            let rStudents = getStudentsFromTables(tTables, students);
            console.log('Fetched Table Remaining');
            console.log(rStudents);
            setRemainingStudents(rStudents);
        }
        fetchTables();
    }, []);

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
        <div className="classroom_dnd_container">
            <div className="classroom_dnd_tables">
                {tables.map(table => (
                    <StudentTableComponent table={table} selectedStudents={selectedStudents} setSelectedStudents={setSelectedStudents}/>
                ))}
                <div className="table_dnd_create" >
                    <input type="text" value={tablename} placeholder="Enter Name" onChange={(ev) => setTablename(ev.target.value)} className={'table_dnd_create_name'}/>
                    <div className="table_dnd_create_button" onClick={createNewTable}>New Table</div>
                </div>
            </div>
            <div className="table_dnd_remaining_students">
                {remainingStudents.map(student => (
                    <StudentComponent student={student} selectedStudents={selectedStudents} setSelectedStudents={setSelectedStudents}/>
                ))}
            </div>
        </div>
    );
};

export default ClassroomComponent;