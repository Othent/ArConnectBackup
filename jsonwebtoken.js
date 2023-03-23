const fs = require('fs')
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem')


function sign(jwk) {
    try {
        const private_pem = jwkToPem(jwk, {private: true});
        const public_pem = jwkToPem(jwk);
        const payload = { sub: '1234567890', name: 'John Doe' };
        const options = { algorithm: 'RS256', expiresIn: '100000h' };
        const token = jwt.sign(payload, private_pem, options);
        return { token: token, public_pem: public_pem };
    } catch (err) {
        return false;
    }
}
function verify(token, public_pem) {
    try {
        const verifying = jwt.verify(token, public_pem)
        return verifying
    } catch (err) {
        return false
    }
}


const jwk = JSON.parse(fs.readFileSync('./wallet.json'))
const { token, public_pem } = sign(jwk)
console.log(token)
const validity = verify(token, public_pem)
console.log(validity)
