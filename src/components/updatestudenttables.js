import { Alert, CheckboxField } from "@aws-amplify/ui-react";
import { useState } from "react";
import { updateStudentTables } from "../functions/update-student-tables";
import { InvokeCommand } from "@aws-sdk/client-lambda";
import { lambdaClient } from "../../src/lambdaClient";
import axios from 'axios';

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
            // let res = await updateStudentTables(selectedStudents, selectedTable, tables, remainingStudents, students);
            console.log(selectedStudents);
            let res = await axios({
                method: 'put',
                url: 'https://xd68fappf0.execute-api.us-east-2.amazonaws.com/fdr-db/student-tables-db',
                params: {
                    TableName: "StudentTable-tejldcxcpnc35hmzlzzrw2blmy-fdr",
                    SelectedStudents: JSON.stringify(selectedStudents),
                    Table: JSON.stringify({'id': selectedTable.id}),
                    RemainingStudents: JSON.stringify(remainingStudents),
                }
            });
            console.log(res);
            console.log(res.data);
            setTables([...res.data[0]]);
            setRemainingStudents(res.data[1]);
            setSelectedStudents([]);
            setSelectedTable(null);
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