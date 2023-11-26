class Image < ApplicationRecord
  has_one_attached :image
  has_and_belongs_to_many :posts
  has_and_belongs_to_many :post_comments

  validates :image, presence: true
end
