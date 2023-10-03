class Post < ApplicationRecord
  has_and_belongs_to_many :images
  has_many :post_comments
  has_many :tags

  validates :content,
            presence: true

  validates :user_id,
            presence: true
end
