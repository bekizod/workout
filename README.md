# Workout Tracker App

![Workout Tracker Demo](https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/143513.gif) 

A comprehensive workout tracking application built with React Native that allows users to:
- View and organize exercises
- Track workout progress
- Mark exercises as complete
- Customize workout routines
- View exercise demonstrations with GIFs

## Features

- **Interactive Exercise List**: Horizontal scrollable list of exercises with visual indicators
- **Exercise Details**: Detailed view with animated GIF demonstrations
- **Completion Tracking**: Mark exercises as complete with visual feedback
- **Drag-and-Drop Editing**: Reorder exercises in edit mode
- **Responsive Design**: Works on both iOS and Android devices
- **Performance Optimized**: Uses Expo Image for efficient image loading

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI (for development)
- Android Studio/Xcode (for emulator testing)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/bekizod/workout.git
   cd workout-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Install Expo CLI globally (if not already installed):
   ```bash
   npm install -g expo-cli
   ```

## Running the App

### Development

1. Start the development server:
   ```bash
   expo start
   # or
   npm start
   ```

2. Choose your preferred method to run the app:
   - **iOS Simulator**: Press `i` in the terminal (requires Xcode)
   - **Android Emulator**: Press `a` in the terminal (requires Android Studio)
   - **Physical Device**: Scan the QR code with the Expo Go app

### Production Build

To create standalone builds:

1. For Android:
   ```bash
   expo build:android
   ```

2. For iOS:
   ```bash
   expo build:ios
   ```

## Configuration

The app comes pre-configured with a default workout routine. To customize:

1. Edit the workout data in `src/data/workoutData.ts`:
   ```typescript
   export const workoutData = {
     workout_name: "Your Custom Workout",
     exercises: [
       {
         name: "Exercise Name",
         asset_url: "path/to/image.png",
         gif_asset_url: "path/to/gif.gif",
         equipment: "barbell" // or "dumbbell", "cable", "bodyweight"
       },
       // Add more exercises
     ]
   };
   ```

2. Add your equipment icons to the `assets` folder and update the references in `equipmentIcons`.

## Usage

### Basic Workflow

1. **Browse Exercises**: Scroll horizontally through available exercises
2. **Select Exercise**: Tap an exercise to view details and demonstration
3. **Complete Exercise**: Tap "Mark Complete" to track your progress
4. **Edit Routine**: Long-press the exercise list to enter edit mode

### Edit Mode Features

- **Reorder**: Drag exercises to rearrange
- **Remove**: Tap the minus icon to delete exercises
- **Save/Discard**: Confirm or cancel your changes

## Dependencies

Main dependencies include:
- React Native
- Expo
- react-native-draggable-flatlist
- expo-image
- react-native-svg

See `package.json` for complete list.


## Support

For issues or questions, please:
- Open an issue on GitHub
- Contact the maintainer at bekizodcancer@gmail.com
---