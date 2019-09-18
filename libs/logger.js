// logger.js

exports.log = (str) => {
    let date = new Date();
    let hour = date.getUTCHours().toString();
    let minute = date.getUTCMinutes().toString();
    console.log(`[INFO] ${hour.length < 2? `0${hour}`: hour }:${minute.length < 2? `0${minute}`: minute } ${str}`)
}

exports.error = (str) => {
    let date = new Date();
    let hour = date.getUTCHours().toString();
    let minute = date.getUTCMinutes().toString();
    console.error(`[ERROR] ${hour.length < 2? `0${hour}`: hour }:${minute.length < 2? `0${minute}`: minute } ${str}`)
}