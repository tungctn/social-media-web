require_relative "../constants/regex.rb"

class UserInfo < ApplicationRecord
  before_save :before_save

  validates :first_name, :last_name, :full_name,
            length: {maximum: Settings.digit.length_255}
      
  validates :email,
            allow_nil: true,
            length: {maximum: Settings.digit.length_255},
            format: {with: EMAIL_REGEX}

  validates :phone_number, :address, :bio,
            length: {maximum: Settings.digit.length_255}

  validates :gender, :relationship_status,
            length: {maximum: Settings.digit.length_1}

  validate :date_must_be_valid

  #thêm các phụ thuộc
  belongs_to :user
  has_one_attached :avatar
  has_one_attached :background

  private
  def before_save
    if email
      email.downcase!
    end
  end

  def date_must_be_valid
    if date_of_birth.present? && date_of_birth > Date.today
      errors.add(:date_of_birth, "không được lớn hơn hiện tại.")
    end
  end
end