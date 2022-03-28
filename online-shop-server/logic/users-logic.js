const usersDao = require("../dao/users-dao");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const config = require("../config.json");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");

const saltRight = "sdkjfhdskajh";
const saltLeft = "--mnlcfs;@!$ ";


async function login(userDetails) {

    userDetails.password = crypto.createHash("md5").update(saltLeft + userDetails.password + saltRight).digest("hex");

    let userLoginData = await usersDao.login(userDetails);
    const token = jwt.sign({
        userId: userLoginData.id,
        usertype: userLoginData.usertype,
        username: userLoginData.name,
        city: userLoginData.city,
        street: userLoginData.street
    }, config.secret);
    return { token: token, id: userLoginData.id, usertype: userLoginData.usertype};
}


async function addUser(userDetails) {
    validateUserData(userDetails);
    let usernameFromDb = await usersDao.isUserExistByName(userDetails.email);
    if (usernameFromDb.length != 0) {
        throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
    }
    userDetails.password = crypto.createHash("md5").update(saltLeft + userDetails.password + saltRight).digest("hex");
    await usersDao.addUser(userDetails);
}


function validateUserData(userDetails) {
    if (!userDetails.password) {
        throw new Error();
    }

    if (!userDetails.name) {
        throw new Error();
    }
}


async function isIdAlreadyExist(id){
    let result = await usersDao.isIdAlreadyExist(id);
    if (result.length != 0) {
        throw new ServerError(ErrorType.ID_ALREADY_EXIST);
    }
    return result
}

module.exports = {
    login,
    addUser,
    isIdAlreadyExist
}
