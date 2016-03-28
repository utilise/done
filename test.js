var expect = require('chai').expect
  , push = require('utilise.push')
  , keys = require('utilise.keys')
  , set = require('utilise.set')
  , done = require('./')

describe('done', function() {

  it('should listen for response to change', function() {
    var body = set()([])

    done(push({ foo: 'bar' })(body))(then('first'))
    done(push({ foo: 'bar' })(body))(then('second'))

    expect(keys(body.on.response)).to.have.lengthOf(2)
    expect(body.on.response._1).to.be.a('function')
    expect(body.on.response._2).to.be.a('function')

    body.emit('response._2', 'second')
    body.emit('response._1', 'first')

    expect(keys(body.on.response)).to.have.lengthOf(0)

    function then(req) {
      return function(param){
        expect(param).to.be.eql(req)
      }
    }

  })

})