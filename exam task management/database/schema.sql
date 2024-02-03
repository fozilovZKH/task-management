CREATE TYPE role_type AS ENUM
('superAdmin', 'admin', 'manager', 'worker');

CREATE TABLE companies(
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) UNIQUE NOT NULL
);

CREATE TABLE users
(
    id serial primary key ,
    login varchar(32) unique not null,
    password text not null,
    full_name varchar(64) not null,
    company_id int default null,
    role role_type not null,
    constraint fk_company_id foreign key 
        (company_id) references companies
        (id)
);

CREATE TABLE tasks
(
    id serial primary key,
    title varchar(255) not null,
    description text not null,
    company_id int not null,
    parent_id int default null,
    day int not null,
    constraint fk_company_id foreign key
    (company_id) references companies (id)
);

CREATE TABLE user_tasks
(
    id serial primary key,
    user_id int not null,
    task_id int not null,
    start_at timestamp default CURRENT_TIMESTAMP,
    end_at timestamp not null,
    started_date date default null ,
    ended_data date default null,
    status varchar(50) default 'pending',
    constraint fk_user_id foreign key
    (user_id) references users(id),
    constraint fk_task_id foreign key
    (task_id) references tasks(id)
);

CREATE TABLE audit_companies
(
    id         INT,
    name       VARCHAR(128) NOT NULL,
    status     VARCHAR(10) NOT NULL,
    created_at timestamp default current_timestamp
);

CREATE TABLE audit_users
(
    id         INT,
    login      VARCHAR(128) NOT NULL,
    password   TEXT        NOT NULL,
    role       VARCHAR(128) NOT NULL,
    full_name  VARCHAR(128) NOT NULL,
    company_id INT         NOT NULL,
    status     VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT current_timestamp
);

