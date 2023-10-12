class React < ApplicationRecord
  has_and_belongs_to_many :posts, join_table: :posts_reacts
  has_and_belongs_to_many :post_comments, join_table: :post_comments_reacts
end
