class Post < ApplicationRecord
  has_many_attached :images
  has_many :post_comments
  has_many :tags
end
