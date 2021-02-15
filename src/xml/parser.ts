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

export const parse = (input: string) => {
    const lines = input
        .split('\n')
        .map(l => l.trim())
        .filter(l => l.length > 0);

    return {
        ...parseNameAndType(lines[0]),
        afferent: getDependencies(lines, 'afferent').map(parseNameAndType),
        efferent: getDependencies(lines, 'efferent').map(parseNameAndType)
    };
};