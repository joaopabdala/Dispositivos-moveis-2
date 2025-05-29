/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1515912424")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "date3805952114",
    "max": "",
    "min": "",
    "name": "read_at",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1515912424")

  // remove field
  collection.fields.removeById("date3805952114")

  return app.save(collection)
})
