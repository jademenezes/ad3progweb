const express = require('express');
const router = express.Router();

// rota para professores
router.use('/professores', require('./professores'));

// rota para cursos
// router.use('/cursos', require('./cursos'))
// rota para disciplinas
// router.use('/disciplinas', require('./disciplinas'))

module.exports = router;
