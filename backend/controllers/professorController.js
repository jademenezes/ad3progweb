const Professor = require('../models/professor');

exports.getProfessores = async (req, res) => {
  try {
    const professores = await Professor.getAll();
    res.json(professores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfessor = async (req, res) => {
  const id = req.params.id;
  try {
    const professor = await Professor.getById(id);
    res.json(professor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.insereProfessor = async (req, res) => {
  try {
    const { nome, email, sala, turno, disciplina } = req.body;
    const professor = await Professor.insert({
      nome,
      email,
      sala,
      turno,
      disciplina,
    });
    res.status(201).json(professor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfessor = async (req, res) => {
  const id = req.params.id;

  const { nome, email, sala, turno, disciplina } = req.body;
  const professor = await Professor.update({
    id,
    nome,
    email,
    sala,
    turno,
    disciplina,
  });
  res.json(professor);
};

// exports.updateProfessor = async (req, res) => {
//   console.log('[CONTROLLER] Iniciando atualização...');

//   try {
//     const id = req.params.id;
//     console.log('[CONTROLLER] ID recebido:', id);

//     const { nome, email, sala, turno, disciplina } = req.body;
//     console.log('[CONTROLLER] Dados recebidos:', {
//       nome,
//       email,
//       sala,
//       turno,
//       disciplina,
//     });

//     const professor = await Professor.update({
//       id: parseInt(id),
//       nome,
//       email,
//       sala,
//       turno,
//       disciplina,
//     });

//     console.log('[CONTROLLER] Update finalizado:', professor);
//     res.json(professor);
//   } catch (error) {
//     console.error('[CONTROLLER] Erro completo:', {
//       message: error.message,
//       stack: error.stack,
//     });

//     if (error.message.includes('Nenhum professor encontrado')) {
//       return res.status(404).json({ error: error.message });
//     }
//     res.status(500).json({ error: 'Erro interno no servidor' });
//   }
// };

exports.deleteProfessor = async (req, res) => {
  const id = req.params.id;
  try {
    const professor = await Professor.delete(id);
    res.json({ message: 'professor excluído com sucesso', id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
