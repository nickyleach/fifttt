module ApplicationHelper
	def auth_path(provider)
		"/auth/#{provider.to_s}"
	end
end
