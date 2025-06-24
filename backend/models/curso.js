const { query } = require('../config/db');

class Curso {
  static async getAll() {
    const result = await query(`SELECT * FROM public.cursos`);
    return result.rows;
  }

  static async getById({ id }) {
    const result = await query(
      `
          SELECT * FROM public.cursos WHERE id = $1`,
      [id]
    );
    return result.rows;
  }

  static async insert({ nome, sigla, descricao, cordenador }) {
    //     console.log({ nome, sigla, descricao, cordenador });
    const result = await query(
      `INSERT INTO public.cursos (nome, sigla, descricao, cordenador)
          VALUES ($1, $2, $3, $4)
          RETURNING *`,
      [nome, sigla, descricao, cordenador]
    );
    return result.rows[0];
  }

  static async update({ id, nome, sigla, descricao, cordenador }) {
    const result = await query(
      `UPDATE public.cursos SET nome= $2, sigla= $3, descricao=$4, cordenador=$5
            WHERE id = $1 RETURNING *`,
      [id, nome, sigla, descricao, cordenador]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await query(
      `DELETE FROM public.cursos WHERE id=$1 RETURNING *`,
      [id]
    );
    return result.rows[0];
  }
}

module.exports = Curso;
