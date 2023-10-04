class PostComment < ApplicationRecord
  has_and_belongs_to_many :images
  belongs_to :post
end
