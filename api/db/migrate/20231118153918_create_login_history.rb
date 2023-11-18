class CreateLoginHistory < ActiveRecord::Migration[7.0]
  def change
    create_table :login_histories do |t|
      t.references :user, foreign_key: true
      t.text :ip_address, comment: "Ip của client đăng nhập.", :default => nil
      t.timestamps
    end
  end
end
