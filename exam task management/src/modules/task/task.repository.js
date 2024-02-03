import { Postgres } from "../../lib/pg.js";

export class TaskRepository extends Postgres {
  async findAll() {
    return await this.fetchAll(`select * from tasks`);
  }

  async findOneById(id) {
    return await this.fetch(`select * from tasks where id = $1`, id);
  }

  async getTasksByCompanyId(companyId) {
    return await this.fetch(
      `SELECT json_agg(row_to_json(t)) AS tasks FROM ( SELECT id, title, description, company_id, parent_id, day
          FROM tasks
          WHERE company_id = $1
        ) t
      `,
      companyId
    );
  }

  async insert(dto) {
    return await this.fetch(
      `insert into tasks(title, description, company_id, parent_id, day) values($1, $2, $3, $4, $5) returning *`,
      dto.title,
      dto.description,
      dto.company_id,
      dto.parent_id,
      dto.day
    );
  }

  async update(dto) {
    return await this.fetch(
      `UPDATE tasks SET title = $2,  description = $3, company_id = $4, parent_id = $5, day = $6 WHERE id = $1 returning * `,
      dto.id,
      dto.title,
      dto.description,
      dto.company_id,
      dto.parent_id,
      dto.day
    );
  }

  async delete(id) {
    return await this.fetch(`delete from tasks where id = $1 returning *`, id);
  }
}
