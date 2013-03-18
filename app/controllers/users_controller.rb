class UsersController < ApplicationController
	before_filter :check_auth

	def index
		@user = current_user
		@authorizations = @user.authorizations
	end
end
