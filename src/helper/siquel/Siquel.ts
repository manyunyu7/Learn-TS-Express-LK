
import { Sequelize, QueryTypes } from 'sequelize';

interface Join {
    type: 'INNER JOIN' | 'LEFT JOIN' | 'RIGHT JOIN' | 'FULL JOIN';
    table: string;
    on: string;
    alias?: string;
}

interface QueryOptions {
    select?: string[];
    where?: { condition: string, params: any[] }[];
    orderBy?: string[];
    insert?: { [key: string]: any };  // For INSERT queries
    joins?: Join[];
    update?: { [key: string]: any };  // Add this line
}

class Siquel {
    private options: QueryOptions = {};
    private sequelize: Sequelize;
    private tableName: string;
    private replacements: { [key: string]: any } = {};

    constructor(sequelize: Sequelize, tableName: string) {
        this.sequelize = sequelize;
        this.tableName = tableName;
    }

    select(fields: string[]): this {
        this.options.select = fields;
        return this;
    }

    insert(values: { [key: string]: any }): this {
        this.options.insert = values;
        return this;
    }


    update(fields: { [key: string]: any }): this {
        this.options.update = fields;
        return this;
    }

    where(condition: string, ...params: any[]): this {
        if (!this.options.where) {
            this.options.where = [];
        }
        this.options.where.push({ condition, params });
        params.forEach((param, index) => {
            this.replacements[`param${index}`] = param;
        });
        return this;
    }

    orderBy(field: string, direction: 'ASC' | 'DESC'): this {
        if (!this.options.orderBy) {
            this.options.orderBy = [];
        }
        this.options.orderBy.push(`${field} ${direction}`);
        return this;
    }

    leftJoin(table: string, on: string, alias?: string): this {
        return this.join(table, on, 'LEFT JOIN', alias);
    }

    rightJoin(table: string, on: string, alias?: string): this {
        return this.join(table, on, 'RIGHT JOIN', alias);
    }

    innerJoin(table: string, on: string, alias?: string): this {
        return this.join(table, on, 'INNER JOIN', alias);
    }

    fullJoin(table: string, on: string, alias?: string): this {
        return this.join(table, on, 'FULL JOIN', alias);
    }

    private join(table: string, on: string, type: 'INNER JOIN' | 'LEFT JOIN' | 'RIGHT JOIN' | 'FULL JOIN', alias?: string): this {
        if (!this.options.joins) {
            this.options.joins = [];
        }
        this.options.joins.push({ type, table, on, alias });
        return this;
    }

    count(field = '*'): this {
        this.options.select = [`COUNT(${field}) AS count`];
        return this;
    }

    sum(field: string): this {
        this.options.select = [`SUM(${field}) AS sum`];
        return this;
    }

    avg(field: string): this {
        this.options.select = [`AVG(${field}) AS avg`];
        return this;
    }

    min(field: string): this {
        this.options.select = [`MIN(${field}) AS min`];
        return this;
    }

    max(field: string): this {
        this.options.select = [`MAX(${field}) AS max`];
        return this;
    }

    toSQL(): string {
        let sql: string;

        if (this.options.insert) {
            // Construct the insert statement
            const columns = Object.keys(this.options.insert);
            const values = columns.map((_, index) => `:param${index}`);
            columns.forEach((col, index) => {
                this.replacements[`param${index}`] = this.options.insert![col];
            });

            sql = `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (${values.join(', ')})`;
        } else if (this.options.update) {
            // Construct the update statement
            const setClause = Object.keys(this.options.update)
                .map((key, index) => {
                    this.replacements[`param${index}`] = this.options.update![key];
                    return `${key} = :param${index}`;
                })
                .join(', ');

            sql = `UPDATE ${this.tableName} SET ${setClause}`;
        } else {
            // Construct the select statement
            sql = 'SELECT ' + (this.options.select?.join(', ') || '*') + ' FROM ' + this.tableName;
        }

        if (this.options.joins) {
            for (const join of this.options.joins) {
                sql += ` ${join.type} ${join.table} ${join.alias ? `AS ${join.alias}` : ''} ON ${join.on}`;
            }
        }

        if (this.options.where) {
            sql += ' WHERE ' + this.options.where.map(w => w.condition).join(' AND ');
        }

        if (!this.options.update && !this.options.insert && this.options.orderBy) {
            sql += ' ORDER BY ' + this.options.orderBy.join(', ');
        }

        return sql;
    }

    async execute(): Promise<any[]> {
        const sql = this.toSQL();
        console.log('Generated SQL:', sql); // Log the generated SQL query
        const result = await this.sequelize.query(sql, {
            replacements: this.replacements,
            type: QueryTypes.SELECT
        });
        return result;
    }
}

export default Siquel;
