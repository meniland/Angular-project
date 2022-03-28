let ErrorType = {

    GENERAL_ERROR: {
        id: 1,
        httpCode: 600,
        message: "general error",
        isShowStackTrace: true
    },
    USER_NAME_ALREADY_EXIST: {
        id: 2,
        httpCode: 601,
        message: "username (email) already exist",
        isShowStackTrace: false
    },
    UNAUTHORIZED: {
        id: 3,
        httpCode: 602,
        message: "Login failed, invalid username or password",
        isShowStackTrace: false
    },
    ID_ALREADY_EXIST: {
        id: 4,
        httpCode: 603,
        message: "this id is already exist !!",
        isShowStackTrace: false
    },
    TOO_MANY_ORDERS_AT_DAY: {
        id:5,
        httpCode: 604,
        message: "there is too many shippings in this day, please choose another one...",
        isShowStackTrace: false
    }
}

module.exports = ErrorType;