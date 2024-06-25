import { useEffect, useState } from "react";
import StudentTableComponent from "./studenttable";

const ClassroomComponent = ({}) => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        fetchTables();
        const fetchTables = async () => {
            // let fetchTs = await getTables();
            let tTables = [];
            setTables(tTables);
        }
    }, []);

    return (
        <div>
            {tables.map(table => {
                <StudentTableComponent table={table}/>
            })}
        </div>
    );
};

export default ClassroomComponent;