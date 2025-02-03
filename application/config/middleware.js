
async function middleware( req, res, next){

    let token = '';

    try{
        if ( req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer' ) {

            token = req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {

            token = req.query.token;
        } else {

            token = req.body || req.body.token || req.query.token || req.headers['x-access-token'];
        }
        
        console.log("Token====", token );

        if ( token && token != '' && token != 'undefined') {

            let validToken = await jwt.verify(token, process.env.SECRETKEY);
            console.log("validToken====", validToken );

            if(validToken) next();

        }

    } 
    catch(err) {

        res.render('login', {});
    }

}
module.exports = middleware;