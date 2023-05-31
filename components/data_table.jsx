'use client'
import { useState, useEffect } from 'react';
import { Table } from "@nextui-org/react";


export function DataTable() {
    const [data, setData] = useState([]);

    useEffect(() => {

        const url = 'http://localhost:3000/api/hello';
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                console.log(json);
                setData(json);
            } catch (error) {
                console.log("error: ", error);
            }
        };
        fetchData();
    }, []);
    const columns = [
        {
            key: "_id",
            label: "ID",
        },
        {
            key: "BadgeNumber",
            label: "Badge Number",
        },
        {
            key: "FirstName",
            label: "First Name",
        },
        {
            key: "LastName",
            label: "Last Name",
        },
        {
            key: "PinCode",
            label: "Pin Code",
        },
        {
            key: "Email",
            label: "Email",
        },
        {
            key: "MailingAddress",
            label: "Mailing Address",
        },
        {
            key: "City",
            label: "City",
        },
        {
            key: "State",
            label: "State",
        },
        {
            key: "SummonsDate",
            label: "Summons Date",
        },
        {
            key: "GroupNumber",
            label: "Group Number",
        },
        {
            key: "ReportingLocation",
            label: "Reporting Location",
        },
        {
            key: "CanPostpone",
            label: "Can Postpone",
        },
    ];

    return (
        <Table
            aria-label="Example table with dynamic content"
            css={{
                height: "auto",
                minWidth: "100%",
            }}
        >
            <Table.Header columns={columns}>
                {(column) => (
                    <Table.Column key={column.key}>{column.label}</Table.Column>
                )}
            </Table.Header>
            <Table.Body items={data}>
                {(item) => (
                    <Table.Row key={item._id}>
                        {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );

};

export default DataTable;
