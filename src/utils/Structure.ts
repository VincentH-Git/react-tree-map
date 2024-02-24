import { DataType } from "./Constant";

export interface  RectangleProps {
    weight: number;
    value: number;
    name: string;
    eachWeightPerRow: number
    rowNumber: number
}

export interface TreeMapProps {
    data: DataType
    rowNumber: number
    weightPerRow: number
    error: boolean
}

export interface DataInputProps {
    data: string
    handleTextOnChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    dataError: string
}

export interface RowNumberInputProps {
    rowNumber: string
    handleRowNumberOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    error: string
}