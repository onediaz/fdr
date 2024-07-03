import './styling/UpdateStudentsComponent.css';
import UpdateBalancesComponent from './updatebalances';
import UpdateStudentTablesComponent from './updatestudenttables';

const UpdateStudentsComponent = ({selectedStudents, setSelectedStudents, tables, setTables, remainingStudents, setRemainingStudents, students, setStudents}) => {

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
                <UpdateBalancesComponent selectedStudents={selectedStudents} setSelectedStudents={setSelectedStudents} allStudents={students} setStudents={setStudents}/>
            </div>
        </div>
    );
}

export default UpdateStudentsComponent;