class React < ApplicationRecord
  has_many :reacts_post, dependent: :destroy
  has_many :posts, through: :reacts_post

  has_and_belongs_to_many :post_comments, join_table: :post_comments_reacts
end
