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
end
