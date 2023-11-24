require_relative "../enum/enum.rb"

class DashboardController < AdminsController
  def statistics_login_history
    data_query = data_build_query_time_statistics(params[:time_statistics])

    if !data_query["query_time"]
      render json: { errors: "Truy vấn truyền vào không đúng." }, status: :bad_request
      return
    end

    data_result = nil
    
    if params[:time_statistics].to_i == Enums::TIME_STATISTICS[:this_month] || params[:time_statistics].to_i == Enums::TIME_STATISTICS[:last_month]
      all_dates = generate_dates_range(data_query["start_date"], data_query["end_date"])
      # Thực hiện truy vấn
      data = LoginHistory.where(data_query["query_time"]).group("DATE(created_at)").count

        # Điền giá trị 0 cho những ngày không có bản ghi
        data_result = all_dates.map { |date| [date, data[date] || 0] }.to_h
      
      elsif params[:time_statistics].to_i == Enums::TIME_STATISTICS[:today] || params[:time_statistics].to_i == Enums::TIME_STATISTICS[:yesterday]
        data = LoginHistory.where(data_query["query_time"])
        data_result = count_by_hours(data, "created_at")

      else
        all_months = generate_months_range(data_query["start_date"], data_query["end_date"])
        
        # Thực hiện truy vấn
        data = LoginHistory.where(data_query["query_time"]).group("MONTH(created_at)").count
        
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
    data_query = data_build_query_time_statistics(params[:time_statistics])

    if !data_query["query_time"]
      render json: { errors: "Truy vấn truyền vào không đúng." }, status: :bad_request
      return
    end

    posts = nil

    if !params[:page_index] || !params[:page_size]
      posts = Post.where(data_query["query_time"]).order(created_at: :desc)
    else
      skip = params[:page_size].to_i * (params[:page_index].to_i - 1)
      posts = Post.limit(params[:page_size].to_i).offset(skip).where(data_query["query_time"]).order(created_at: :desc)
    end

    posts_data = image_get(posts)

    posts_data.each_with_index do |post_data, index|
      if posts[index].comments_count <= 0
        count_comment = posts[index].post_comments.size
        posts[index].comments_count = count_comment
        posts[index].save
        post_data["comments_count"] = count_comment
      end

      post_data["comments_negative_count"] = PostComment.where("post_id = #{posts[index].id} AND status = #{Enums::ACTIVE_STATUS[:ban]}").count

      post_data["user"] = UserInfo.select(:full_name, :avatar_url, :id).find_by(user_id: posts[index].user_id)

      if post_data["share_id"]
        post_data["share_post"] = get_post_data_by_id(post_data["share_id"])
      else
        post_data["share_post"] = nil
      end
    end

    render json: { data: posts_data, data_query: data_query }, status: :ok
  end
  
  def statistics_post_count
    data_query = data_build_query_time_statistics(params[:time_statistics])

    if !data_query["query_time"]
      render json: { errors: "Truy vấn truyền vào không đúng." }, status: :bad_request
      return
    end

    data_result = nil

    if params[:time_statistics].to_i == Enums::TIME_STATISTICS[:this_month] || params[:time_statistics].to_i == Enums::TIME_STATISTICS[:last_month]
      all_dates = generate_dates_range(data_query["start_date"], data_query["end_date"])
      # Thực hiện truy vấn
      data = Post.where(data_query["query_time"]).group("DATE(created_at)").count

        # Điền giá trị 0 cho những ngày không có bản ghi
        data_result = all_dates.map { |date| [date, data[date] || 0] }.to_h
      
      elsif params[:time_statistics].to_i == Enums::TIME_STATISTICS[:today] || params[:time_statistics].to_i == Enums::TIME_STATISTICS[:yesterday]
        data = Post.where(data_query["query_time"])
        data_result = count_by_hours(data, "created_at")

      else
        all_months = generate_months_range(data_query["start_date"], data_query["end_date"])
        
        # Thực hiện truy vấn
        data = Post.where(data_query["query_time"]).group("MONTH(created_at)").count
        
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
      data_return["start_date"] = Date.today - 1.day
      data_return["end_date"] = Date.today - 1.day
      data_return["query_time"] = "created_at >= '#{(Date.today - 1.day).beginning_of_day - 7.hours}' AND created_at <= '#{(Date.today - 1.day).end_of_day - 7.hours}'"
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

  def count_by_hours(datas, column)
    data_result = {
      "0-2": 0,
      "2-4": 0,
      "4-6": 0,
      "6-8": 0,
      "8-10": 0,
      "10-12": 0,
      "12-14": 0,
      "14-16": 0,
      "16-18": 0,
      "18-20": 0,
      "20-22": 0,
      "22-0": 0
    }

    datas.each do |data|
      data_time_zone = data[column] + 7.hours
      hour = data_time_zone.hour

      if hour >= 0 && hour < 2
        data_result[:"0-2"] = data_result[:"0-2"] + 1
      elsif hour >= 2 && hour < 4
        data_result[:"2-4"] = data_result[:"2-4"] + 1
      elsif hour >= 4 && hour < 6
        data_result[:"4-6"] = data_result[:"4-6"] + 1
      elsif hour >= 6 && hour < 8
        data_result[:"6-8"] = data_result[:"6-8"] + 1
      elsif hour >= 8 && hour < 10
        data_result[:"8-10"] = data_result[:"8-10"] + 1
      elsif hour >= 10 && hour < 12
        data_result[:"10-12"] = data_result[:"10-12"] + 1
      elsif hour >= 12 && hour < 14
        data_result[:"12-14"] = data_result[:"12-14"] + 1
      elsif hour >= 14 && hour < 16
        data_result[:"14-16"] = data_result[:"14-16"] + 1
      elsif hour >= 16 && hour < 18
        data_result[:"16-18"] = data_result[:"16-18"] + 1
      elsif hour >= 18 && hour < 20
        data_result[:"18-20"] = data_result[:"18-20"] + 1
      elsif hour >= 20 && hour < 22
        data_result[:"20-22"] = data_result[:"20-22"] + 1
      elsif hour >= 22
        data_result[:"22-0"] = data_result[:"22-0"] + 1
      end
    end

    data_result
  end
end