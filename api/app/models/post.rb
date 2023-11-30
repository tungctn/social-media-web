class Post < ApplicationRecord
  has_and_belongs_to_many :images

  has_many :reacts_post, dependent: :destroy
  has_many :reacts, through: :reacts_post

  has_many :post_comments
  has_many :tags

  belongs_to :user

  validates :user_id,
            presence: true
end
