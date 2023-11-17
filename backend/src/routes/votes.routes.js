const express = require('express');

const router = express.Router();

router.post("/recipes/:id/votes", (req, res) => {
    res.send("POST /recipes/:id/votes")
})

router.delete("/recipes/:id/votes/:id", (req, res) => {
    res.send("DELETE /recipes/:id/votes/:id")
})

router.get("/recipes/:id/votes", (req, res) => {
    res.send("GET /recipes/:id/votes")
})

module.exports = router;