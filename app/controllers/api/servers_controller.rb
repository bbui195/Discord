class Api::ServersController < ApplicationController
    def index
        @servers = current_user.servers
        render :index
    end

    def show
        @server = current_user.servers.where(id: params[:id]).first
        render :show
    end

    def create
        @server = Server.new(name: server_params[:name], owner_id: current_user.id)
        if @server.save 
            #make user join server
            join = UserServer.create(user_id: current_user.id, server_id: @server.id)
            render :show
        else
            render json: @server.errors.full_messages, status: 422
        end
    end

    def update
        @server = Server.find_by(id: params[:id])
        if @server.owner_id == current_user.id && @server.update(server_params)
            render :show
        else
            render "Error updating server", status: 422
        end
    end

    def destroy
        @server = Server.find_by(id: params[:id])
        if @server && @server.owner_id == current_user.id && @server.destroy
            render :show
        else
            render json: "Error deleting server", status: 401
        end
    end

    def join
        @server = Server.find_by(id: params[:id])
        if UserServer.create(user_id: current_user.id, server_id: @server.id)
            render :show
        else
            render json: "Error joining server", status: 422
        end
    end

    def leave
        user_server = UserServer.find_by(server_id: params[:id], user_id: current_user.id)
        if user_server && user_server.destroy
            render json: {msg: "left"}
        else
            render json: "Error leaving server", status: 401
        end
    end

    def browse
        servers_in = current_user.servers.pluck(:id)
        @servers = Server.where.not(id: servers_in)
        render :browse
    end

    private
    def server_params
        params.require(:server).permit(:name)
    end
end


# Server.left_outer_joins(:users).where("user_id IS NULL")
# Server.where.not(id: [User.first.servers.pluck(:id)])

# Server.where.not(id: User.first.servers.pluck(:id))