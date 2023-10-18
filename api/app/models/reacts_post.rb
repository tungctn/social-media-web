class ReactsPost < ApplicationRecord
  belongs_to :post
  belongs_to :react
  belongs_to :user
end