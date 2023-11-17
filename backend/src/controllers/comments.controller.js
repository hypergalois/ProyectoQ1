const Comentario = require('../models/Comentario');

exports.crearComentario = async (req, res) => {
    try {
        const comentario = new Comentario(req.body);
        await comentario.save();
        res.status(201).send(comentario);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.obtenerComentarios = async (req, res) => {
    try {
        const comentarios = await Comentario.find({ recetaID: req.params.recetaId }).populate('userID', 'nombreUsuario');
        res.status(200).send(comentarios);
    } catch (error) {
        res.status(500).send(error);
    }
};
