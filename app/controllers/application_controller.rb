require 'sinatra'

class ApplicationController < Sinatra::Base
    set :default_content_type, 'application/json'

    get '/' do
        exercises = Exercise.all
        workouts = Workout.all
        reps_and_sets = RepAndSet.all

        {
            exercises: exercises,
            workouts: workouts,
            reps_and_sets: reps_and_sets
        }.to_json
    end

    get '/exercises' do
        exercises = Exercise.all
        exercises.to_json
    end

    get '/workouts' do
        workouts = Workout.all 
        workouts.to_json
    end

    get '/repsandsets' do 
        reps_and_sets = RepAndSet.all
        reps_and_sets.to_json
    end

    get '/exercises/:id' do
        exercise = Exercise.find(params[:id])
        exercise_with_reps_and_sets = exercise&& exercise.rep_and_set
        {
        exercise: exercise,
        reps: exercise_with_reps_and_sets.sets,
        sets: exercise_with_reps_and_sets.reps
        }.to_json
    end

    get '/workouts/:id' do
        workout = Workout.find(params[:id])
        workouts_and_exercises = Workout.find(params[:id]).exercises
        {
            workout: workout,
            exercises: workouts_and_exercises
        }.to_json

    end

    get '/repsandsets/:id' do
        rep_and_set = RepAndSet.find(params[:id])
        rep_and_set.to_json
    end

    get '/progress' do
        progress = Progress.all
        progress.to_json
    end

    date = Date.today
    formatted_date = date.strftime("%Y-%m-%d")

    post "/progress/#{formatted_date}" do
        rep_progress = {}
        params.each do |key,value|
            if key.start_with?("reps")
                rep_progress[key] = value
            end
        end

        weight_progress = {}
        params.each do |key,value|
            if key.start_with?("weights")
                weight_progress[key] = value
            end
        end

        date = Date.parse(params[:date])

        progress = Progress.create(
            date: date,
            name: params[:name],
            reps_sets_weights: {
                sets: params[:sets],
                reps: rep_progress,
                weights: weight_progress
            }
        )
    end


    post '/exercises' do
        exercise = Exercise.create(
            name: params[:name],
            muscle: params[:muscle],
            reps: params[:reps],
            sets: params[:sets],
            workout_id: params[:workout_id],
          
        )
        exercise.to_json
    end

    post '/workouts' do
        workout = Workout.create(
            name: params[:name],
            workout_id: params[:workout_id]
        )
        workout.to_json
    end

    post '/repsandsets' do
        rep_and_set = RepAndSet.create(
            reps: params[:reps],
            sets: params[:sets],
            rep_and_set_id: params[:rep_and_set_id]
        )
        rep_and_set.to_json
    end

    patch '/exercises/:id' do
        exercise = Exercise.find(params[:id])
        exercise.update(params)
        exercise.to_json
    end

    patch '/workouts/:id' do
        workout = Workout.find(params[:id])
        workout.update(
            name: params[:name]
        )
    end 

    patch '/repsandsets/:id' do
        rep_and_set = RepAndSet.find(params[:id])
        rep_and_set.update(params)
        rep_and_set.to_json
    end

    delete '/exercises/:id' do
        exercise = Exercise.find(params[:id])
        exercise.destroy
        exercise.to_json
    end

    delete '/workouts/:id' do
        workout = Workout.find(params[:id])
        workout.destroy
        workout.to_json
    end

    delete '/repsandsets/:id' do
        rep_and_set = RepAndSet.find(params[:id])
        rep_and_set.destroy
        rep_and_set.to_json
    end


end