# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    validates :username, :session_token, presence: true, uniqueness: true
    validates :password_digest, presence: true
    validates :password, allow_nil: true, length: {minimum: 6}
    attr_reader :password

    before_validation :ensure_session_token

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        return nil unless user
        user.is_password?(password) ? user : nil
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        self.session_token = SecureRandom.urlsafe_base64
        self.save
        self.session_token
    end

    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64
    end

    has_many :servers_owned,
        primary_key: :id,
        foreign_key: :owner_id,
        class_name: :Server

    has_many :user_servers,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :UserServer,
        dependent: :destroy

    has_many :servers,
        through: :user_servers,
        source: :server

    has_many :messages,
        as: :messageable

    def messages_with(user)
        user.messages.where(sender_id: self.id) + self.messages.where(sender_id: user.id)
    end
end
