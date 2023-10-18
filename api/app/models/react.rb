class React < ApplicationRecord
  has_many :reacts_post, dependent: :destroy
  has_many :posts, through: :reacts_post

  has_many :reacts_post_comments, dependent: :destroy
  has_many :post_comments, through: :reacts_post_comments
end
