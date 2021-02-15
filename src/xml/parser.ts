const parseNameAndType = (line: string) => {
    return {
        name: /name="([^"]+)"/.exec(line)[1],
        type: /\<([^ ]+)/.exec(line)[1]
    };
}

export const parse = (input: string) => {
    const lines = input
        .split('\n')
        .map(l => l.trim())
        .filter(l => l.length > 0);

    let context = 'class';
    const afferent = [];
    const efferent = [];
    for (let line of lines) {
        if (line == '<afferent>') {
            context = 'afferent';
            continue;
        }
        if (line == '<efferent>') {
            context = 'efferent';
            continue;
        }
        if (line == '</afferent>' || line == '</efferent>') {
            context = 'class';
            continue;
        }

        if (context == 'afferent') afferent.push(parseNameAndType(line));
        if (context == 'efferent') efferent.push(parseNameAndType(line));
    }

    return {
        ...parseNameAndType(lines[0]),
        afferent,
        efferent
    };
};