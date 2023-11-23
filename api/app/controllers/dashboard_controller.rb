require_relative "../enum/enum.rb"

class DashboardController < AdminsController
  def statistics_login_history
    data_query = data_build_query_time_statistics(params[:time_statistics])

    if !data_query["query_time"]
      render json: { errors: "Truy vấn truyền vào không đúng." }, status: :bad_request
      return
    end

    data_result = nil

    
    if params[:time_statistics].to_i == Enums::TIME_STATISTICS[:today] || params[:time_statistics].to_i == Enums::TIME_STATISTICS[:yesterday] || params[:time_statistics].to_i == Enums::TIME_STATISTICS[:this_month] || params[:time_statistics].to_i == Enums::TIME_STATISTICS[:last_month]
      all_dates = generate_dates_range(data_query["start_date"], data_query["end_date"])
      # Thực hiện truy vấn
      data = LoginHistory.where(data_query["query_time"]).group("DATE(created_at)").count

        # Điền giá trị 0 cho những ngày không có bản ghi
        data_result = all_dates.map { |date| [date, data[date] || 0] }.to_h
      else
        all_months = generate_months_range(data_query["start_date"], data_query["end_date"])
        
        # Thực hiện truy vấn
        data = LoginHistory .where(data_query["query_time"]).group("MONTH(created_at)").count
        
      # Điền giá trị 0 cho những ngày không có bản ghi
      data_result = all_months.map { |month| [month, data[month] || 0] }.to_h
    end

    render json: { data: data_result, data_query: data_query }, status: :ok
  end
  
  def statistics_number
    today_create_query = data_build_query_time_statistics(Enums::TIME_STATISTICS[:today])
    report_query = "time_report >= '#{Date.today.beginning_of_day - 7.hours}' AND time_report <= '#{Date.today.end_of_day - 7.hours}'"
    online_query = "last_time_active >= '#{Time.current - 6.minutes}'"
    
    data_result = {
      online: 0,
      user: 0,
      post: 0,
      report: 0
    }

    data_result["online"] = User.where(online_query).count
    data_result["user"] = User.all.count
    data_result["post"] = Post.where(today_create_query["query_time"]).count
    data_result["report"] = PostComment.where(report_query).count + Post.where(report_query).count
    render json: { data: data_result }, status: :ok
  end
  
  def statistics_post_label
    total_post = {
      "total": 0,
      "education": 0,
      "share_experience": 0,
      "evaluate": 0,
      "event": 0,
      "other": 0
    }
    error_post = {
      "total": 0,
      "education": 0,
      "share_experience": 0,
      "evaluate": 0,
      "event": 0,
      "other": 0
    }

    #total post
    total_post["total"] = Post.all.count ||= 0
    total_post["education"] = Post.where("label = #{Enums::LABEL_TYPE[:education]}").group("label").count.values[0] ||= 0
    total_post["share_experience"] = Post.where("label = #{Enums::LABEL_TYPE[:share_experience]}").group("label").count.values[0] ||= 0
    total_post["evaluate"] = Post.where("label = #{Enums::LABEL_TYPE[:evaluate]}").group("label").count.values[0] ||= 0
    total_post["event"] = Post.where("label = #{Enums::LABEL_TYPE[:event]}").group("label").count.values[0] ||= 0
    total_post["other"] = Post.where("label = #{Enums::LABEL_TYPE[:other]}").group("label").count.values[0] ||= 0

    #error post
    error_post["total"] = Post.where("status = #{Enums::ACTIVE_STATUS[:ban]}").count ||= 0
    error_post["education"] = Post.where("status = #{Enums::ACTIVE_STATUS[:ban]} AND label = #{Enums::LABEL_TYPE[:education]}").group("label").count.values[0] ||= 0
    error_post["share_experience"] = Post.where("status = #{Enums::ACTIVE_STATUS[:ban]} AND label = #{Enums::LABEL_TYPE[:share_experience]}").group("label").count.values[0] ||= 0 
    error_post["evaluate"] = Post.where("status = #{Enums::ACTIVE_STATUS[:ban]} AND label = #{Enums::LABEL_TYPE[:evaluate]}").group("label").count.values[0] ||= 0
    error_post["event"] = Post.where("status = #{Enums::ACTIVE_STATUS[:ban]} AND label = #{Enums::LABEL_TYPE[:event]}").group("label").count.values[0] ||= 0
    error_post["other"] = Post.where("status = #{Enums::ACTIVE_STATUS[:ban]} AND label = #{Enums::LABEL_TYPE[:other]}").group("label").count.values[0] ||= 0

    render json: { total_post: total_post, error_post: error_post }, status: :ok
  end
  
  def statistics_post_negative

  end
  
  def statistics_post_count

  end

  private
  def data_build_query_time_statistics(time_statistics_param)
    data_return = {
      start_date: nil,
      end_date: nil,
      query_time: nil
    }

    case time_statistics_param.to_i
    when Enums::TIME_STATISTICS[:today]
      data_return["start_date"] = Date.today
      data_return["end_date"] = Date.today
      data_return["query_time"] = "created_at >= '#{Date.today.beginning_of_day - 7.hours}' AND created_at <= '#{Date.today.end_of_day - 7.hours}'"
    when Enums::TIME_STATISTICS[:yesterday]
      data_return["start_date"] = Date.yesterday
      data_return["end_date"] = Date.yesterday
      data_return["query_time"] = "created_at >= '#{Date.yesterday.beginning_of_day - 7.hours}' AND created_at <= '#{Date.yesterday.end_of_day - 7.hours}'"
    when Enums::TIME_STATISTICS[:this_month]
      data_return["start_date"] = Date.today.beginning_of_month
      data_return["end_date"] = Date.today.end_of_month
      data_return["query_time"] = "created_at >= '#{Date.today.beginning_of_month.beginning_of_day - 7.hours}' AND created_at <= '#{Date.today.end_of_month.end_of_day - 7.hours}'"
    when Enums::TIME_STATISTICS[:last_month]
      data_return["start_date"] = Date.today.prev_month.beginning_of_month
      data_return["end_date"] = Date.today.prev_month.end_of_month
      data_return["query_time"] = "created_at >= '#{Date.today.prev_month.beginning_of_month.beginning_of_day - 7.hours}' AND created_at <= '#{Date.today.prev_month.end_of_month.end_of_day - 7.hours}'"
    when Enums::TIME_STATISTICS[:this_year]
      data_return["start_date"] = Date.today.beginning_of_year
      data_return["end_date"] = Date.today.end_of_year
      data_return["query_time"] = "created_at >= '#{Date.today.beginning_of_year.beginning_of_day - 7.hours}' AND created_at <= '#{Date.today.end_of_year.end_of_day - 7.hours}'"
    when Enums::TIME_STATISTICS[:last_year]
      data_return["start_date"] = Date.today.prev_year.beginning_of_year
      data_return["end_date"] = Date.today.prev_year.end_of_year
      data_return["query_time"] = "created_at >= '#{Date.today.prev_year.beginning_of_year.beginning_of_day - 7.hours}' AND created_at <= '#{Date.today.prev_year.end_of_year.end_of_day - 7.hours}'"
    end

    return data_return
  end
  
  # Hàm để lấy tất cả ngày trong khoảng thời gian
  def generate_dates_range(start_date, end_date)
    (start_date..end_date).to_a
  end

  # Hàm để lấy tất cả tháng trong khoảng thời gian
  def generate_months_range(start_date, end_date)
    start_month = start_date.beginning_of_month
    end_month = end_date.beginning_of_month

    months_range = [start_month.month]
    current_month = start_month

    while current_month < end_month
      current_month = current_month.next_month
      months_range << current_month.month
    end

    months_range
  end
end