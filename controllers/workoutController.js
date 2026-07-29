import Workout from "../models/Workout.js";

// Create Workout
export const createWorkout = async (req, res) => {
  try {
    const { exercise, sets, reps, weight, duration, notes } = req.body;

    const workout = await Workout.create({
      user: req.user.id,
      exercise,
      sets,
      reps,
      weight,
      duration,
      notes,
    });

    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Workouts for Logged-in User
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(workouts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Workout
export const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    Object.assign(workout, req.body);

    await workout.save();

    res.json(workout);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Workout
export const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    await workout.deleteOne();

    res.json({
      message: "Workout deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};