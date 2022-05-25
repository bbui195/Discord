# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Message.destroy_all
ActiveRecord::Base.connection.reset_pk_sequence!('messages')

UserServer.destroy_all
ActiveRecord::Base.connection.reset_pk_sequence!('user_servers')

Channel.destroy_all
ActiveRecord::Base.connection.reset_pk_sequence!('channels')

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

as2 = Server.create(name: "a's 2server", owner_id: a.id)
UserServer.create(server_id: as2.id, user_id: a.id)

dsg = Channel.create(name: "general", server_id: ds.id)
dsg2 = Channel.create(name: "general2", server_id: ds.id)

asg = Channel.create(name: "ageneral", server_id: as.id)
as2g = Channel.create(name: "a2general", server_id: as2.id)

Message.create(body: "first message", messageable_id: a.id, messageable_type: "User", sender_id: demo.id)
Message.create(body: "second message", messageable_id: dsg.id, messageable_type: "Channel", sender_id: demo.id)
Message.create(body: "third message", messageable_id: dsg.id, messageable_type: "Channel", sender_id: demo.id)
Message.create(body: "fourth message", messageable_id: a.id, messageable_type: "User", sender_id: demo.id)
Message.create(body: "fifth message", messageable_id: a.id, messageable_type: "User", sender_id: demo.id)
Message.create(body: "sixth message", messageable_id: demo.id, messageable_type: "User", sender_id: a.id)
Message.create(body: "seventh message", messageable_id: demo.id, messageable_type: "User", sender_id: a.id)
#  id               :bigint           not null, primary key
#  body             :text             not null
#  messageable_id   :integer          not null
#  messageable_type :string           not null
#  sender_id        :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null