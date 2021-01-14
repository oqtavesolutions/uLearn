exports.up = async function (knex) {
  await knex.schema.createTable("lectures", function (table) {
    table.increments("id").primary();
    table.uuid("lecture_id").defaultTo(knex.raw("(UUID())"));
    table.string("lecture_title").notNullable();
    table.string("lecture_description", 1000);
    table.string("lecture_content", 1000);
    table.string("lecture_google_slide", 1000);
    table.string("lecture_video_embed", 1000);
    table.string("lecture_slug").notNullable();
    table.string("lecture_length").notNullable();
    table.enum("lecture_type", ["Text", "Video", "Slide"]).notNullable();
    table.string("lecture_attachment"); // will be changed to json later
    table
      .integer("course_id")
      .unsigned()
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
