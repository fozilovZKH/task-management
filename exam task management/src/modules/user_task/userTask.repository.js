import { Postgres } from "../../lib/pg.js";

export class UserTaskRepository extends Postgres {
  async findAll() {
    return await this.fetchAll("SELECT * FROM user_tasks");
  }

  async getByTaskId(taskId) {
    return await this.fetch(
      `SELECT json_agg(row_to_json(u)) AS users
        FROM users u
        JOIN user_tasks ut ON u.id = ut.user_id
        JOIN tasks t ON t.id = ut.task_id
        WHERE t.id = $1
      `,
      taskId
    );
  }

  async getByUserId(userId) {
    return await this.fetch(
      `  
        SELECT json_agg(row_to_json(t)) AS tasks
        FROM tasks t 
        JOIN user_tasks ut ON t.id = ut.task_id
        JOIN users u ON u.id = ut.user_id
        WHERE u.id = $1
      `,
      userId
    );
  }

  async findOneById(id) {
    return await this.fetch("select * from user_tasks where id = $1", id);
  }

  async insert(dto) {
    return await this.fetch(
      "INSERT INTO user_tasks(user_id, task_id, start_at, end_at, started_date, ended_data, status) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      dto.user_id,
      dto.task_id,
      dto.start_at,
      dto.end_at,
      dto.started_date,
      dto.ended_date,
      dto.status
    );
  }

  async update(dto) {
    return await this.fetch(`UPDATE user_tasks SET user_id = $2, task_id = $3, start_at = $4, end_at = $5, started_date = $6, ended_date = $7, status = $8 WHERE id = $1 RETURNING * `,
      dto.id,
      dto.user_id,
      dto.task_id,
      dto.start_at,
      dto.end_at,
      dto.started_date,
      dto.ended_date,
      dto.status
    );
  }

  async delete(id) {
    return await this.fetch(`DELETE FROM user_tasks WHERE id = $1 RETURNING * `, id);
  }
}
