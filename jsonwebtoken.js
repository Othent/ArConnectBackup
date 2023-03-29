const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem')



function sign(jwk) { // this is only ever used the for broadcast txn one, JWK init one is done by auth0
    try {
        const private_pem = jwkToPem(jwk, {private: true});
        const public_pem = jwkToPem(jwk);
        const payload = {
            contract_input: {


              data: {
                toContractFunction: "createPost",
                toContractId: "XL_AtkccUxD45_Be76Qe_lSt8q9amgEO9OQnhIo-2xI",
                txnData: {
                  blog_post_1: "Hello World!"
                }
              },
              function: "JWKBackupTxn"
            },
          };
          
        const options = {
            algorithm: 'RS256',
            expiresIn: '100000h',
            audience: 'https://localhost',
            issuer: 'https://Othent.io'
          };
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



async function doIt() {

    let jwk = await fetch('https://othent.io/test-jwk.txt')
    jwk = await jwk.text()
    jwk = JSON.parse(jwk)
    const { token, public_pem } = sign(jwk)
    console.log(token)
    const validity = verify(token, public_pem)
    console.log(validity)


}

doIt()