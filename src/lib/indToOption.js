const optionMap = new Map([
    [1, 'A'],
    [2, 'B'],
    [3, 'C'],
    [4, 'D'],
]);

export const indToOption = (option) => optionMap.get(option) || null;
