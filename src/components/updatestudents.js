import { useEffect } from 'react';
import './styling/UpdateStudentsComponent.css';
import UpdateBalancesComponent from './updatebalances';
import UpdateStudentTablesComponent from './updatestudenttables';

const UpdateStudentsComponent = ({selectedStudents, setSelectedStudents, tables, setTables, remainingStudents, setRemainingStudents, students}) => {

    return (
        <div className="update_students_container">
            <div>
                Update Settings
            </div>
            <div>
                <UpdateStudentTablesComponent 
                    selectedStudents={selectedStudents} setSelectedStudents={setSelectedStudents}
                    tables={tables} setTables={setTables}
                    remainingStudents={remainingStudents} setRemainingStudents={setRemainingStudents}
                    students={students}
                />
                <UpdateBalancesComponent selectedStudents={selectedStudents} setSelectedStudents={setSelectedStudents}/>
            </div>
        </div>
    );
}

export default UpdateStudentsComponent;