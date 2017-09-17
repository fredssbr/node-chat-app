const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from = 'Anibal';
        var text = 'Let\s talk right now.';
        var message = generateMessage(from, text);
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(message.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var params = {
            from: 'Fred',
            lat: 90,
            long: 90
        };
        var message = generateLocationMessage(params.from, params.lat, params.long);
        expect(message.from).toBe(params.from);
        expect(message.url).toBe(`https://www.google.com/maps?q=${params.lat},${params.long}`);
        expect(message.createdAt).toBeA('number');
    });
});