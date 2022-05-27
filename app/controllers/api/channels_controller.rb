class Api::ChannelsController < ApplicationController
    def show
        @channel = Channel.find_by(id: params[:id])
        if @channel && @channel.users.find_by(id: current_user.id)
            render :show
        else
            render json: "Error displaying server", status: 403
        end
    end

    def create
        @channel = Channel.new(channel_params)
        @channel.name = @channel.name.split.join("-")
        @server = Server.find_by(id: channel_params[:server_id])
        if @server && @server.owner_id == current_user.id && @channel.save
            render :show
        else
            render json: "Error creating channel", status: 403
        end
    end

    def update
        @channel = Channel.find_by(params[:id])
        if @channel && @channel.server.owner_id == current_user && @channel.update(name: channel_params[:name])
            render :show
        else
            render json: "Error updating channel", status: 403
        end
    end

    def destroy
        @channel = Channel.find_by(params[:id])
        if @channel && @channel.server.owner_id == current_user && @channel.destroy
            render json: {msg: "Destroyed"}
        else
            render json: "Error destroying server", status: 403
        end
    end

    private
    def channel_params
        params.require(:channel).permit(:name, :server_id)
    end

end
