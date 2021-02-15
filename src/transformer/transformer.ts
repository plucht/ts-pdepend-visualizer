export const Transformer = (obj) => {
    const data = obj;

    const renderLine = (arrow: string) => {
        return (acc, cur) => {
            acc += `${data.name} ${arrow} ${cur.name}\n`;
            return acc;
        };
    };

    return {
        afferent: () => {
            return data.afferent.reduce(renderLine('-->'), '');
        },
        efferent: () => {
            return data.efferent.reduce(renderLine('<--'), '');
        }
    };
};