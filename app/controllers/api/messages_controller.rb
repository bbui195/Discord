class Api::MessagesController < ApplicationController
    
    def show
        other_user = User.find_by(id: params[:id])
        @messages = current_user.messages_with(other_user)
        render :show
    end

    def broadcast(body)
        type = @message.messageable_type
        model = type.constantize
        @messageable = model.find_by(id: @message.messageable_id)
        message = {
            id: @message.id,
            body: body,
            senderId: @message.sender_id,
            type: @message.messageable_type,
            typeId: @message.messageable_id,
            time: @message.created_at
        }
        #broadcast message to messageable and sender
        ((type + "sChannel").constantize).broadcast_to(@messageable, message)
        UsersChannel.broadcast_to(current_user, message)
    end

    def create
        @message = Message.new(message_params)
        @message.sender_id = current_user.id
        if @message.save
            broadcast(@message.body)
            render json: {}
        else
            render json: @message.errors.full_messages, status: 422
        end
    end

    def update
        @message = Message.find_by(id: params[:id])
        if @message && @message.sender_id == current_user.id \
            && @message.update(body: message_params[:body])
            broadcast(@message.body)
            render json: {}
        else
            render json: "Error updating message", status: 403
        end
    end

    def destroy
        @message = Message.find_by(id: params[:id])
        if @message && (@message.sender_id == current_user.id \
            || @message.moderator_id == current_user.id) && @message.destroy
            #broadcast message deletion
            broadcast("")
            render json: {}
        else
            render json: "Error deleting message", status: 422
        end
    end

    private
    def message_params
        params.require(:message).permit(:body, :messageable_id, :messageable_type)
    end
end
