exports.up = async function (knex) {
  await knex.schema.alterTable("authors", function (table) {
    table.string("author_slug").notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("authors", function (table) {
    table.dropColumns("author_slug");
  });
};
