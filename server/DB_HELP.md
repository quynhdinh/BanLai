#### Xem các database đang có trong cluster
`show dbs`

#### Sử dụng 1 database
`use salenet_dev`

#### Xem các collection trong database này
`show collections`

#### Tạo một collection(tên collection trong MongoDB bắt buộc là lowercase và là số nhiều)
[link](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/)
#### Xem collection `cities`
`db.cities.find()`

#### Thêm 1 document vào cities
`db.cities.insertOne({
    name: "Thủ Đức"
})`

#### Xóa một document theo _id
`db.cities.deleteOne( {"_id": ObjectId("623be4d0d8cc84201538e030")});`

#### Thêm một document vào collection Districts, _id là PK và được tạo tự động
`db.districts.insertOne({
    name: "Quận 1",
    cityId: ObjectId("623be6ced8cc84201538e032")
})`

#### Thêm nhiều document vào collection
`db.districts.insertMany([
    {
        name: "Quận 2",
        cityId: ObjectId("623bec21d8cc84201538e051")
    },
    {
        name: "Quận 9",
        cityId: ObjectId("623bec21d8cc84201538e051")
    },
    {
        name: "Quận Thủ Đức",
        cityId: ObjectId("623bec21d8cc84201538e051")
    }
])`

#### Đổi tên collection
`db.City.renameCollection('cities')`
