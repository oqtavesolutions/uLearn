exports.up = async function (knex) {
  await knex.schema.createTable("orders", function (table) {
    table.increments("id").primary();
    table.uuid("order_id").defaultTo(knex.raw("(UUID())"));
    table.decimal("order_amount").defaultTo(0.0);

    table
      .integer("course_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("courses");

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
  await knex.schema.dropTableIfExists("orders");
};
