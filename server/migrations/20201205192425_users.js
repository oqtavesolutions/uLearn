exports.up = async function (knex) {
  await knex.schema.createTable("users", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("users");
};
