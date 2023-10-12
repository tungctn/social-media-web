class PostComment < ApplicationRecord
  has_and_belongs_to_many :images
  has_and_belongs_to_many :reacts, join_table: :post_comments_reacts
  belongs_to :post
end
