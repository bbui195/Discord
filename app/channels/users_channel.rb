class UsersChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    @user = User.find_by(id: params[:user_id])
    stream_for @user
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
