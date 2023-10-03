class PostComment < ApplicationRecord
  has_many_attached :images
  belongs_to :post
end
