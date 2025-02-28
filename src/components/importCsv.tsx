


import React, { useState, ChangeEvent, FormEvent } from "react";

interface CSVRow {
    [key: string]: string;
}

const UploadFile = (): JSX.Element => {
    const [file, setFile] = useState<File | undefined>();
    const [array, setArray] = useState<CSVRow[]>([]);

    const fileReader = new FileReader();

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const csvFileToArray = (string: string): void => {
        const csvHeader = string
            .slice(0, string.indexOf("\n"))
            .split(",")
            .map((header) => header.trim());
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

        const parsedArray = csvRows.map((row) => {
            const values = row.split(",");
            const obj = csvHeader.reduce((object: CSVRow, header, index) => {
                object[header] = values[index]?.trim() || "";
                return object;
            }, {});
            return obj;
        });

        setArray(parsedArray);
    };

    const handleOnSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (file) {
            fileReader.onload = (event: ProgressEvent<FileReader>) => {
                const text = event.target?.result as string;
                csvFileToArray(text);
            };

            fileReader.readAsText(file);
        }
    };

    const headerKeys = Object.keys(Object.assign({}, ...array));

    return (
        <div style={{ textAlign: "center" }}>
            <h1>REACTJS CSV IMPORT EXAMPLE</h1>
            <form>
                <input
                    type="file"
                    id="csvFileInput"
                    accept={".csv, .txt, .xlsx,.word"}
                    onChange={handleOnChange}
                />

                <button onClick={handleOnSubmit}>IMPORT CSV</button>
            </form>

            <br />

            <table>
                <thead>
                    <tr key="header">
                        {headerKeys.map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {array.map((item, index) => (
                        <tr key={index}>
                            {Object.values(item).map((val, valIndex) => (
                                <td key={valIndex}>{val}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UploadFile;