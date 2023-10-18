class ReactsPostComment < ApplicationRecord
  belongs_to :post_comment
  belongs_to :react
  belongs_to :user
end