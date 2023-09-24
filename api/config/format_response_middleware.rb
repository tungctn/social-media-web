#format kết quả trả về cho client
#created by: ttanh (24/09/2023)
class FormatResponseMiddleware
  def initialize(app)
    @app = app
  end

  def call(env)
    # Xử lý yêu cầu trước khi nó được gửi đến ứng dụng Rails
    status, headers, response = @app.call(env)

    # Xử lý yêu cầu sau khi nó được xử lý bởi ứng dụng Rails
    # Bọc phản hồi trong một cấu trúc JSON theo định dạng
    data = {
      success: (status >= 200 && status < 400),
      message: Rack::Utils::HTTP_STATUS_CODES[status],
      data: JSON.parse(response.body)
    }

    # Chuyển đổi phản hồi sang JSON
    json_response = JSON.generate(data)

    # Cập nhật tiêu đề và nội dung phản hồi
    headers["Content-Length"] = json_response.bytesize.to_s
    headers["Content-Type"] = "application/json; charset=utf-8"

    [status, headers, [json_response]]

  rescue StandardError => e
    # Xử lý lỗi nếu có
    error_data = {
      success: false,
      message: "Lỗi server, vui lòng thử lại sau",
      data: nil
    }
    error_response = JSON.generate(error_data)
    headers["Content-Length"] = error_response.bytesize.to_s
    headers["Content-Type"] = "application/json; charset=utf-8"
    [500, headers, [error_response]]
  end
end