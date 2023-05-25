const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem')


function sign(jwk) { // this is only ever used the for broadcast txn one, JWK init one is done by auth0
    try {
        const private_pem = jwkToPem(jwk, {private: true});
        const public_pem = jwkToPem(jwk);
        // console.log(public_pem)

        const payload = {

          sub: 'google-oauth2|113378216876216346016', // lorimerjenkins1@gmail.com
          contract_id: 'PsOPYiBd_LPdNAo_TomgWVuucDwLt1SotiArYCeF-W0', // user will need to provide,
          tags: [ {name: 'Hello', value: 'There'} ],
          
          contract_input: {
            
            data: {
              toContractFunction: "createPost",
              toContractId: "tQKJCf2E9lIaNTjM8ELK6ATlJtef8cVmq68c9XnVuj0",
              txnData: {
                blog_post_1: "Hello There!"
              }
            },
            othentFunction: "JWKBackupTxn"
            },
          };
          
        const options = {
            algorithm: 'RS256',
            expiresIn: '100000000h',
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
        const verifying = jwt.verify(token, public_pem, { 
          algorithms: ['RS256']})
        return verifying
    } catch (err) {
        return false
    }
}



const JWT = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnb29nbGUtb2F1dGgyfDExMzM3ODIxNjg3NjIxNjM0NjAxNiIsImNvbnRyYWN0X2lkIjoiSlVUV2hPM1BGXzIycmFzNkpWSWxDQUx6cWxrZnNjS0JLUHo3dnhZS1hBOCIsInRhZ3MiOlt7Im5hbWUiOiJUZXN0IiwidmFsdWUiOiJUYWcifV0sImNvbnRyYWN0X2lucHV0Ijp7ImRhdGEiOnsidG9Db250cmFjdEZ1bmN0aW9uIjoiY3JlYXRlUG9zdCIsInRvQ29udHJhY3RJZCI6InRRS0pDZjJFOWxJYU5Uak04RUxLNkFUbEp0ZWY4Y1ZtcTY4YzlYblZ1ajAiLCJ0eG5EYXRhIjp7IlBPU1QiOiJHUk9VUCBURVNUIn19LCJvdGhlbnRGdW5jdGlvbiI6IkpXS0JhY2t1cFR4biJ9fQ.DThRIlVvPGSULXmN2q6wYhm3PXlUwnVvc8lFLyWtOIbqBvQiqnGIoJHW6DG0LpzKEJF5o76ckjhXyX0EcfwGLvcuqMcvEi-O61Xn0ovAmfravhHaSk7s73GBcC9BWkGdfaqtLjPxORE2-GeCZu3qu1o8aqkCTNnXSI9kEzm_6UdFxwTYQSo-POyhNSq_5nP88wgogwAE67tQJeLhXivBGJ1_9WrXs7rBXc7dzcW2Xw2hPCKZadypxONA6E8l7TTwt1zdI4WfahYG_b_I_c-7g1FfbojGkiUPNtYmTTJoN6mU6nC2A3fwSzxWYtrIhKOmgR1mZd4dpjN2n2Q8SJb5MMwAF_0QEVndK0E_NZHYgGtAI_32mhdCWmYHc5nYrds7fr9btgHW3eSeHDUBBXuaAKTsp3lq_Aurhkqer_1uWpFpoPNBv0_M7f-6vfNz5n-plVOE92Z1bLg0wSbzbCamGJ8UsMPNd5MuIdWgOmZliFdGiJMroiZhEWVqNu4Ih7XDrLjZYyx7mrVW5ug10LjfcAOZdReFDxVefqy4LnrMcJhPvE68fmKB8QZ0NElSO-U5n9iVSOEVpuTOwrUvmOwuts-oRudnmg3pYdLLjzuyt0E0TWcVLh8QM5gVDz3vVn3sDDfYP8ArP6Svc6f0PnoP25YIouI64yscFwr10ZB9Aq8`

const public_PEM = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAiSGYBVYjH2jHL2ZfI3ym
VWq+bqkPJUP3Zh8NzYrppU77RI+W/Gucg0ZMFHelgeY4xw2axhXWGJqLLFcp1Mr7
xAZ3wIGLfiwvJNejFOwtJFcPbPoRKkTVLP0wWAZmbeKhnu1wFhfHrn2CYZEsVn2Z
6BBUnXSo9CIG/Db55tfdcTM6gu6i9z/D3BUOhAeBeSKwqsc+G5KFG/r43I2tvVDp
zWK8iUqTatRix0tvX1Mf1SLlovtEVBlNglmanTZdosZQyIxCS600ylCAaogWwYmh
15PMz4Fw/pnkXpvTIGquOfVUoILxh7vbESsNknNKcrcD7uzrPyk7mBZeTDkjS+8a
vsTIDvibQGHznX/knAP2qiIHxjOmzp4jNRt7DphiIuXJZx5tm6kR7xOUcSiIxH4r
0tiwWMiP95K1k7d9D8171CEn7YZmNJGYr4a+I8XML5vCq99SowksSoydi+UUN+hU
NuiMLZKxi2EA/cI/DzX8WqzkLMHix6m8TQDRhUZ7otXiOXhloFWXV2KPiQD9Wiio
CcGUsGzUlRXxcpite5a3zLG8PoEaLSjZcFZrEd2CvMs44aCmb4JQyP54VE76ojo+
Opy/0Yb8RMNKoX0QvUeD7NOK+hXBwIDBgm+QrDjgHQ6+RXs72cMiHjl2aib/YRwb
wW68pg9G6C+iSM9MMwlbBv0CAwEAAQ==
-----END PUBLIC KEY-----
`


console.log(verify(JWT, public_PEM))


async function doIt() {

  

  let jwk = await fetch('https://othent.io/test-jwk.txt')
  jwk = await jwk.text()
  jwk = JSON.parse(jwk)
  const { token, public_pem } = sign(jwk)

  // console.log(token)
  const validity = verify(token, public_pem, { algorithms: ['RS256'] })
  // console.log(validity)

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


