import { Postgres } from "../../lib/pg.js";

export class CompanyRepository extends Postgres {
  async findAll() {
    return await this.fetchAll(`select * from companies`);
  }

  async findOneByName(name) {
    return await this.fetch(`select * from companies where name = $1`, name);
  }

  async findOneById(id) {
    return await this.fetch(`select * from companies where id = $1`, id);
  }

  async insert(dto) {
    return await this.fetch(
      `insert into companies(name) values($1) returning *`,
      dto.name
    );
  }

  async update(dto) {
    return await this.fetch(
      `UPDATE companies SET name = $2  WHERE id = $1 returning * `,
      dto.id,
      dto.name
    );
  }

  async delete(id) {
    return await this.fetch(
      `delete from companies where id = $1 returning *`,
      id
    );
  }
}
