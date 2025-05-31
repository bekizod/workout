export const workoutData = {
  "workout_name": "Chris' Full Body 1",
  "exercises": [
    {
      "name": "Squat",
      "asset_url": "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/143513.png",
      "gif_asset_url": "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/143513.gif",
      "equipment": "barbell"
    },
    {
      "name": "Inclined Bench Press",
      "asset_url": "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/031413.png",
      "gif_asset_url": "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/031413.gif",
      "equipment": "barbell"
    },
    {
      "name": "Pull Ups",
      "asset_url": "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/142913.png",
      "gif_asset_url": "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/142913.gif",
      "equipment": "bodyweight"
    },
    {
      "name": "Shoulder Press",
      "asset_url": "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/040513.png",
      "gif_asset_url": "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/040513.gif",
      "equipment": "dumbbell"
    },
    {
      "name": "Curl Biceps",
      "asset_url": "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/016513.png",
      "gif_asset_url": "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/016513.gif",
      "equipment": "cable"
    },
    {
      "name": "Extension Triceps",
      "asset_url": "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/020013.png",
      "gif_asset_url": "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/020013.gif",
      "equipment": "cable"
    }
  ]
};

export const equipmentIcons = {
  barbell: require('@/assets/p25.png'),
  dumbbell: require('@/assets/p25.png'),
  cable: require('@/assets/p25.png'),
  bodyweight: require('@/assets/p25.png'),
};

export const svgPaths = {
  // Button icons
  buttonIcons: {
    instructions: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm-1-7.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z",
    warmup: "M13 5.83l1.59 1.59L16 6l-4-4-4 4 1.41 1.41L11 5.83v4.27c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5s5-2.24 5-5c0-2.42-1.72-4.44-4-4.9V5.83z",
    faq: "M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z",
    replace: "M10.5619 1.79329C10.3364 2.03612 10.3505 2.41576 10.5933 2.64124L12.2736 4.20156L5.40156 4.20157C5.07019 4.20157 4.80156 4.47019 4.80156 4.80156C4.80156 5.13294 5.07019 5.40157 5.40156 5.40156L12.2736 5.40156L10.5933 6.96189C10.3505 7.18737 10.3364 7.56701 10.5619 7.80984C10.7874 8.05266 11.167 8.06672 11.4098 7.84124L14.2098 5.24124C14.3321 5.12771 14.4016 4.96841 14.4016 4.80156C14.4016 4.63472 14.3321 4.47542 14.2098 4.36189L11.4098 1.76189C11.167 1.53641 10.7874 1.55047 10.5619 1.79329ZM5.44124 8.19329C5.21576 7.95047 4.83612 7.93641 4.59329 8.16189L1.79329 10.7619C1.67103 10.8754 1.60156 11.0347 1.60156 11.2016C1.60156 11.3684 1.67103 11.5277 1.79329 11.6412L4.59329 14.2412C4.83612 14.4667 5.21576 14.4527 5.44124 14.2098C5.66672 13.967 5.65266 13.5874 5.40983 13.3619L3.72948 11.8016H10.6016C10.9329 11.8016 11.2016 11.5329 11.2016 11.2016C11.2016 10.8702 10.9329 10.6016 10.6016 10.6016H3.72948L5.40983 9.04124C5.65266 8.81576 5.66672 8.43612 5.44124 8.19329Z"
  },
  
  // Exercise icons
  exerciseIcons: {
    play: "M8 5v14l11-7z",
    checkmark: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
    remove: "M19 13H5v-2h14v2z",
    dragHandle: "M9 3h2v2H9zm4 0h2v2h-2zM9 7h2v2H9zm4 0h2v2h-2zm-4 4h2v2H9zm4 0h2v2h-2zm-4 4h2v2H9zm4 0h2v2h-2zm-4 4h2v2H9zm4 0h2v2h-2z",
    edit: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
    }
}