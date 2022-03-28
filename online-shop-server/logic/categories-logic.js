const categoriesDao = require("../dao/categories-dao");
const PushController = require("../controllers/push-controller");


async function getCategories() {
  
    let categories = await categoriesDao.getCategories();

    return categories
}


module.exports = {
    getCategories,
}
