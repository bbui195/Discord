Rails.application.routes.draw do
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    root to: "static_pages#root"

    namespace 'api', defaults: { format: :json } do
        resources :users, only: [:index, :create]
        resources :servers, only: [:index, :show, :create, :update, :destroy]
        post "/servers/join/:id", to: "servers#join"
        delete "/servers/leave/:id", to: "servers#leave"
        get "/servers/browse/all", to: "servers#browse"
        resources :channels, only: [:create, :show, :update, :destroy]
        resources :messages, only: [:show, :create, :update, :destroy]
        resource :session, only: [:create, :destroy]
    end

    mount ActionCable.server => '/cable'
end
