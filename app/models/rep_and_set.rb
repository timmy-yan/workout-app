class RepAndSet < ActiveRecord::Base
  has_many :exercises
  has_many :workouts, through: :exercises
end
