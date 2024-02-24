import { initialData } from './utils/Constant';
import { checkDataError, checkRowNumberError } from './utils/Utils';

test('input is not JSON', () => {
    expect(checkDataError('123')).toBe('Invalid JSON');
});

test('input is JSON', () => {
    expect(checkDataError(JSON.stringify(initialData))).toBe('');
});

test('array.length <= 50', () => {
    const array = Array.from({ length: 50 }, () => ({ name: 'C', weight: 6, value: 0.015 }));
    expect(checkDataError(JSON.stringify(array))).toBe('');
});

test('array.length > 50', () => {
    const array = Array.from({ length: 51 }, () => ({ name: 'C', weight: 6, value: 0.015 }));
    expect(checkDataError(JSON.stringify(array))).toBe('Array is too long');
});

test('data.name is string and less than 50 characters', () => {
    const mockData = [
        { name: 'A', weight: 2, value: -0.02 },
        { name: 'B', weight: 13, value: -0.02 },
        { name: 'C', weight: 12, value: -0.02 }
    ];
    expect(checkDataError(JSON.stringify(mockData))).toBe('');
});

test('data.name is not string ', () => {
    const mockData = [
        { name: 123, weight: 2, value: -0.02 },
        { name: 'B', weight: 13, value: -0.02 },
        { name: 'C', weight: 12, value: -0.02 }
    ];
    expect(checkDataError(JSON.stringify(mockData))).toBe('Invalid name');
});

test('data.name is not less than 50 characters', () => {
    const mockData = [
        { name: 'A'.repeat(50), weight: 2, value: -0.02 },
        { name: 'B', weight: 13, value: -0.02 },
        { name: 'C', weight: 12, value: -0.02 }
    ];
    expect(checkDataError(JSON.stringify(mockData))).toBe('Invalid name');
});

test('data.name is not less than 50 characters', () => {
    const mockData = [
        { name: 'A'.repeat(50), weight: 2, value: -0.02 },
        { name: 'B', weight: 13, value: -0.02 },
        { name: 'C', weight: 12, value: -0.02 }
    ];
    expect(checkDataError(JSON.stringify(mockData))).toBe('Invalid name');
});

test('data.weight is integer', () => {
    const mockData = [
        { name: 'A', weight: 2, value: -0.02 },
        { name: 'B', weight: 13, value: -0.02 },
        { name: 'C', weight: 12, value: -0.02 }
    ];
    expect(checkDataError(JSON.stringify(mockData))).toBe('');
});

test('data.weight is integer', () => {
    const mockData = [
        { name: 'A', weight: 2, value: -0.02 },
        { name: 'B', weight: 13.3, value: -0.02 },
        { name: 'C', weight: 12, value: -0.02 }
    ];
    expect(checkDataError(JSON.stringify(mockData))).toBe('Invalid weight');
});

test('row number is integer', () => {
    const mockRowNumber = '0';
    const mockDataLength = 3;
    expect(checkRowNumberError(mockRowNumber, mockDataLength)).toBe('');
});

test('row number is not integer', () => {
    const mockRowNumber = '.';
    const mockDataLength = 3;
    expect(checkRowNumberError(mockRowNumber, mockDataLength)).toBe('The row number must be an integer');
});

test('row number <= array.length', () => {
    const mockRowNumber = '3';
    const mockDataLength = 3;
    expect(checkRowNumberError(mockRowNumber, mockDataLength)).toBe('');
});

test('row number > array.length', () => {
    const mockRowNumber = '4';
    const mockDataLength = 3;
    expect(checkRowNumberError(mockRowNumber, mockDataLength)).toBe('The row number exceeds the length of the array');
});