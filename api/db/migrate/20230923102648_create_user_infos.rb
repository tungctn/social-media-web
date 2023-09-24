class CreateUserInfos < ActiveRecord::Migration[7.0]
  def change
    create_table :user_infos do |t|
      t.references :user, foreign_key: true
      t.string :first_name, comment: "Họ"
      t.string :last_name, comment: "Tên"
      t.string :full_name, comment: "Tên ghép từ Họ và Tên"
      t.string :email, comment: "Email hiển thị lên trang cá nhân"
      t.string :phone_number, comment: "Số điện thoại"
      t.date :date_of_birth, comment: "Ngày sinh"
      t.integer :gender, comment: "Giới tính", limit: 1
      t.string :avatar_url, comment: "Đường dẫn ảnh đại diện"
      t.string :background_url, comment: "Đường dẫn ảnh bìa"
      t.datetime :join_date, comment: "Ngày tham gia app"
      t.datetime :last_login, comment: "Thời gian lần đăng nhập cuối cùng"
      t.string :address, comment: "Địa chỉ"
      t.string :bio, comment: "Giới thiệu cá nhân ngắn gọn"
      t.integer :relationship_status, comment: "Tình trạng mối quan hệ: Độc thân, hẹn hò, ...", limit: 1
      t.timestamps
    end
  end
end
