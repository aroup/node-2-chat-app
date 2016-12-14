var expect = require('expect');

var {generateLocationMessage} = require('./locationMessage');

describe('generateLocationMessage',()=>{
  it('should generate correct location message object',()=>{
    var from = 'Admin', longitude = '64658',latitude='4645';
    var locationMessage = generateLocationMessage(from,latitude,longitude);
    expect(locationMessage.createdAt).toBeA('number');
    expect(locationMessage).toInclude({
      from,
      url : `https://www.google.com/maps?q=${latitude},${longitude}`
    });
  });
});
