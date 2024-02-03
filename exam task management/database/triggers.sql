/* Audit companies trigger*/
CREATE OR REPLACE FUNCTION audit_companies_function()
    RETURNS TRIGGER AS
$$
BEGIN
    INSERT INTO audit_companies (id, name, status)
    VALUES (coalesce(NEW.id, old.id),
            COALESCE(NEW.name, OLD.name),
            CASE
                WHEN TG_OP = 'INSERT' THEN 'INSERT'
                WHEN TG_OP = 'UPDATE' THEN 'UPDATE'
                WHEN TG_OP = 'DELETE' THEN 'DELETE'
                END);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER audit_companies_trigger
    AFTER INSERT OR UPDATE OR DELETE
    ON companies
    FOR EACH ROW
EXECUTE FUNCTION audit_companies_function();


/* Audit user trigger */
CREATE OR REPLACE FUNCTION audit_users_function()
    RETURNS TRIGGER AS
$$
BEGIN
    INSERT INTO audit_users (id, login, password, role, full_name, company_id, status)
    VALUES (coalesce(NEW.id, old.id),
            COALESCE(NEW.login, OLD.login),
            COALESCE(NEW.password, OLD.password),
            COALESCE(NEW.role, OLD.role),
            COALESCE(NEW.full_name, OLD.full_name),
            COALESCE(NEW.company_id, OLD.company_id),
            CASE
                WHEN TG_OP = 'INSERT' THEN 'INSERT'
                WHEN TG_OP = 'UPDATE' THEN 'UPDATE'
                WHEN TG_OP = 'DELETE' THEN 'DELETE'
                END);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER audit_users_trigger
    AFTER INSERT OR UPDATE OR DELETE
    ON users
    FOR EACH ROW
EXECUTE FUNCTION audit_users_function();

