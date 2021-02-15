import { Transformer } from '../../src/transformer/transformer';

const stub = {
    'name': 'Foo',
    'afferent': [
        {
            name: "Bar"
        },
        {
            name: "Baz"
        }
    ],
    'efferent': [
        {
            'name': 'Bar',
        },
        {
            'name': 'Baz',
        }
    ]
};

describe('Transformer/Transformer', () => {
    it('constructs efferent couplings', () => {
        const transformer = Transformer(stub);
        expect(transformer.efferent()).toBe('Foo <-- Bar\nFoo <-- Baz\n');
    });

    it('constructs afferent couplings', () => {
        const transformer = Transformer(stub);
        expect(transformer.afferent()).toBe('Foo --> Bar\nFoo --> Baz\n');
    });
});