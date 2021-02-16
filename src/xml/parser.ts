const parseNameAndType = (line: string) => {
    return {
        name: /name="([^"]+)"/.exec(line)[1],
        type: /^\<([^ ]+)/.exec(line)[1]
    };
}

const getDependencies = (lines: Array<string>, tagName: string) => {
    const dependencies = [];
    let mode = 'skip';
    for (let line of lines) {
        if (line == `<${tagName}>`) {
            mode = 'append';
            continue;
        }
        else if (line == `</${tagName}>`) {
            mode = 'skip';
            continue;
        }

        if (mode == 'append') dependencies.push(line);
    }

    return dependencies;
};

const findBoundaries = (lines: Array<string>) => {
    const lineNumbers = lines
        .map((line, lineNumber) => /class/.test(line) ? lineNumber : 0)
        .filter(lineNumber => lineNumber > 0);

    const chunks = [];
    let index = 0;
    while (index < lineNumbers.length) {
        chunks.push(lineNumbers.slice(index, index + 2));
        index += 2;
    }

    return chunks
        .map(([start, end]: [number, number]) => {
            return {start, end};
        });
};

const getDefinition = (lines: Array<string>) => {
    return ({start, end}:  {start: number, end: number}) => lines.slice(start, end);
};

export const parse = (input: Array<string>) => {
    const lines = input
        .map(l => l.trim())
        .filter(l => l.length > 0)
    ;

    return {
        ...parseNameAndType(lines[0]),
        afferent: getDependencies(lines, 'afferent').map(parseNameAndType),
        efferent: getDependencies(lines, 'efferent').map(parseNameAndType)
    };
};

export const parseFile = (input: string) => {
    const lines = input.split('\n');
    const packDefinition = getDefinition(lines);

    return findBoundaries(lines)
        .map(packDefinition)
        .map(parse)
    ;
};