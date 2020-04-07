//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

//Assets
const lineAssets = require('./assets/lines');
const line1 = new viatransit.Line(lineAssets.line1);
const line2 = new viatransit.Line(lineAssets.line2);

describe('Lines', () => {

    describe('API', () => {

        it('should receive all lines', async () => {
            const lines = await viatransit.API.getLines('tam');

            assert.lengthOf(lines.lines, 45);
            assert.instanceOf(lines.lines[0], viatransit.Line);
        });

    });

    describe('Model', () => {

        it('should be properly filled from viaTransit API format', () => {
            //Generic properties
            assert.strictEqual(line1.id, '1');
            assert.strictEqual(line1.networkKey, 'tam');
            assert.strictEqual(line1.name, 'T1 Mosson <> Odysseum');
            assert.strictEqual(line1.shortName, '1');
            assert.strictEqual(line1.type, 0);
            assert.strictEqual(line1.displayOrder, 1);
            //Style
            assert.strictEqual(line1.style.backgroundColor, '0055A0');
            assert.strictEqual(line1.style.foregroundColor, 'FFFFFF');
            assert.deepStrictEqual(line1.style.attributes, {"lametric_icon_id": "i24032", "displayed_on_map": true, "style_CSS": {"borderRadius": "8px 0 8px 8px"}, "style_RN": {"container": {"borderTopLeftRadius": 8,"borderBottomLeftRadius": 8,"borderBottomRightRadius": 8}}});
            //Stop Sequences
            assert.lengthOf(line1.stopSequences, 3);
            assert.instanceOf(line1.stopSequences[0], viatransit.StopSequence);
            assert.deepStrictEqual(line1.stopSequences[0].sequence, [{"stopId": "1133", "stationId": "S1133"}, {"stopId": "1135", "stationId": "S1135"}, {"stopId": "1137", "stationId": "S1137"}]);
            assert.strictEqual(line1.stopSequences[0].main, true);
            assert.strictEqual(line1.stopSequences[0].direction, 0);
            assert.strictEqual(line1.stopSequences[0].attributes, null);
        });

        it('should works with attributes', () => {
            //General attributes
            assert.isNull(line1.getAttribute('blabla'));
            assert.isNull(line2.getAttribute('icon'));
            assert.isTrue(line2.getAttribute('showTypeBefore'));
            //Style attributes
            assert.deepStrictEqual(line1.getStyleAttribute('style_RN'), {"container": {"borderTopLeftRadius": 8, "borderBottomLeftRadius": 8, "borderBottomRightRadius": 8}});
            assert.isNull(line1.getStyleAttribute('style_screen'));
            assert.isNull(line2.getStyleAttribute('style_RN'));
            //Stop sequence attributes
            assert.strictEqual(line1.stopSequences[1].getAttribute('directionHeadsign'), 'Port Marianne');
            assert.isNull(line1.stopSequences[1].getAttribute('stationNames'));
            assert.isNull(line1.stopSequences[0].getAttribute('directionHeadsign'));

        });

    });

});