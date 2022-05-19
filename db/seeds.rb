# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

UserServer.destroy_all
ActiveRecord::Base.connection.reset_pk_sequence!('user_servers')

Server.destroy_all
ActiveRecord::Base.connection.reset_pk_sequence!('servers')

User.destroy_all
ActiveRecord::Base.connection.reset_pk_sequence!('users')

demo = User.create(username: "demo-user", password: "demo-password")
a = User.create(username: "a", password: "aaaaaa")

ds = Server.create(name: "demo's server", owner_id: demo.id)
UserServer.create(server_id: ds.id, user_id: demo.id)

as = Server.create(name: "a's server", owner_id: a.id)
UserServer.create(server_id: as.id, user_id: a.id)
UserServer.create(server_id: as.id, user_id: demo.id)