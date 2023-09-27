Rails.application.routes.draw do
  post "/auth/login", to: "authentication#login"

  # thêm prefix
  scope 'api' do
    resources :users
  
    #thông tin người dùng
    get "/user_infos", to: "users#info_index"
    post "/user_infos", to: "users#info_create"
    put "/user_infos", to: "users#info_update"
    delete "/user_infos/avatar", to: "users#info_delete_avatar"
    delete "/user_infos/background", to: "users#info_delete_background"
  end
end
