class Api::MessagesController < ApplicationController
    
    def show
        other_user = User.find_by(id: params[:id])
        @messages = current_user.messages_with(other_user)
        render :show
    end

    def broadcast(empty)
        type = @message.messageable_type
        model = type.constantize
        @messageable = model.find_by(id: @message.messageable_id)
        message = {
            id: @message.id,
            body: empty || @message.body,
            sender_id: @message.sender_id,
            messageable_type: @message.messageable_type,
            messageable_id: @message.messageable_id
        }
        #broadcast message to messageable and sender
        ((type + "sChannel").constantize).broadcast_to(@messageable, message)
        UsersChannel.broadcast_to(current_user, message)
    end

    def create
        @message = Message.new(message_params)
        @message.sender_id = current_user.id
        if @message.save
            broadcast
        else
            render json: @message.errors.full_messages, status: 422
        end
    end

    def update
        @message = Message.find_by(id: params[:id])
        if @message && @message.sender_id == current_user.id
            && @message.update(body: message_params[:body])
            broadcast
        else
            render json: "Error updating message", status: 403
        end
    end

    def destroy
        @message = Message.find_by(id: params[:id])
        if @message && @message.sender_id == current_user.id && @message.destroy
            #broadcast message deletion
            broadcast("")
        else
            render json: "Error deleting message", status: 422
        end
    end

    private
    def message_params
        params.require(:message).permit(:body, :messageable_id, :messageable_type)
    end
end
