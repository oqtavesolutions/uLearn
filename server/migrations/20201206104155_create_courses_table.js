exports.up = async function (knex) {
  await knex.schema.createTable("courses", function (table) {
    table.increments("id").primary();
    table.uuid("course_id").defaultTo(knex.raw("(UUID())"));
    table.string("course_title").notNullable();
    table.string("course_description", 1000).notNullable();
    table.string("course_slug").notNullable();
    table
      .enum("course_categories", [
        "IT & Software",
        "Business",
        "Finance & Accounting",
        "Productivity",
        "Design",
        "Marketing",
        "Health",
        "Music",
        "Others",
      ])
      .notNullable();
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
  await knex.schema.dropTableIfExists("courses");
};
