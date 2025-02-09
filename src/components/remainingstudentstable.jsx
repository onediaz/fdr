import './styling/RemainingStudentsTableComponent.css';
import StudentComponent from "./student";
import { CheckboxField } from "@aws-amplify/ui-react";
import { useEffect, useState } from 'react';

const RemainingStudentsTableComponent = ({remainingStudents, selectedStudents, setSelectedStudents}) => {
    const [currentTableStudentsSelected, setCurrentTableStudentSelected] = useState(new Set());

    useEffect(() => {
        if(selectedStudents && selectedStudents.length === 0) {
            setCurrentTableStudentSelected(new Set());
        }
    }, [selectedStudents]);

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            remainingStudents.map(student => {
                currentTableStudentsSelected.add(student.id);
                setCurrentTableStudentSelected(currentTableStudentsSelected);
            });
            setSelectedStudents(prevSelected => {
                return prevSelected.concat(remainingStudents.map(student => ({'id': student.id, 'tableId': 'remaining', 'name': student.name})));
            });
        } else {
            setCurrentTableStudentSelected(new Set());
            setSelectedStudents(prevSelected => {
                return prevSelected.filter(a => !remainingStudents.find(student => a.id === student.id));
            });
        }
    };

    return (
        <div className="table_remaining_students">
            <div className='table_remaining_students_header'>
                <div>
                    Students
                </div>
                {remainingStudents && 
                    <div>
                        <CheckboxField
                            onChange={handleSelectAll}
                            checked={remainingStudents.length !== 0 && currentTableStudentsSelected.size === remainingStudents.length}
                            label=""
                        />
                    </div>}
            </div>
            <div className='table_remaining_students_body'>
                {remainingStudents &&
                    <div className='remaining_students_list'>
                        {remainingStudents.map((student, index) => {
                            return (
                                <StudentComponent 
                                    student={student} selectedStudents={selectedStudents} setSelectedStudents={setSelectedStudents} table={{'id': 'remaining'}}
                                    setCurrentTableStudentSelected={setCurrentTableStudentSelected} currentTableStudentsSelected={currentTableStudentsSelected}
                                />
                            );
                        })}
                    </div>
                }
            </div>
        </div>
    );
};

export default RemainingStudentsTableComponent;