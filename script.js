// npm run start1

const moment = require("moment")

function getCurrentDay(){
    console.log(moment().format('dddd'))
}
function getCurrentMonth(){
    console.log(moment().format('MMMM'))
}
function getCurrentYear(){
    console.log(moment().format('YYYY'))
}

function runCallbackFunc(callback, callbackArgs){
    callback(callbackArgs)
}

runCallbackFunc(getCurrentDay)
runCallbackFunc(getCurrentMonth)
runCallbackFunc(getCurrentYear)
