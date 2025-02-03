

const middleware = require('../config/middleware');
const axios = require ('axios');
const API_URL = "https://api.openweathermap.org/data/2.5/weather?"
const JWT     = require('jsonwebtoken');
const helper  = require('../common/helper');

module.exports.init = function(app){


    app.get('/', middleware, (req, res)=>{

        res.render("weather", {});
    });

    app.get('/login', (req, res)=>{

        res.render("login", {});
    });
    app.post('/login', async (req, res)=>{

        console.log("req.body=====", req.body);

        if ( req.body && req.body.email) {

            const users = db.collection("users");
            console.log(`users:${users}`);

            let result = await users.find({email:req.body.email}).toArray()
            if ( result) {

                if ( result && result.length > 0 ) {

                    if ( result[0].password == req.body.password) {

                        let token = JWT.sign({email : result[0].email, id: result[0]._id, name:result[0].name }, process.env.SECRETKEY, );
                        helper.successHandler(res,{payload: {token: token}});
                    } else {

                        helper.errorHandler(res)

                    }

                } else {

                    helper.errorHandler(res)

                }
            } else {

                helper.errorHandler(res)
            }
        } else {

            helper.errorHandler(res)
        }
    });
    app.get('/signup', (req, res)=>{

        res.render("signup", {});
    });
    app.post('/signup', async (req, res)=>{

        console.log("req.body====111=", req.body);
        if ( req.body && req.body.email) {

            const users = db.collection("users");
            console.log(`users:${users}`);

            let result = await users.insertOne({ name: req.body.name, email: req.body.email, password:req.body.password });
            if ( result) {

                let token = JWT.sign({email : result[0].email, id: result[0]._id, name:result[0].name }, process.env.SECRETKEY, );
                helper.successHandler(res,{payload: {token: token}})
            } else {

                helper.errorHandler(res)
            }
        } else {

            helper.errorHandler(res)
        }
    });
    app.get('/weather', (req, res) => {

        res.render('search_page', {info: ''});
    })

    app.post("/weather", async (req, res,next) => {

        console.log('req.body===', req.query, 'req.params', req.params);
        try {
            let search = req.body.search
            const url = `${API_URL}q=${search}&appid=${process.env.WEATHERAPIKEY}&units=metric`;
            const weatherGet =await axios.get(url)
            
            res.render('weather',{info:weatherGet.data})
            console.log(weatherGet.data)
        } catch(error) {
            if (error.response) {
                res.render('weather', { info : null })
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                res.render('weather', { info : null })
                console.log(error.request);
            } else {
                res.render('weather', { info : null })
                console.log('Error', error.message);
            }
            console.log(error.config);
        };
    });

}