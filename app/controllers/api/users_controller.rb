class Api::UsersController < ApplicationController
    def index
        # @users = User.where.not(id: current_user.id)
        @users = User.all
        render :index
    end

    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            render :show
        else
            errors = {}
            @user.errors.full_messages.each do |msg|
                if msg.include?("Username") && msg.include?("taken")
                    errors[:username] = "taken"
                elsif msg.include?("Password") && msg.include?("short")
                    errors[:password] = "short"
                end
            end
            render json: errors, status: 401
        end
    end

    private
    def user_params
        params.require(:user).permit(:username, :password)
    end
end
