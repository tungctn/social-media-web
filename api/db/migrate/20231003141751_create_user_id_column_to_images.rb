class CreateUserIdColumnToImages < ActiveRecord::Migration[7.0]
  def change
    add_reference :images, :user, index: true
  end
end
