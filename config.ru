require_relative './config/environment.rb'
# # require './app/controllers/application_controller.rb'

class App < ApplicationController
  
  # Parse JSON from the request body into the params hash
end
# Having Rack outside the class solves cors errors
use Rack::Cors do
    allow do
      origins '*'
      resource '*', headers: :any, methods: [:get, :post, :delete, :put, :patch, :options, :head]
    end
  end

use Rack::JSONBodyParser

run App