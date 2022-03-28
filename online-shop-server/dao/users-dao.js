const connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");

async function login(user) {
    let sql = "SELECT * FROM users where email =? and password =?";
    let parameters = [user.email, user.password];

    let usersLoginResult;
    try {
        usersLoginResult = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), e);
    }

    if (usersLoginResult == null || usersLoginResult.length == 0) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    return usersLoginResult[0];
}

async function addUser(user) {
    let sql = "INSERT INTO users (id, name, lastname, password, city, street, email)  values(?, ?, ?, ?, ? ,? ,?)";
    let parameters = [user.id, user.name, user.lastname, user.password, user.city, user.street, user.email];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {

        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), e);
    }
}


async function isUserExistByName(email) {
    let sql = "SELECT * FROM users where email =?";
    let parameters = [email];
    let result;
   
    try {
      result =  await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, parameters, e);
    }
    return result;
}

async function isIdAlreadyExist(id) {
    let sql = "SELECT * FROM users where id =?";
    let parameters = [id];
    let result;
   
    try {
      result =  await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, parameters, e);
    }
    return result;
}


module.exports = {
    login,
    addUser,
    isUserExistByName,
    isIdAlreadyExist
}


