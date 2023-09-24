# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_09_23_102648) do
  create_table "user_infos", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.string "first_name", comment: "Họ"
    t.string "last_name", comment: "Tên"
    t.string "full_name", comment: "Tên ghép từ Họ và Tên"
    t.string "email", comment: "Email hiển thị lên trang cá nhân"
    t.string "phone_number", comment: "Số điện thoại"
    t.date "date_of_birth", comment: "Ngày sinh"
    t.integer "gender", limit: 1, comment: "Giới tính"
    t.string "avatar_url", comment: "Đường dẫn ảnh đại diện"
    t.string "background_url", comment: "Đường dẫn ảnh bìa"
    t.datetime "join_date", comment: "Ngày tham gia app"
    t.datetime "last_login", comment: "Thời gian lần đăng nhập cuối cùng"
    t.string "address", comment: "Địa chỉ"
    t.string "bio", comment: "Giới thiệu cá nhân ngắn gọn"
    t.integer "relationship_status", limit: 1, comment: "Tình trạng mối quan hệ: Độc thân, hẹn hò, ..."
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_infos_on_user_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.integer "role"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "user_infos", "users"
end
