CREATE INDEX idx_users_company_id ON users USING HASH (company_id);

CREATE INDEX idx_tasks_company_id ON tasks USING HASH (company_id); 

CREATE INDEX idx_tasks_parent_id ON tasks USING HASH (parent_id);

CREATE INDEX idx_user_tasks_user_id ON user_tasks USING HASH (user_id);

CREATE INDEX idx_user_tasks_task_id ON user_tasks USING HASH (task_id);