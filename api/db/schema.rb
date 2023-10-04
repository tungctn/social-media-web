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

ActiveRecord::Schema[7.0].define(version: 2023_10_04_140404) do
  create_table "active_storage_attachments", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "images", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.text "url", size: :long, comment: "đường dẫn tới ảnh"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_images_on_user_id"
  end

  create_table "images_post_comments", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "post_comment_id"
    t.bigint "image_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["image_id"], name: "index_images_post_comments_on_image_id"
    t.index ["post_comment_id"], name: "index_images_post_comments_on_post_comment_id"
  end

  create_table "images_posts", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "post_id"
    t.bigint "image_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["image_id"], name: "index_images_posts_on_image_id"
    t.index ["post_id"], name: "index_images_posts_on_post_id"
  end

  create_table "post_comments", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "post_id"
    t.bigint "user_id"
    t.text "content", size: :long, comment: "Nội dung comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["post_id"], name: "index_post_comments_on_post_id"
    t.index ["user_id"], name: "index_post_comments_on_user_id"
  end

  create_table "post_tags", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "post_id"
    t.bigint "tag_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["post_id"], name: "index_post_tags_on_post_id"
    t.index ["tag_id"], name: "index_post_tags_on_tag_id"
  end

  create_table "posts", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", comment: "Bài viết được đặt trên Profile User này"
    t.bigint "sender_id", comment: "Bài viết được gửi từ ai, có thể là chính user_id"
    t.text "content", size: :long, comment: "Nội dung bài viết"
    t.integer "status", comment: "Trạng thái bài viết: Hoạt động, tạm khóa, ..."
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sender_id"], name: "index_posts_on_sender_id"
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "tags", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "text", comment: "Tên tag"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_infos", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.string "first_name", comment: "Họ"
    t.string "last_name", comment: "Tên"
    t.string "full_name", comment: "Tên ghép từ Họ và Tên"
    t.string "phone_number", comment: "Số điện thoại"
    t.date "date_of_birth", comment: "Ngày sinh"
    t.integer "gender", limit: 1, comment: "Giới tính"
    t.datetime "join_date", comment: "Ngày tham gia app"
    t.datetime "last_login", comment: "Thời gian lần đăng nhập cuối cùng"
    t.string "address", comment: "Địa chỉ"
    t.string "bio", comment: "Giới thiệu cá nhân ngắn gọn"
    t.integer "relationship_status", limit: 1, comment: "Tình trạng mối quan hệ: Độc thân, hẹn hò, ..."
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "avatar_url", size: :long
    t.index ["user_id"], name: "index_user_infos_on_user_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "email"
    t.integer "role"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "images_post_comments", "images"
  add_foreign_key "images_post_comments", "post_comments"
  add_foreign_key "images_posts", "images", on_delete: :cascade
  add_foreign_key "images_posts", "posts", on_delete: :cascade
  add_foreign_key "post_comments", "posts"
  add_foreign_key "post_comments", "users"
  add_foreign_key "post_tags", "posts"
  add_foreign_key "post_tags", "tags"
  add_foreign_key "posts", "users", column: "sender_id", on_delete: :cascade
  add_foreign_key "posts", "users", on_delete: :cascade
  add_foreign_key "user_infos", "users"
end
