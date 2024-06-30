import { Alert, CheckboxField } from "@aws-amplify/ui-react";
import { useState } from "react";
import { updateStudentTables } from "../functions/update-student-tables";
import { InvokeCommand } from "@aws-sdk/client-lambda";
import { lambdaClient } from "../../src/lambdaClient";
// import { API } from 'aws-amplify/api'

const UpdateStudentTablesComponent = ({selectedStudents, setSelectedStudents, tables, setTables, remainingStudents, setRemainingStudents, students}) => {
    const [selectedTable, setSelectedTable] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');


    const handleSelectTable = (table) => {
        setSelectedTable(prevSelected => {
            if (!prevSelected) {
                return table;
            } else {
                return null;
            }
        });
        // setSelectedTable(table);
        // console.log('Selected: ', table);
    };

    const onButtonClick = async () => {
        if(!selectedStudents || selectedStudents.length === 0) {
            window.alert('No students selected');
            // setErrorMessage('No students selected');
        } else if(!selectedTable) {
            window.alert('Select table to move students to');
        } else {
            let res = await updateStudentTables(selectedStudents, selectedTable, tables, remainingStudents, students);

            setSelectedStudents([]);
            setSelectedTable(null);
            
            console.log(res);
            setTables([...res[0]]);
            setRemainingStudents(res[1]);
            // setSelectedStudents([]);
            // setSelectedTable(null);
        }
    }

    const onButtonClick2 = async () => {
        try {
            // const data = await API.get('getStudents', '/');
            return;
        } catch (error) {
            console.log('Failed to GET students');
        }
    }

    return (
        <div className="update_student_tables_container">
            <div className="update_student_tables_header">
                <div>
                    Move Students
                </div>
                
            </div>
            <div className="update_student_tables_body">
                {tables &&
                    tables.map(table => (
                        <div key={table.id} className="update_student_table_select">
                            <CheckboxField
                                onChange={() => handleSelectTable(table)}
                                isDisabled={selectedTable && selectedTable.name !== table.name}
                                checked={selectedTable && selectedTable.id === table.id}
                                label=""
                            />
                            {table.name}
                        </div>
                ))}
                <input type="button" onClick={onButtonClick} value={'Move Students'} />
            </div>
        </div>
    );
};

export default UpdateStudentTablesComponent;