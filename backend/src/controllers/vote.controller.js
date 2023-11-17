const Voto = require('../models/Voto');

exports.votar = async (req, res) => {
    try {
        const { userID, recetaID, valor } = req.body;
        
        // Revisa si ya votó previamente
        let votoExistente = await Voto.findOne({ userID, recetaID });
        
        if (votoExistente) {
            // Actualizar el voto
            votoExistente.valor = valor;
            await votoExistente.save();
        } else {
            // Crear un nuevo voto
            const voto = new Voto(req.body);
            await voto.save();
        }

        res.status(201).send({ message: 'Voto registrado' });
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.obtenerVotosReceta = async (req, res) => {
    try {
        const votos = await Voto.find({ recetaID: req.params.recetaId });
        const totalVotos = votos.reduce((acc, voto) => acc + voto.valor, 0);
        
        res.status(200).send({ totalVotos });
    } catch (error) {
        res.status(500).send(error);
    }
};
