exports.up = async function (knex) {
  await knex.schema.createTable("authors", function (table) {
    table.increments("id").primary();
    table.uuid("author_id").defaultTo(knex.raw("(UUID())"));
    table.string("author_name").notNullable();
    table.string("author_bio").notNullable();
    table.string("profile_image_url");
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("authors");
};
