class PostsController < ApplicationController
  skip_before_action :authenticate_request, only: [:view, :show, :viewToday]


end
