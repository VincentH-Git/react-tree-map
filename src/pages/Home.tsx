import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import { DataType, initialArrayLength, initialData, initialRowNumber } from '../utils/Constant';
import { checkDataError, checkRowNumberError, groupIntoGrid } from '../utils/Utils';
import TreeMap from '../components/TreeMap';
import DataInput from '../components/DataInput';
import RowNumberInput from '../components/RowNumberInput';

const Home = () => {
    const [data, setData] = useState(JSON.stringify(initialData));
    const [rowNumber, setRowNumber] = useState<string>(initialRowNumber.toString());
    const [dataError, setDataError] = useState('');
    const [rowNumberError, setRowNumberError] = useState('');
    const [arrayLength, setArrayLength] = useState(initialArrayLength);
    const [displayData, setDisplayData] = useState<DataType>([]);
    const [weightPerRow, setWeightPerRow] = useState(0);

    useEffect(() => {
        const dataError = checkDataError(JSON.stringify(initialData));
        const rowNumberError = checkRowNumberError(initialRowNumber.toString(), initialArrayLength);
        if (!dataError && !rowNumberError) {
            updateTreeMapState({
                data: initialData,
                rowNumber: initialRowNumber
            });
        }
    }, []);

    const handleTextOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setData(event.target.value);
        const error = checkDataError(event.target.value);
        setDataError(error);
        if (!error && !rowNumberError) {
            const rowNumError = checkRowNumberError(rowNumber, JSON.parse(event.target.value).length);
            if (!rowNumError) {
                updateTreeMapState({
                    data: JSON.parse(event.target.value),
                    rowNumber: parseInt(rowNumber),
                    length: JSON.parse(event.target.value).length
                });
            } else {
                setRowNumberError(rowNumError);
            }
        }
    };

    const handleRowNumberOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowNumber(event.target.value);
        const error = checkRowNumberError(event.target.value, arrayLength);
        setRowNumberError(error);
        if (!error && !dataError) {
            updateTreeMapState({ data: JSON.parse(data), rowNumber: parseInt(event.target.value) });
        }
    };

    const updateTreeMapState = ({
        data,
        rowNumber,
        length
    }: {
        data: DataType;
        rowNumber: number;
        length?: number;
    }) => {
        const { result, weightPerRow } = groupIntoGrid(data, rowNumber);
        setDisplayData(result.reduce((result, innerArray) => result.concat(innerArray), []));
        setWeightPerRow(weightPerRow);
        if (length) {
            setArrayLength(length);
        }
    };

    return (
        <div className="background">
            <div className="containerPadding">
                <div className="marginRight50">
                    <DataInput data={data} handleTextOnChange={handleTextOnChange} dataError={dataError} />
                    <RowNumberInput
                        rowNumber={rowNumber}
                        handleRowNumberOnChange={handleRowNumberOnChange}
                        error={rowNumberError}
                    />
                </div>
                <div className="rightPartContainer">
                    <TreeMap
                        data={displayData}
                        rowNumber={rowNumber && !rowNumberError ? parseInt(rowNumber) : 0}
                        weightPerRow={weightPerRow}
                        error={dataError.length > 0 || rowNumberError.length > 0}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
