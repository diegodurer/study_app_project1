const topicController = require("../../controller/topics/topics.controller");

module.exports = function (app) {
    app.get("/topics/list", topicController.listar);
    app.get("/topics/:id", topicController.buscarPorCodigo);
    app.post("/topics/update", topicController.actualizar);
    app.delete("/topics/delete/:id", topicController.eliminar);
};