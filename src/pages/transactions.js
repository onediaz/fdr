import './styling/transactions.css';
import React, { useState, useCallback } from 'react';
import { Tabs, Flex, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@aws-amplify/ui-react';
import { viewTransactions } from '../functions/view-transactions';

const Transactions = (props) => {
    const [transactions, setTransactions] = useState([]);
    const [sortConfig, setSortConfig] = useState(null);

    const sentTransactions = useCallback(async () => {
        setTransactions([]);
        try {
            const newViewTransaction = await viewTransactions('sender', props.id);
            setTransactions(newViewTransaction);
        } catch (error) {
            console.log('Failed to list sent transactions');
        }
    }, [props.id]);

    const receivedTransactions = useCallback(async () => {
        setTransactions([]);
        try {
            const newViewTransaction = await viewTransactions('receiver', props.id);
            setTransactions(newViewTransaction);
        } catch (error) {
            console.log('Failed to list received transactions');
        }
    }, [props.id]);

    const sortTransactions = useCallback((key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    }, [sortConfig]);

    const getClassName = useCallback((name) => {
        console.log(name);
    }, []);

    return (
        <div className={'trans-container'}>
            <div>Transactions</div>
            <Flex direction="column" gap="2rem">
                <Tabs.Container defaultValue="1">
                    <Tabs.List>
                        <Tabs.Item value="1" onClick={sentTransactions}>Sent</Tabs.Item>
                        <Tabs.Item value="2" onClick={receivedTransactions}>Received</Tabs.Item>
                    </Tabs.List>
                    <Tabs.Panel value="1">
                        <Table highlightOnHover={true} variation="striped">
                            <TableHead>
                                <TableRow>
                                    <TableCell as="th">Sender</TableCell>
                                    <TableCell as="th">
                                        Receiver
                                        {/* <Button size="small" onClick={() => sortTransactions('receiver')} className={getClassName('receiver')}>Receiver</Button> */}
                                    </TableCell>
                                    <TableCell as="th">Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.length > 0 && transactions.map(transaction => (
                                    <TableRow className="students-display" key={transaction.id}>
                                        <TableCell>{props.name}</TableCell>
                                        <TableCell>{transaction.receiver.name}</TableCell>
                                        <TableCell>{transaction.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Tabs.Panel>
                    <Tabs.Panel value="2">
                        <Table highlightOnHover={true} variation="striped">
                            <TableHead>
                                <TableRow>
                                    <TableCell as="th">Sender</TableCell>
                                    <TableCell as="th">Receiver</TableCell>
                                    <TableCell as="th">Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.length > 0 && transactions.map(transaction => (
                                    <TableRow className="students-display" key={transaction.id}>
                                        <TableCell>{transaction.sender && transaction.sender.name}</TableCell>
                                        <TableCell>{props.name}</TableCell>
                                        <TableCell>{transaction.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Tabs.Panel>
                </Tabs.Container>
            </Flex>
        </div>
    );
}

export default Transactions;
