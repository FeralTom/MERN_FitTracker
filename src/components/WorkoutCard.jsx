function WorkoutCard({ workout }) {
  return (
    <div className="workout-card">
      <h3>{workout.exercise}</h3>

      <p><strong>Sets:</strong> {workout.sets}</p>

      <p><strong>Reps:</strong> {workout.reps}</p>

      <p><strong>Weight:</strong> {workout.weight} lbs</p>

      <p><strong>Duration:</strong> {workout.duration} min</p>

      <p><strong>Notes:</strong> {workout.notes}</p>

      <button>Edit</button>

      <button>Delete</button>
    </div>
  );
}

export default WorkoutCard;