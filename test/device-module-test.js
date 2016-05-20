var chai, expect, sinon;

chai = require('chai');
sinon = require('sinon');
chai.use(require('sinon-chai'));
expect = chai.expect;

describe('device-module', function() {

  beforeEach(function() {
    this.robot = {
      respond: sinon.spy(),
      hear: sinon.spy()
    };
    return require('../src/device-module')(this.robot);
  });

  it('registers return listener', function() {
    return expect(this.robot.respond).to.have.been.calledWith(/(return) (.*)/i);
  });

  it('registers checkout listener', function() {
    return expect(this.robot.respond).to.have.been.calledWith(/(checkout) (.*)/i);
  });

  it('registers seed all devices listener', function() {
    return expect(this.robot.respond).to.have.been.calledWith(/(seed all devices)/i);
  });

  it('registers remove device listener', function() {
    return expect(this.robot.respond).to.have.been.calledWith(/(remove device) (.*)/i);
  });

  it('registers add device listener', function() {
  	return expect(this.robot.respond).to.have.been.calledWith(/(add device) (.*)/i);
  });

  it('registers listing all devices', function() {
  	return expect(this.robot.respond).to.have.been.calledWith(/(devices)/i);
  });
});