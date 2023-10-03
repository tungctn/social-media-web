Rails.application.routes.draw do
  
  # thêm prefix
  scope 'api' do
    post "/auth/login", to: "authentication#login"
    post "/auth/register", to: "users#register"
    
    #thông tin người dùng
    get "/users/:id", to: "users#info_index"
    get "/users", to: "users#info_current_user"
    put "/users", to: "users#info_update"
    delete "/users/avatar", to: "users#info_delete_avatar"

    #upload ảnh
    get "/images/:id", to: "images#show"
    post "/images", to: "images#create"
    delete "/images", to: "images#deletes"

    #bài viết
    get "/posts/:id", to: "posts#show"
    post "/posts", to: "posts#create"

  end
end
