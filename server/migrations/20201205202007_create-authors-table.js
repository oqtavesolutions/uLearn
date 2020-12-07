exports.up = async function (knex) {
  await knex.schema.createTable("authors", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.string("author_name").notNullable();
    table.string("author_bio").notNullable();
    table.string("profile_image_url");
    table.uuid("user_id").notNullable().references("id").inTable("users");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("authors");
};
