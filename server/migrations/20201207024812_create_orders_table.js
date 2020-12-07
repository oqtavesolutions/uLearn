exports.up = async function (knex) {
  await knex.schema.createTable("orders", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.decimal("order_amount").defaultTo(0.0);
    table.uuid("course_id").notNullable().references("id").inTable("courses");
    table.uuid("user_id").notNullable().references("id").inTable("users");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("orders");
};
