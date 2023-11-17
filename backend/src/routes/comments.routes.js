const express = require('express');

const router = express.Router();

// Las rutas de los comentarios seran: /comments y /comments/:id (para obtener un comentario en concreto=

router.get("/recipes/:id/comments", (req, res) => {
    res.send("GET /recipes/:id/comments")
})

router.post("/recipes/:id/comments", (req, res) => {
    res.send("POST /recipes/:id/comments")
})

router.get("/recipes/:id/comments/:id", (req, res) => {
    res.send("GET /recipes/:id/comments/:id")
})

router.put("/recipes/:id/comments/:id", (req, res) => {
    res.send("PUT /recipes/:id/comments/:id")
})

router.delete("/recipes/:id/comments/:id", (req, res) => {
    res.send("DELETE /recipes/:id/comments/:id")
})

module.exports = router;