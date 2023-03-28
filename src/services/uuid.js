const { randomUUID } = require('crypto');

module.exports = function generateUUID(){
    return randomUUID()
}