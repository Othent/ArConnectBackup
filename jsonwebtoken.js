const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem')



function sign(jwk) { // this is only ever used the for broadcast txn one, JWK init one is done by auth0
    try {
        const private_pem = jwkToPem(jwk, {private: true});
        const public_pem = jwkToPem(jwk);
        console.log(public_pem)

        const payload = {

          sub: 'google-oauth2|113378216876216346016', // lorimerjenkins1@gmail.com
          
          contract_input: {
            
            data: {
              toContractFunction: "createPost",
              toContractId: "XL_AtkccUxD45_Be76Qe_lSt8q9amgEO9OQnhIo-2xI",
              txnData: {
                blog_post_1: "JWK TXN WORKING!"
              }
            },
            function: "JWKBackupTxn"
            },
          };
          
        const options = {
            algorithm: 'RS256',
            expiresIn: '100000h',
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
  const validity = verify(token, public_pem, { algorithms: ['RS256'] })
  console.log(validity)

  // console.log(formatPemPublicKey(public_pem))




}

doIt()


function formatPemPublicKey(pemKey) {

  pemKey = pemKey.replace(/\n|\s/g, '');
  pemKey = pemKey.replace(/^-----BEGINPUBLICKEY-----/, '');
  pemKey = pemKey.replace(/-----ENDPUBLICKEY-----$/, '');
  const lines = pemKey.match(/.{1,64}/g);
  const formattedKey = '-----BEGIN PUBLIC KEY-----\n' + lines.join('\n') + '\n-----END PUBLIC KEY-----';

  return formattedKey;
}


