import './styling/RemainingStudentsTableComponent.css';
import StudentComponent from "./student";
import { CheckboxField } from "@aws-amplify/ui-react";

const RemainingStudentsTableComponent = ({remainingStudents, selectedStudents, setSelectedStudents}) => {

    // const handleSelectAll = (event) => {
    //     if (event.target.checked) {
    //         setSelectedStudents(remainingStudents);
    //     } else {
    //         setSelectedStudents([]);
    //     }
    // };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectedStudents(prevSelected => {
                return prevSelected.concat(remainingStudents);
            });
        } else {
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
                            // checked={remainingStudents.length !== 0}
                            label=""
                        />
                    </div>}
            </div>
            <div className='table_remaining_students_body'>
                {remainingStudents &&
                    <div className='remaining_students_list'>
                        {remainingStudents.map((student, index) => {
                            return (
                                <StudentComponent student={student} selectedStudents={selectedStudents} setSelectedStudents={setSelectedStudents} table={{'id': 'remaining'}}/>
                            );
                        })}
                    </div>
                }
            </div>
        </div>
    );
};

export default RemainingStudentsTableComponent;