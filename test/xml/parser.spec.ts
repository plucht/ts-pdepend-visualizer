import { parse, parseFile } from '../../src/xml/parser';

const fixture = `
<class name="Foobar">
    <efferent>
        <type namespace="Acme\\Core\\Framework" name="Bar"/>
        <type namespace="Acme\\Core\\Content" name="Baz"/>
    </efferent>
    <afferent>
        <type namespace="Acme\\Core\\Content" name="AfferentBar"/>
        <type namespace="Acme\\Core\\Content" name="AfferentBaz"/>
    </afferent>
    <file name="/home/user/Foobar.php"/>
</class>`;

const fixture_2 = `
<class name="Foobar">
    <efferent>
        <type namespace="Acme\\Core\\Framework" name="Bar"/>
        <type namespace="Acme\\Core\\Content" name="Baz"/>
    </efferent>
    <afferent>
        <type namespace="Acme\\Core\\Content" name="AfferentBar"/>
        <type namespace="Acme\\Core\\Content" name="AfferentBaz"/>
    </afferent>
    <file name="/home/user/Foobar.php"/>
</class>
<class name="Bar">
    <efferent/>
    <afferent>
        <type namespace="Acme\\Core\\Content" name="Foobar"/>
    </afferent>
    <file name="/home/user/Bar.php"/>
</class>
`;

describe('Xml/Parser', () => {
    describe('parse one class or interface', () => {
        it('reads name and type into data structure', () => {
            expect(parse(fixture.split('\n'))).toMatchObject({name: 'Foobar', type: 'class'});
        });
    
        it('attaches two afferent dependencies with names', () => {
            expect(parse(fixture.split('\n'))).toMatchObject({
                    afferent: [
                        {type: 'type', name: 'AfferentBar'},
                        {type: 'type', name: 'AfferentBaz'}
                    ]
                });
        });
    
        it('attaches two efferent dependencies with names', () => {
            expect(parse(fixture.split('\n'))).toMatchObject({
                    efferent: [
                        {type: 'type', name: 'Bar'},
                        {type: 'type', name: 'Baz'}
                    ]
                });
        });
    });
   
    describe('parse a set of classes or interfacees', () => {
        it('creates two objects', () => { // todo: name is really horrible
            expect(parseFile(fixture_2)).toMatchObject(
                [
                    {type: 'class', name: 'Foobar'},
                    {type: 'class', name: 'Bar'},
                ]
            );
        });
    });
});