import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated, Platform } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Svg, Path } from 'react-native-svg';
import { workoutData, equipmentIcons, svgPaths } from '@/data/workoutData';
import {Image} from "expo-image";
const WorkoutScreen = () => {
  // State management
  const [exercises, setExercises] = useState(workoutData.exercises);
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [completedExercises, setCompletedExercises] = useState<any[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [originalExercises, setOriginalExercises] = useState<any[]>([...workoutData.exercises]);
  const [hasChanges, setHasChanges] = useState(false);
  const [isGifPlaying, setIsGifPlaying] = useState(false);
  
  // Refs
  const scrollRef = useRef(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Effects
  useEffect(() => {
    if (exercises.length > 0 && !selectedExercise) {
      setSelectedExercise(exercises[0]);
    }
  }, []);

  // Handlers
  const handleSelectExercise = (exercise : any) => {
    if (!editMode) {
      setSelectedExercise(exercise);
      setIsGifPlaying(false);
      animateGif();
    }
  };

  const animateGif = () => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setIsGifPlaying(true));
  };

  const handleCompleteExercise = (exercise : any) => {
    if (!completedExercises.includes(exercise)) {
      setCompletedExercises([...completedExercises, exercise]);
    }
  };

  const handleLongPress = () => {
    if (!editMode) {
      setEditMode(true);
      setOriginalExercises([...exercises]);
    }
  };

  const handleDragEnd = ({ data }: { data: any[] }) => {
    setExercises(data);
    setHasChanges(true);
  };

  const handleRemoveExercise = (index:any) => {
    const newExercises = [...exercises];
    newExercises.splice(index, 1);
    setExercises(newExercises);
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    setOriginalExercises([...exercises]);
    setEditMode(false);
    setHasChanges(false);
  };

  const handleDiscardChanges = () => {
    setExercises([...originalExercises]);
    setEditMode(false);
    setHasChanges(false);
  };

  // Component functions
  const SvgIcon = ({ 
    path, 
    fill, 
    width = 16, 
    height = 16, 
    viewBox = "0 0 24 24" 
  }: {
    path: string;
    fill: string;
    width?: number;
    height?: number;
    viewBox?: string;
  }) => (
    <Svg width={width} height={height} viewBox={viewBox}>
      <Path d={path} fill={fill} />
    </Svg>
  );

  const renderExerciseCircle = ({ 
    item, 
    index, 
    drag, 
    isActive 
  }: {
    item: any;
    index: number;
    drag: () => void;
    isActive: boolean;
  }) => {
    const isSelected = selectedExercise?.name === item.name;
    const isCompleted = completedExercises.includes(item);
    
    return (
      <TouchableOpacity
        onPress={() => handleSelectExercise(item)}
        onLongPress={handleLongPress}
        activeOpacity={0.7}
        style={styles.exerciseCircleContainer}
      >
        <View style={[
          styles.exerciseItemWrapper,
          isSelected && !editMode && styles.selectedExerciseWrapper,
          isCompleted && styles.completedExerciseWrapper
        ]}>
          <View style={styles.exerciseCircle}>
            <Image
              source={{ uri: item.asset_url }}
              style={styles.exerciseImage}
              resizeMode="contain"
            />
          </View>
        </View>
        
        {isSelected && !editMode && (
          <View style={styles.playButton}>
            <SvgIcon path={svgPaths.exerciseIcons.play} fill="#000" />
          </View>
        )}
        
        {isCompleted && !editMode && (
          <View style={styles.checkmark}>
            <SvgIcon path={svgPaths.exerciseIcons.checkmark} fill="#fff" />
          </View>
        )}
        
        {editMode && (
          <>
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => handleRemoveExercise(index)}
            >
              <SvgIcon path={svgPaths.exerciseIcons.remove} fill="#fff" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPressIn={drag}
              style={styles.dragHandle}
              activeOpacity={1}
            >
              <SvgIcon path={svgPaths.exerciseIcons.dragHandle} fill="#666" />
            </TouchableOpacity>
          </>
        )}
      </TouchableOpacity>
    );
  };

  const renderEditButton = () => (
    <TouchableOpacity 
      style={styles.editButtonContainer}
      onPress={() => {
        setEditMode(true);
        setOriginalExercises([...exercises]);
      }}
    >
      <View style={styles.exerciseItemWrapper}>
        <View style={styles.editButtonCircle}>
          <SvgIcon path={svgPaths.exerciseIcons.edit} fill="#666" />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSecondaryButton = (type: 'instructions' | 'warmup' | 'faq' | 'replace') => (
    <TouchableOpacity style={styles.secondaryButton}>
      <SvgIcon path={svgPaths.buttonIcons[type]} fill="#333" />
      <Text style={styles.secondaryButtonText}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Text>
    </TouchableOpacity>
  );
 

  return (
    <View style={styles.container}>
      {/* Exercise List */}
      <View style={styles.exerciseListContainer}>
        <View style={styles.exerciseListBorder}>
          {editMode ? (
            <DraggableFlatList
              data={exercises}
              renderItem={({ item, drag, isActive }) => renderExerciseCircle({ item, drag, isActive, index: exercises.indexOf(item) })}
              keyExtractor={(item) => item.name}
              onDragEnd={handleDragEnd}
              horizontal
              contentContainerStyle={styles.draggableListContent}
              activationDistance={10}
              dragItemOverflow={true}
            />
          ) : (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.exerciseListContent}
              ref={scrollRef}
            >
              {exercises.map((exercise, index) => (
                <View key={exercise.name}>
                  {renderExerciseCircle({ 
                    item: exercise, 
                    index,
                    drag: () => {}, // Add empty drag function
                    isActive: false // Add isActive flag
                  })}
                </View>
              ))}
              {!editMode && renderEditButton()}
            </ScrollView>
          )}
        </View>
      </View>

      {/* Exercise Details */}
      {selectedExercise && (
        <View style={styles.detailsContainer}>
          <View style={styles.detailsContainerWrap}>
            <View style={styles.titleContainer}>
              <Text style={styles.exerciseTitle}>{selectedExercise.name}</Text>
              <TouchableOpacity style={styles.replaceButton}>
                <SvgIcon 
                  path={svgPaths.buttonIcons.replace} 
                  fill="#010101" 
                  width={16} 
                  height={16} 
                />
                <Text style={styles.replaceButtonText}>Replace</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.gifContainer}>
              <Image
                source={{ uri: isGifPlaying ? selectedExercise.gif_asset_url : selectedExercise.asset_url }}
                style={styles.exerciseGif}
                autoplay
                resizeMode="contain"
              />
              
              <View style={styles.equipmentContainer}>
                <Image 
                  source={equipmentIcons[selectedExercise.equipment as keyof typeof equipmentIcons]} 
                  style={styles.equipmentIcon} 
                />
                <Text style={styles.equipmentText}>
                  {selectedExercise.equipment.charAt(0).toUpperCase() + selectedExercise.equipment.slice(1)}
                </Text>
              </View>
            </View>
            
            <View style={styles.buttonContainer}>
              {renderSecondaryButton('instructions')}
              {renderSecondaryButton('warmup')}
              {renderSecondaryButton('faq')}
            </View>
          </View>
        </View>
      )}

      {/* Edit Mode Controls */}
      {editMode && (
        <View style={styles.editControls}>
          <View style={styles.controlButtonsContainer}>
            <TouchableOpacity 
              style={styles.discardButton}
              onPress={handleDiscardChanges}
            >
              <Text style={styles.discardButtonText}>Discard</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.controlButton, !hasChanges && styles.disabledButton]}
              disabled={!hasChanges}
              onPress={handleSaveChanges}
            >
              <Text style={styles.controlButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      <View style={styles.bottomSpacing} />
    </View>
  );
};

// Styles remain the same as before
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f2f7',
  },
  exerciseListContainer: {
    height: 120,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e5',
  },
  exerciseListBorder: {
    flex: 1,
    borderBottomWidth: 8,
    borderBottomColor: 'transparent',
  },
  exerciseListContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  draggableListContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  exerciseItemWrapper: {
    marginRight: 16,
    position: 'relative',
    borderColor: '#fff',
    borderRadius: 32,
    borderWidth: 2,
  },
  selectedExerciseWrapper: {
    borderColor: '#FFD700',
  },
  completedExerciseWrapper: {
    borderColor: '#4CAF50',
  },
  exerciseCircleContainer: {
    alignItems: 'center',
    width: 80,
  },
  exerciseCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  exerciseImage: {
    width: '105%',
    height: '105%',
  },
  playButton: {
    position: 'absolute',
    backgroundColor: '#FFD700',
    width: 20,
    height: 20,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    right: 11,
    bottom: 0,
    zIndex: 2,
  },
  checkmark: {
    position: 'absolute',
    backgroundColor: '#4CAF50',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    top: 0,
    zIndex: 2,
  },
  removeButton: {
    position: 'absolute',
    backgroundColor: '#990d35',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    top: 0,
    zIndex: 2,
    borderWidth: 2,
    borderColor: '#fff',
  },
  dragHandle: {
    position: 'absolute',
    bottom: -10,
    zIndex: 2,
  },
  editButtonContainer: {
    alignItems: 'center',
    width: 80,
  },
  editButtonCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  detailsContainerWrap: {
    backgroundColor: "#fefefe",
    padding: 20,
    borderRadius: 20,
  },
  detailsContainer: {
    flex: 1,
    margin: 20,
    marginTop: -10
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  exerciseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  replaceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffe74c',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginLeft: 10,
  },
  replaceButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '900',
    marginLeft: 4,
  },
  gifContainer: {
    aspectRatio: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "#e4e4e5",
    borderWidth: 1,
    borderRadius: 20,
    position: 'relative',
  },
  exerciseGif: {
    width: '100%',
    height: '100%',
  },
  equipmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 10,
    bottom: 10,
    padding: 8,
    backgroundColor: 'rgba(243, 242, 247, 0.9)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e4e4e5',
  },
  equipmentIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  equipmentText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    minWidth: '30%',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  editControls: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  controlButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  controlButton: {
    flex: 1,
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#FFF9C4',
    marginLeft: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#f5f5f5',
  },
  controlButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  discardButton: {
    flex: 1,
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  discardButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default WorkoutScreen;