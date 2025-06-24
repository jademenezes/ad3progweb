const { query } = require('../config/db');

class Professor {
  static async getAll() {
    const result = await query(`SELECT * FROM public.professores`);
    return result.rows;
  }

  static async getById({ id }) {
    const result = await query(
      `
          SELECT * FROM public.professores WHERE id = $1`,
      [id]
    );
    return result.rows;
  }

  static async insert({ nome, email, sala, turno, disciplina }) {
    console.log({ nome, email, sala, turno, disciplina });
    const result = await query(
      `INSERT INTO public.professores (nome, email, sala, turno, disciplina)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *`,
      [nome, email, sala, turno, disciplina]
    );
    return result.rows[0];
  }

  static async update({ id, nome, email, sala, turno, disciplina }) {
    const result = await query(
      `UPDATE public.professores SET nome= $2, email= $3, sala=$4, turno=$5, disciplina=$6
            WHERE id = $1 RETURNING *`,
      [id, nome, email, sala, turno, disciplina]
    );
    return result.rows[0];
  }

  //   static async update({ id, nome, email, sala, turno, disciplina }) {
  //     try {
  //       const result = await query(
  //         `UPDATE public.professores
  //        SET nome = $2, email = $3, sala = $4, turno = $5, disciplina = $6
  //        WHERE id = $1
  //        RETURNING *`,
  //         [id, nome, email, sala, turno, disciplina]
  //       );

  //       return result.rows[0];
  //     } catch (error) {
  //       console.error('[MODEL] Erro na atualização:', error);
  //       throw error;
  //     }
  //   }

  static async delete(id) {
    const result = await query(
      `DELETE FROM public.professores WHERE id=$1 RETURNING *`,
      [id]
    );
    return result.rows[0];
  }
}

module.exports = Professor;
