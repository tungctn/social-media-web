class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  before_save :downcase_email

  validates :name,
            presence: true,
            length: {maximum: Settings.digit.length_50}

  validates :email,
            presence: true,
            length: {maximum: Settings.digit.length_255},
            format: {with: VALID_EMAIL_REGEX},
            uniqueness: {case_sensitive: false}

  validates :password,
            presence: true,
            length: {minimum: Settings.digit.length_8},
            allow_nil: true

  has_secure_password

  private

  def downcase_email
    email.downcase!
  end
end
