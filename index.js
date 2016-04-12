/**
 * Created by tabishrizvi on 03/01/16.
 */

var chalk = require('chalk'),
    md5 = require('md5');



var logThis = function(isError,value){

    console.log(chalk[isError?'red':'green'].bold(value));
};

var init = function(initObject){

    var request = (initObject &&  initObject.request!=undefined)?initObject.request: true;
    var requestData = {
        body: (initObject &&  initObject.requestData && initObject.requestData.body!=undefined)?initObject.requestData.body : true,
        params: (initObject &&  initObject.requestData && initObject.requestData.params!=undefined)?initObject.requestData.params : true,
        query: (initObject &&  initObject.requestData &&  initObject.requestData.query!=undefined)?initObject.requestData.query : true,
        headers: (initObject &&  initObject.requestData &&  initObject.requestData.headers !=undefined)?initObject.requestData.headers : true
    };
    var response = ( initObject &&   initObject.response!=undefined)?initObject.response : true;
    var responseData = {
        status:(initObject &&  initObject.responseData && typeof initObject.responseData.status!=undefined)? initObject.responseData.status : true,
        body:(initObject &&  initObject.responseData && typeof initObject.responseData.body!=undefined)? initObject.responseData.body : true,
        responseTime:(initObject &&  initObject.responseData && typeof initObject.responseData.responseTime!=undefined)? initObject.responseData.responseTime : true
    };

    return function(req,res,next){


        req.loggerOne = {
            startTime : new Date(),
            endTime : null
        };

        if(!req.app.count){
            req.app.count  = 0;

        }


        var oldResEnd = res.end;

        res.end = function(chunk,encoding) {
            oldResEnd.apply(res, arguments);


            req.app.count++;
            var isError = res.statusCode>=400;

            logThis(isError,"================logger-one================");
            logThis(isError,"LOG ID. : "+ md5(req.loggerOne.startTime.toISOString()));
            logThis(isError,"DATETIME : "+req.loggerOne.startTime);
            logThis(isError,"METHOD : "+req.method);
            logThis(isError,'URL : '+req.originalUrl);


            if(request){

                logThis(isError,'\nREQUEST');

                if(requestData.headers) {
                    logThis(isError,'\n\tHEADERS');
                    logThis(isError,"\t\t" + JSON.stringify(req.headers));
                }

                if(requestData.body) {
                    logThis(isError,'\n\tBODY');
                    logThis(isError,"\t\t" + JSON.stringify(req.body));
                }

                if(requestData.params) {
                    logThis(isError,'\n\tPATH PARAMETERS');
                    logThis(isError,"\t\t" + JSON.stringify(req.params));
                }

                if(requestData.query) {
                    logThis(isError,'\n\tQUERY PARAMETERS');
                    logThis(isError,"\t\t" + JSON.stringify(req.query));
                }
            }

            if(response){
                logThis(isError,'\nRESPONSE');

                if(responseData.status) {
                    logThis(isError,'\n\tSTATUS CODE');
                    logThis(isError,"\t\t" + res.statusCode);
                }

                if(responseData.body) {
                    logThis(isError,'\n\tBODY');
                    logThis(isError,"\t\t" + chunk.toString(encoding));
                }

                if(responseData.responseTime)
                {
                    req.loggerOne.endTime = new Date();
                    var duration =req.loggerOne.endTime.getTime() - req.loggerOne.startTime.getTime();
                    logThis(isError,'\nRESPONSE TIME :' + duration + ' ms\n');
                }

            }

        };



        next();
    }
};


module.exports = init;