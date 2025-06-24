const Curso = require('../models/curso');

exports.getCursos = async (req, res) => {
  try {
    const cursos = await Curso.getAll();
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCurso = async (req, res) => {
  const id = req.params.id;
  try {
    const curso = await Curso.getById({ id });
    res.json(curso);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.insereCurso = async (req, res) => {
  try {
    const { nome, sigla, descricao, cordenador } = req.body;
    const curso = await Curso.insert({
      nome,
      sigla,
      descricao,
      cordenador,
    });
    res.status(201).json(curso);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCurso = async (req, res) => {
  const id = req.params.id;

  const { nome, sigla, descricao, cordenador } = req.body;
  const curso = await Curso.update({
    id,
    nome,
    sigla,
    descricao,
    cordenador,
  });
  res.json(curso);
};

exports.deleteCurso = async (req, res) => {
  const id = req.params.id;
  try {
    const curso = await Curso.delete(id);
    res.json({ message: 'curso excluído com sucesso', id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
