import { Postgres } from "../../lib/pg.js";

export class UserRepository extends Postgres {
  async findAll() {
    return await this.fetchAll("select * from users");
  }
  async findOneByLogin(login) {
    return await this.fetch("select * from users where login = $1", login);
  }
  async findOneById(id) {
    return await this.fetch("select * from users where id = $1", id);
  }
  async insert(dto) {
    return await this.fetch(
      `insert into users
    (login, password, full_name, company_id, role)
    values ($1, $2, $3, $4, $5) returning *
    `,
      dto.login,
      dto.password,
      dto.full_name,
      dto.company_id,
      dto.role
    );
  }

  async update(dto) {
    return await this.fetch(
      `UPDATE users SET login = $2, password = $3, full_name = $4, company_id = $5, role = $6 WHERE id = $1 returning * `,
      dto.id,
      dto.login,
      dto.password,
      dto.full_name,
      dto.company_id,
      dto.role
    );
  }

  async delete(id) {
    return await this.fetch(`delete from users where id = $1 returning *`, id);
  }
}
