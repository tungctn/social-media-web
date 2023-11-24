class UserInfo < ApplicationRecord
  validates :first_name, :last_name, :full_name,
            length: {maximum: Settings.digit.length_255}

  validates :phone_number, :address, :bio,
            length: {maximum: Settings.digit.length_255}

  validates :gender, :relationship_status,
            length: {maximum: Settings.digit.length_1}

  validate :date_must_be_valid

  #thêm các phụ thuộc
  belongs_to :user
  has_one_attached :avatar

  def self.ransackable_attributes(auth_object = nil)
    
  end

  private
  def date_must_be_valid
    if date_of_birth.present? && date_of_birth > Date.today
      errors.add(:date_of_birth, "không được lớn hơn hiện tại.")
    end
  end
end