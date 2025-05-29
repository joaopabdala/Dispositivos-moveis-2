/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1515912424")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id = user_id.id",
    "updateRule": ""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1515912424")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.verified = true",
    "updateRule": null
  }, collection)

  return app.save(collection)
})
