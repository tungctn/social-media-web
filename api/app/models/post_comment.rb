class PostComment < ApplicationRecord
  has_and_belongs_to_many :images

  has_many :reacts_post_comment, dependent: :destroy
  has_many :reacts, through: :reacts_post_comments

  belongs_to :post

  validates :user_id,
            presence: true

  validates :post_id,
            presence: true
end
