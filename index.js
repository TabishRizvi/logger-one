/**
 * Created by tabishrizvi on 03/01/16.
 */

var chalk = require('chalk')

var init = function(initObject){

    var request = ( typeof initObject.request!="undefined")?initObject.request: true;
    var requestData = {
        body: (initObject.requestData && typeof initObject.requestData.body!="undefined")?initObject.requestData.body : true,
        params: (initObject.requestData && typeof initObject.requestData.params!="undefined")?initObject.requestData.params : true,
        query: (initObject.requestData && typeof initObject.requestData.query!="undefined")?initObject.requestData.query : true,
        headers: (initObject.requestData && typeof initObject.requestData.headers !="undefined")?initObject.requestData.headers : true
    };
    var response = ( typeof initObject.response!="undefined")?initObject.response : true;
    var responseData = {
        status:(initObject.responseData && typeof initObject.responseData.status!="undefined")? initObject.responseData.status : true,
        body:(initObject.responseData && typeof initObject.responseData.body!="undefined")? initObject.responseData.body : true,
        responseTime:(initObject.responseData && typeof initObject.responseData.responseTime!="undefined")? initObject.responseData.responseTime : true
    };

    return function(req,res,next){


        req.loggerOne = {
            startTime : new Date(),
            endTime : null
        };

        if(!req.app.count){
            req.app.count  = 1;

        }


        var oldResEnd = res.end;

        res.end = function(chunk,encoding) {
            oldResEnd.apply(res, arguments);


            console.log(chalk['bgWhite'].black.bold("================logger-one================"));
            console.log(chalk.bgGreen.black.bold("LOG NO. : "+req.app.count));
            console.log(chalk.bgGreen.black.bold("DATETIME : "+new Date()));

            console.log(chalk.bgGreen.black.bold("METHOD : "+req.method));
            console.log(chalk.bgGreen.black.bold('URL : '+req.url));

            if(request){
                console.log(chalk.bgGreen.black.bold('REQUEST'));

                if(requestData.headers) {
                    console.log(chalk.bgGreen.black.bold('\tHEADERS'));
                    console.log(chalk.bgGreen.black.bold("\t\t" + JSON.stringify(req.headers)));
                }

                if(requestData.body) {
                    console.log(chalk.bgGreen.black.bold('\tBODY'));
                    console.log(chalk.bgGreen.black.bold("\t\t" + JSON.stringify(req.body)));
                }

                if(requestData.params) {
                    console.log(chalk.bgGreen.black.bold('\tPATH PARAMETERS'));
                    console.log(chalk.bgGreen.black.bold("\t\t" + JSON.stringify(req.params)));
                }

                if(requestData.query) {
                    console.log(chalk.bgGreen.black.bold('\tQUERY PARAMETERS'));
                    console.log(chalk.bgGreen.black.bold("\t\t" + JSON.stringify(req.query)));
                }
            }

            if(response){
                var responseBgColor = res.statusCode>=400?'bgRed':'bgGreen';


                console.log(chalk[responseBgColor].black.bold('RESPONSE'));

                if(responseData.status) {
                    console.log(chalk[responseBgColor].black.bold('\tSTATUS CODE'));
                    console.log(chalk[responseBgColor].black.bold("\t\t" + res.statusCode));
                }

                if(responseData.body) {
                    console.log(chalk[responseBgColor].black.bold('\tBODY'));
                    console.log(chalk[responseBgColor].black.bold("\t\t" + chunk.toString(encoding)));
                }

                if(responseData.responseTime)
                {
                    req.loggerOne.endTime = new Date();
                    var duration =req.loggerOne.endTime.getTime() - req.loggerOne.startTime.getTime();
                    console.log(chalk[responseBgColor].black.bold('RESPONSE TIME :' + duration + ' ms'));
                }

            }

        };









        req.app.count++;
        next();
    }
};


module.exports = init;