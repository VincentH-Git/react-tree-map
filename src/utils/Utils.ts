import { DataType } from './Constant';

export const checkIsJson = (item: any) => {
    let value = typeof item !== 'string' ? JSON.stringify(item) : item;
    try {
        value = JSON.parse(value);
    } catch (e) {
        return false;
    }

    return typeof value === 'object' && value !== null;
};

export const checkIsArray = (data: any) => {
    return Array.isArray(data);
};

export const checkIsArrayLengthTooLong = (array: DataType, limit: number | undefined = 50) => {
    return array.length > limit;
};

export const checkIsNameValid = (name: any, limit: number | undefined = 50) => {
    return typeof name == 'string' && name?.length < 50;
};

export const checkIsInteger = (weight: any) => {
    return Number.isInteger(weight);
};

export const checkIsRowNumberTooLarge = (rowNumber: number, arrayLength: number) => {
    return rowNumber > arrayLength;
};

export const checkDataError = (data: string) => {
    const isJson = checkIsJson(data);
    const error: string[] = [];
    if (!isJson) {
        error.push('Invalid JSON');
    } else {
        if (!checkIsArray(JSON.parse(data))) {
            error.push('Data is not an array');
        } else {
            const dataArray: DataType = JSON.parse(data);
            if (checkIsArrayLengthTooLong(JSON.parse(data))) {
                error.push('Array is too long');
            }
            if (!dataArray.every((item) => checkIsNameValid(item?.name))) {
                error.push('Invalid name');
            }
            if (!dataArray.every((item) => checkIsInteger(item?.weight))) {
                error.push('Invalid weight');
            }
        }
    }
    return error.join(',');
};

export const checkRowNumberError = (data: string, arrayLength: number) => {
    const error: string[] = [];
    if (data.length < 0 || parseInt(data) < 1 || !checkIsInteger(parseInt(data))) {
        error.push('The row number must be an positive integer');
    } else {
        if (checkIsRowNumberTooLarge(parseInt(data), arrayLength)) {
            error.push('The row number exceeds the length of the array');
        }
    }
    return error.join(',');
};

export const groupIntoGrid = (data: DataType, rowNumber: number): { result: DataType[]; weightPerRow: number } => {
    let totalWeight = data.reduce((a, b) => a + b.weight, 0);
    const averageWeight = Math.ceil(totalWeight / rowNumber);
    const assignment = Array<number>(data.length).fill(0);
    const sums = Array<number>(rowNumber).fill(0);

    function recur(i: number): boolean {
        let improved = false;
        if (i < 0) {
            // All values have been assigned
            const currentMax = Math.max(...sums);
            improved = currentMax < totalWeight;
            totalWeight = Math.min(totalWeight, currentMax);
        } else {
            const value = data[i].weight;
            let currentMax = totalWeight;
            for (let bin = 0; bin < rowNumber; bin++) {
                if (sums[bin] >= averageWeight || sums[bin] + value > totalWeight || sums.indexOf(sums[bin]) < bin)
                    continue;
                sums[bin] += value;
                if (recur(i - 1)) {
                    improved = true;
                    assignment[i] = bin;
                    if (totalWeight === averageWeight) break; 
                }
                sums[bin] -= value;
            }
        }
        return improved;
    }

    recur(data.length - 1);

    // Distribute values according to collected assignments
    const result: DataType[] = assignment.reduce(
        (acc: DataType[], bin, i) => {
            acc[bin].push(data[i]);
            return acc;
        },
        Array.from({ length: rowNumber }, () => [])
    );

    // Sort the groups in descending order based on the total weight
    result.sort((a, b) => {
        const totalWeightA = a.reduce((sum, item) => sum + item.weight, 0);
        const totalWeightB = b.reduce((sum, item) => sum + item.weight, 0);
        return totalWeightB - totalWeightA;
    });

    return { result, weightPerRow: result[0].reduce((sum, item) => sum + item.weight, 0) };
};
