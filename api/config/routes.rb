Rails.application.routes.draw do

  # thêm prefix
  scope 'api' do
    post "/auth/login", to: "authentication#login"
    post "/auth/register", to: "users#register"

    #session
    post "/sessions/ping", to: "sessions#ping" #ping sau mỗi 5p để biết người dùng đang online
    post "/sessions/end", to: "sessions#end" #người dùng đóng trình duyệt

    #thông tin người dùng
    get "/users", to: "user_infos#index"
    get "/users/:id", to: "user_infos#show"
    put "/users", to: "user_infos#update"
    put "/users/password", to: "users#update_password"
    delete "/users/avatar", to: "user_infos#delete_avatar"

    #upload ảnh
    get "/images/:id", to: "images#show"
    post "/images", to: "images#create"
    delete "/images", to: "images#deletes"

    #bài viết
    #báo cáo bài viết
    post "/posts/report/:id", to: "posts#report"

    #lưu bài viết
    get "/posts/save", to: "post_saves#index"
    get "/posts/save/:id", to: "post_saves#check_save"
    post "/posts/save/:id", to: "post_saves#create"
    delete "/posts/save/:id", to: "post_saves#destroy"

    # tương tác chính
    get "/posts/user/:id", to: "posts#show_user_post"
    get "/posts/user", to: "posts#my_post"
    get "/posts/:id", to: "posts#show"
    get "/posts", to: "posts#index"
    post "/posts", to: "posts#create"
    put "/posts/:id", to: "posts#update"
    delete "/posts/:id", to: "posts#destroy"

    #comment
    post "/comments/report/:id", to: "post_comments#report"

    get "/comments/:post_id", to: "post_comments#show" #lấy comment cho 1 bài viết

    #biểu cảm với bình luận
    post "/comments/reacts", to: "reacts_post_comments#create"
    delete "/comments/unreact/:comment_id", to: "reacts_post_comments#destroy"

    #tạo bình luận
    post "/comments", to: "post_comments#create"
    put "/comments/:id", to: "post_comments#update"
    delete "/comments/:id", to: "post_comments#destroy"

    #react
    post "/posts/reacts", to: "reacts_posts#create"
    delete "/posts/unreact/:post_id", to: "reacts_posts#destroy"

    #Bạn bè
    get "/friends/request", to: "friends#get_request" # lấy ra tất cả danh sách lời mời kết bạn
    get "/friends/block", to: "friends#get_block" # lấy ra tất cả danh sách đã chặn
    get "/friends/:id", to: "friends#show" # lấy ra tất cả danh sách bạn bè của user_id = id
    get "/friends", to: "friends#index" # lấy ra tất cả danh sách bạn bè của bản thân
    post "/friends", to: "friends#create" # gửi lời mời kết bạn
    put "/friends", to: "friends#update"  # chấp nhận lời mời, block, chuyển loại bạn bè
    delete "/friends", to: "friends#destroy" # xóa lời mời kết bạn, xóa bạn bè

    #admin
    get "/admins/reports/posts", to: "admins#get_post_report" # lấy danh sách bài viết vi phạm
    post "/admins/reports/posts/:id", to: "admins#change_post_report" # chuyển trạng thái vi phạm

    get "/admins/reports/comments", to: "admins#get_comment_report" # chuyển trạng thái vi phạm
    post "/admins/reports/comments/:id", to: "admins#change_comment_report" # chuyển trạng thái vi phạm

    #dashboard
    post "/dashboard/login-history", to: "dashboard#statistics_login_history"
    post "/dashboard/number", to: "dashboard#statistics_number"
    post "/dashboard/post-label", to: "dashboard#statistics_post_label"
    post "/dashboard/post-negative", to: "dashboard#statistics_post_negative"
    post "/dashboard/post-count", to: "dashboard#statistics_post_count"
  end
end
