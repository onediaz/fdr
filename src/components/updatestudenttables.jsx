import { CheckboxField } from "@aws-amplify/ui-react";
import { useState } from "react";
import axios from 'axios';
import { createTableForStudents } from "../functions/create-studenttable";

const UpdateStudentTablesComponent = ({selectedStudents, setSelectedStudents, tables, setTables, remainingStudents, setRemainingStudents, students, classroomName}) => {
    const [selectedTable, setSelectedTable] = useState(null);
    const [tablename, setTablename] = useState('');


    const handleSelectTable = (table) => {
        setSelectedTable(prevSelected => {
            if (!prevSelected) {
                return table;
            } else {
                return null;
            }
        });
    };
    
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
    }

    const onButtonClick = async () => {
        if(!selectedStudents || selectedStudents.length === 0) {
            window.alert('No students selected');
            // setErrorMessage('No students selected');
        } else if(!selectedTable) {
            window.alert('Select table to move students to');
        } else {
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
            setTables([...res.data[0]]);
            setRemainingStudents(res.data[1]);
            setSelectedStudents([]);
            setSelectedTable(null);
        }
    }

    const onButtonClick2 = () => {
        console.log('Deleting Table');
    }

    return (
        <div className="update_student_tables_container">

            <div className="update_student_tables_header">
                Create Table
            </div>

                <div className="table_create" >
                    <input type="text" value={tablename} placeholder="Enter Table Name" onChange={(ev) => setTablename(ev.target.value)} className={'table_create_name'}/>
                    <div type="button" onClick={createNewTable} value={'Move Students'} className="create_table_button"> New Table</div>
                    {/* <div className="table_create_button" onClick={createNewTable}>New Table</div> */}
                </div>
            <div className="update_student_tables_header">
                Move Students
            </div>
            <div className="update_student_tables_list">
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
                {/* <input type="button" onClick={onButtonClick} value={'Move Students'} /> */}
                <div className="update_student_table_buttons">
                    <div onClick={onButtonClick} value={'Move Students'} className="update_student_tables_button"> Move Students</div>
                    <div type="button" onClick={onButtonClick2} value={'Move Students'} className="update_student_tables_button"> Delete Table</div>
                </div>
            </div>
        </div>
    );
};

export default UpdateStudentTablesComponent;