



let helper = {};

/**
 * 
 * @param {*} res 
 * @Devloper : Vikas Rana 
 * @param {*} code 
 */
helper.successHandler = function (res, obj, code) {

    let resObj = {

        status : true,
        message: 'Success',
        payload: {}
    }
    if ( obj && Object.keys(obj).length > 0) {

        for(let keyObj in obj ) {

            resObj[keyObj] = obj[keyObj];
        }
    }
    console.log("resObj==111111==", resObj );

    res.send(resObj);

}

/**
 * 
 * @param {*} res 
 * @Devloper : Vikas Rana 
 * @param {*} code 
 */
helper.errorHandler = function (res, obj, code) {

    let resObj = {

        status : false,
        message: 'Error',
        payload: {}
    }
    if ( obj && Object.keys(obj).length > 0) {

        for(let keyObj in obj ) {

            resObj[keyObj] = obj[keyObj];
        }
    }
    console.log("resObj====", resObj );
    res.send(resObj);

}
module.exports = helper;