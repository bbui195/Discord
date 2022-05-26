json.partial! "api/channels/channel", channel: @channel
json.messages do
    @channel.messages.each do |message|
        json.set! message.id do
            json.extract! message, :id, :body
            json.senderId message.sender_id
            json.type message.messageable_type
            json.typeId message.messageable_id
            json.time message.created_at
        end
    end
end
json.users do
    @channel.users.each do |user|
        json.set! user.id do
            json.partial! "api/users/user", user: user
        end
    end
end