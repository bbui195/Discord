# == Schema Information
#
# Table name: messages
#
#  id               :bigint           not null, primary key
#  body             :text             not null
#  messageable_id   :integer          not null
#  messageable_type :string           not null
#  sender_id        :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Message < ApplicationRecord
    validates :body, :messageable_id, :messageable_type, :sender_id, null: false
    validates :messageable_type, inclusion: { in: ["Channel", "User"] }

    belongs_to :sender,
        primary_key: :id,
        foreign_key: :sender_id,
        class_name: :User

    belongs_to :messageable,
        polymorphic: true
    
end
