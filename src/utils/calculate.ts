export const calculate1RM = (weight: number, reps: number): number => {
  if (weight <= 0 || reps <= 0) return 0;
  return Math.round(weight * (1 + reps / 30)); // Epley式
};
