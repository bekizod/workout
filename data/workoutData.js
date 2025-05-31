import Svg, { Path } from 'react-native-svg';
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
  barbell: require('@/assets/image-2.png'),
  dumbbell: require('@/assets/image-3.png'),
  cable: require('@/assets/image-1.png'),
  bodyweight: require('@/assets/image-5.png'),
};

export const svgPaths = {
  // Button icons
  buttonIcons: {
    instructions: () => (
      <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M13 9.5V7.75C13 6.50736 11.9926 5.5 10.75 5.5H9.75C9.33579 5.5 9 5.16421 9 4.75V3.75C9 2.50736 7.99264 1.5 6.75 1.5H5.5M6 11V11.5M8 9.5V11.5M10 8V11.5M7 1.5H3.75C3.33579 1.5 3 1.83579 3 2.25V13.75C3 14.1642 3.33579 14.5 3.75 14.5H12.25C12.6642 14.5 13 14.1642 13 13.75V7.5C13 4.18629 10.3137 1.5 7 1.5Z" stroke="#010101" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</Svg>
    ),
    warmup: () => (
      <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M12.6654 5.92667L9.31736 5.52733M9.31736 5.52733L8.14736 5.388C7.61203 5.324 7.3447 5.292 7.14203 5.42933C6.93936 5.56667 6.8647 5.82933 6.7167 6.35467L6.27136 7.936C6.01403 8.848 5.88536 9.30467 6.1267 9.58067C6.36736 9.85667 6.82936 9.78267 7.75336 9.63467L8.09203 9.58067M9.31736 5.52733L8.09203 9.58067M12.6654 14L12.3614 11.6867C12.192 10.4013 12.108 9.75867 11.6594 9.42C11.2114 9.08067 10.58 9.182 9.31736 9.384L8.09203 9.58067M6.66536 11.3333L6.2967 12.0707C6.10321 12.4575 5.78953 12.7712 5.4027 12.9647L3.33203 14M9.66536 3C9.66536 3.26522 9.56001 3.51957 9.37247 3.70711C9.18493 3.89464 8.93058 4 8.66536 4C8.40015 4 8.14579 3.89464 7.95826 3.70711C7.77072 3.51957 7.66536 3.26522 7.66536 3C7.66536 2.73478 7.77072 2.48043 7.95826 2.29289C8.14579 2.10536 8.40015 2 8.66536 2C8.93058 2 9.18493 2.10536 9.37247 2.29289C9.56001 2.48043 9.66536 2.73478 9.66536 3Z" stroke="#010101" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
</Svg>

    ),
    faq: () => (
      <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M6.58594 5.01256C7.36699 4.32915 8.63332 4.32915 9.41436 5.01256C10.1954 5.69598 10.1954 6.80402 9.41436 7.48744C9.27842 7.60639 9.12778 7.70463 8.96755 7.78217C8.47043 8.02276 8.00015 8.44772 8.00015 9V9.5M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8ZM8 11.5H8.005V11.505H8V11.5Z" stroke="#0F172A" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
</Svg>

    ),
    replace: () => (
      <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path fill-rule="evenodd" clip-rule="evenodd" d="M10.5619 1.79329C10.3364 2.03612 10.3505 2.41576 10.5933 2.64124L12.2736 4.20156L5.40156 4.20157C5.07019 4.20157 4.80156 4.47019 4.80156 4.80156C4.80156 5.13294 5.07019 5.40157 5.40156 5.40156L12.2736 5.40156L10.5933 6.96189C10.3505 7.18737 10.3364 7.56701 10.5619 7.80984C10.7874 8.05266 11.167 8.06672 11.4098 7.84124L14.2098 5.24124C14.3321 5.12771 14.4016 4.96841 14.4016 4.80156C14.4016 4.63472 14.3321 4.47542 14.2098 4.36189L11.4098 1.76189C11.167 1.53641 10.7874 1.55047 10.5619 1.79329ZM5.44124 8.19329C5.21576 7.95047 4.83612 7.93641 4.59329 8.16189L1.79329 10.7619C1.67103 10.8754 1.60156 11.0347 1.60156 11.2016C1.60156 11.3684 1.67103 11.5277 1.79329 11.6412L4.59329 14.2412C4.83612 14.4667 5.21576 14.4527 5.44124 14.2098C5.66672 13.967 5.65266 13.5874 5.40983 13.3619L3.72948 11.8016H10.6016C10.9329 11.8016 11.2016 11.5329 11.2016 11.2016C11.2016 10.8702 10.9329 10.6016 10.6016 10.6016H3.72948L5.40983 9.04124C5.65266 8.81576 5.66672 8.43612 5.44124 8.19329Z" fill="#010101"/>
</Svg>

    )
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