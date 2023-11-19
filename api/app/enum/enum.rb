module Enums
  USER_ROLE = {
    admin: 1, # admin
    user: 2 # người dùng
  }.freeze

  TYPE_REACT = {
    like: 1,
    love: 2,
    wow: 3,
    haha: 4,
    sad: 5,
    angry: 6
  }.freeze

  GENDER = {
    male: 0,
    female: 1,
    other: 2 # khác
  }.freeze

  RELATIONSHIP_STATUS = {
    single: 1,
    marry: 2,
    dating: 3
  }.freeze

  FRIEND_STATUS = {
    pending: 1, # đang chờ chấp nhận
    accept: 2, # đã là bạn bè
    block: 3 # đã block
  }.freeze

  FRIEND_TYPE = {
    none: 1, # chưa kết bạn
    normal: 2, # bạn bè bình thường
    dating: 3 # hẹn hò
  }.freeze

  # Trạng thái hoạt động của bài viết, comment
  ACTIVE_STATUS = {
    active: 1, #hoạt động
    pending: 2, #bị báo cáo và đang chờ duyệt
    ban: 3 #bị báo cáo và bị chặn
  }

  # loại lỗi của bài viết, comment
  ERROR_TYPE = {
    images_not_standards: 1, #Ảnh không phù hợp tiêu chuẩn
    images_not_related: 2, #Ảnh không liên quan đến động vật
    caption_not_standards: 3, #Caption không phù hợp tiêu chuẩn
    caption_not_related: 4 #Caption không liên quan đến động vật
  }

  # label của bài viết, comment
  LABEL_TYPE = {
    education: 1, #giáo dục
    share_experience: 2, #chia sẻ kinh nghiệm
    evaluate: 3, #đánh giá
    event: 4, #sự kiện
    other: 5 #khác
  }

  #Thời gian để thống kê
  TIME_STATISTICS = {
    today: 1,
    yesterday: 2,
    this_month: 3,
    last_month: 4,
    this_year: 5,
    last_year: 6
  }

  #loại báo cáo của người dùng
  TYPE_REPORT = {
    content: 1,
    image: 2
  }
end
