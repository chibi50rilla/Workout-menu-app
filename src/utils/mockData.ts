type RecordEntry = {
  date: string;
  muscleGroup: string;
  exercise: string;
  weight: number;
  reps: number;
  sets: number;
};

  export const generateMockHistory = (): RecordEntry[] => {
  const muscleGroups = ['Arms', 'Chest', 'Back', 'Legs', 'Shoulders'];
  const exerciseList = {
    Arms: ['Bicep Curl', 'Tricep Extension'],
    Chest: ['Bench Press', 'Chest Fly'],
    Back: ['Pull Up', 'Deadlift'],
    Legs: ['Squat', 'Lunge'],
    Shoulders: ['Shoulder Press', 'Lateral Raise'],
  };

  const history: RecordEntry[] = [];
  const startDate = new Date('2025-07-25');
  const endDate = new Date('2025-08-25');
  const days = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, '/');

    const entryCount = Math.floor(Math.random() * 3) + 1;

    for (let j = 0; j < entryCount; j++) {
      const group = muscleGroups[Math.floor(Math.random() * muscleGroups.length)] as keyof typeof exerciseList;
      const exercise = exerciseList[group][Math.floor(Math.random() * exerciseList[group].length)];

      history.push({
        date: formattedDate,
        muscleGroup: group,
        exercise,
        weight: 40 + Math.floor(Math.random() * 40),
        reps: 8 + Math.floor(Math.random() * 5),
        sets: 2 + Math.floor(Math.random() * 3),
      });
    }
  }

  return history;
};
