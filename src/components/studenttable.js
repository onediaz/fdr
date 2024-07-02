import './styling/StudentTableComponent.css';
import { useEffect, useState } from "react";
import StudentComponent from "./student";
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import { CheckboxField } from '@aws-amplify/ui-react';

/**
 * 
 * @param {table} Table object 
 * @returns 
 */
const StudentTableComponent = ({table, selectedStudents, setSelectedStudents, tables, allStudents}) => {
    const [students, setStudents] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            let curStudents = []
            let curTables = table.students;
            if (typeof curTables === "string") {
                curTables = JSON.parse(curTables);
            }
            for (let tStudent of curTables) {
                let sIndex = allStudents.findIndex(student => student.id === tStudent.id);
                if (sIndex !== -1) {
                    curStudents.push(allStudents[sIndex]);
                }
            }
            setStudents(curStudents);
        }

        fetchStudents();

    }, [tables, allStudents]);

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectedStudents(prevSelected => {
                return prevSelected.concat(students.map(student => ({'id': student.id, 'tableId': table.id, 'name': student.name})));
            });
        } else {
            setSelectedStudents(prevSelected => {
                return prevSelected.filter(a => !students.find(student => a.id === student.id));
            });
        }
    };

    return (
        <div className="table_dnd_container">
            <div className="table_dnd_header">
                <div>
                    {table.name}
                </div>
                {students && 
                    <div>
                        <CheckboxField
                            onChange={handleSelectAll}
                            isDisabled={students.length === 0}
                            // checked={selectedStudents.length - students.length === 0}
                            label=""
                        />
                    </div>}
            </div>
            <div className="table_dnd_body">
                {students &&
                    students.map((student, index) => {
                        return (
                            <li key={student.id}>
                                <StudentComponent student={student} selectedStudents={selectedStudents} setSelectedStudents={setSelectedStudents} table={table}/>
                            </li>
                        );
                })}
            </div>
        </div>
    );
};

export default StudentTableComponent;