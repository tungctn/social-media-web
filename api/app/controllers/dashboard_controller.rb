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

  end
  
  def statistics_post_label

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
      data_return["query_time"] = "created_at >= '#{Date.today.beginning_of_day}' AND created_at <= '#{Date.today.end_of_day}'"
    when Enums::TIME_STATISTICS[:yesterday]
      data_return["start_date"] = Date.yesterday
      data_return["end_date"] = Date.yesterday
      data_return["query_time"] = "created_at >= '#{Date.yesterday.beginning_of_day}' AND created_at <= '#{Date.yesterday.end_of_day}'"
    when Enums::TIME_STATISTICS[:this_month]
      data_return["start_date"] = Date.today.beginning_of_month
      data_return["end_date"] = Date.today.end_of_month
      data_return["query_time"] = "created_at >= '#{Date.today.beginning_of_month.beginning_of_day}' AND created_at <= '#{Date.today.end_of_month.end_of_day}'"
    when Enums::TIME_STATISTICS[:last_month]
      data_return["start_date"] = Date.today.prev_month.beginning_of_month
      data_return["end_date"] = Date.today.prev_month.end_of_month
      data_return["query_time"] = "created_at >= '#{Date.today.prev_month.beginning_of_month.beginning_of_day}' AND created_at <= '#{Date.today.prev_month.end_of_month.end_of_day}'"
    when Enums::TIME_STATISTICS[:this_year]
      data_return["start_date"] = Date.today.beginning_of_year
      data_return["end_date"] = Date.today.end_of_year
      data_return["query_time"] = "created_at >= '#{Date.today.beginning_of_year.beginning_of_day}' AND created_at <= '#{Date.today.end_of_year.end_of_day}'"
    when Enums::TIME_STATISTICS[:last_year]
      data_return["start_date"] = Date.today.prev_year.beginning_of_year
      data_return["end_date"] = Date.today.prev_year.end_of_year
      data_return["query_time"] = "created_at >= '#{Date.today.prev_year.beginning_of_year.beginning_of_day}' AND created_at <= '#{Date.today.prev_year.end_of_year.end_of_day}'"
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