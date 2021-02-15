import { fileURLToPath } from "url";
import { parse } from '../../src/xml/parser';

const fixture = `
<class name="Foobar">
    <efferent>
        <type namespace="Acme\Core\Framework" name="Bar"/>
        <type namespace="Acme\Core\Content" name="Baz"/>
    </efferent>
    <afferent>
        <type namespace="Acme\Core\Content" name="AfferentBar"/>
        <type namespace="Acme\Core\Content" name="AfferentBaz"/>
    </afferent>
    <file name="/home/user/Foobar.php"/>
</class>`;

describe('Xml/Parser', () => {
    it('reads name into data structure', () => {
        expect(parse(fixture)).toMatchObject({name: 'Foobar'});
    });

    it('reads type into data structure', () => {
        expect(parse(fixture)).toMatchObject({type: 'class'});
    });

    it('attaches two afferent dependencies with names', () => {
        expect(parse(fixture)).toMatchObject({
                afferent: [
                    {type: 'type', name: 'AfferentBar'},
                    {type: 'type', name: 'AfferentBaz'}
                ]
            });
    });

    it('attaches two efferent dependencies with names', () => {
        expect(parse(fixture)).toMatchObject({
                efferent: [
                    {type: 'type', name: 'Bar'},
                    {type: 'type', name: 'Baz'}
                ]
            });
    });
});