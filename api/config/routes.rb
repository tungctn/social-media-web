Rails.application.routes.draw do
  post "/auth/login", to: "authentication#login"

  # thêm prefix
  scope 'api' do
    resources :users
  
    #thông tin người dùng
    get "/users/info", to: "users#info_index"
    post "/users/info", to: "users#info_create"
    put "/users/info", to: "users#info_update"
    delete "/users/info/avatar", to: "users#info_delete_avatar"
    delete "/users/info/background", to: "users#info_delete_background"
  end
end
