const connection = require("./connection-wrapper");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error")

async function getCategories() {

    let sql = "SELECT * FROM online_shop.categories"
    try {
        let categories = await connection.executeWithParameters(sql);
        return categories;
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, e);
    }
}

module.exports = {
    getCategories,
}


