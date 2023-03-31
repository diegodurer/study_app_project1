const themeController = require("../../controller/themes/themes.controller");

module.exports = function (app) {
    app.get("/themes/list", themeController.listar);
    app.get("/themes/:id", themeController.buscarPorCodigo);
    app.post("/themes/update", themeController.actualizar);
    app.delete("/themes/delete/:id", themeController.eliminar);
};