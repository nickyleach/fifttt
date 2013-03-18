class ServicesController < ApplicationController
	before_filter :check_auth

	def index
	end

	def post
		current_user.tweet(params[:content])
		redirect_to services_path
	end
end
