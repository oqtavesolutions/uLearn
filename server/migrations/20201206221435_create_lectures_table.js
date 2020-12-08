exports.up = async function (knex) {
  await knex.schema.createTable("lectures", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.string("lecture_title").notNullable();
    table.string("lecture_description", 1000).notNullable();
    table.string("lecture_slug").notNullable();
    table.string("lecture_attachment");
    table
      .uuid("course_id")
      .notNullable()
      .references("id")
      .inTable("courses")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("lectures");
};
