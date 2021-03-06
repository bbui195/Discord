# == Schema Information
#
# Table name: channels
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  server_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Channel < ApplicationRecord
    validates :server_id, :name, presence: true

    belongs_to :server,
        primary_key: :id,
        foreign_key: :server_id,
        class_name: :Server
    
    has_many :users,
        through: :server,
        source: :users

    has_many :messages,
        as: :messageable

    has_one :owner,
        through: :server,
        source: :owner
end
