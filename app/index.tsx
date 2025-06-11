import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator, 
  PermissionsAndroid, 
  Platform, 
  Dimensions 
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as RNFS from 'react-native-fs';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';

// Vocabulary and character mappings
const vocab = [
    "!", "\"", "'", "(", ")", "*", ",", "-", ".", "/", "0", "1", "2", "3", "4", 
    "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "A", "D", "E", "F", 
    "H", "L", "M", "N", "O", "S", "T", "W", "Y", "\\", "_", "a", "b", "e", "f", 
    "h", "i", "l", "m", "n", "o", "p", "r", "s", "t", "u", "v", "x", "y", "|", 
    "~", "«", "« »", "»", "ɑ", "А", "Г", "М", "Н", "Т", "Ь", "е", "и", "й", 
    "к", "м", "о", "р", "с", "х", "ь", "э", "я", "ሀ", "ሁ", "ሂ", "ሃ", "ሄ", "ህ", 
    "ሆ", "ለ", "ሉ", "ሊ", "ላ", "ሌ", "ል", "ሎ", "ሏ", "ሐ", "ሑ", "ሒ", "ሓ", "ሔ", "ሕ", 
    "ሖ", "ሗ", "መ", "ሙ", "ሚ", "ማ", "ሜ", "ም", "ሞ", "ሟ", "ሠ", "ሡ", "ሢ", "ሣ", "ሤ", 
    "ሥ", "ሦ", "ሧ", "ረ", "ሩ", "ሪ", "ራ", "ሬ", "ር", "ሮ", "ሯ", "ሰ", "ሱ", "ሲ", "ሳ", 
    "ሴ", "ስ", "ሶ", "ሷ", "ሸ", "ሹ", "ሺ", "ሻ", "ሼ", "ሽ", "ሾ", "ሿ", "ቀ", "ቁ", "ቂ", 
    "ቃ", "ቄ", "ቅ", "ቆ", "ቈ", "ቊ", "ቋ", "ቌ", "ቍ", "በ", "ቡ", "ቢ", "ባ", "ቤ", "ብ", 
    "ቦ", "ቧ", "ቨ", "ቩ", "ቪ", "ቫ", "ቬ", "ቭ", "ቮ", "ቯ", "ተ", "ቱ", "ቲ", "ታ", "ቴ", 
    "ት", "ቶ", "ቷ", "ቸ", "ቹ", "ቺ", "ቻ", "ቼ", "ች", "ቾ", "ቿ", "ኀ", "ኁ", "ኂ", "ኃ", 
    "ኄ", "ኅ", "ኆ", "ኈ", "ኊ", "ኋ", "ኌ", "ኍ", "ነ", "ኑ", "ኒ", "ና", "ኔ", "ን", "ኖ", 
    "ኗ", "ኘ", "ኙ", "ኚ", "ኛ", "ኜ", "ኝ", "ኞ", "ኟ", "አ", "ኡ", "ኢ", "ኣ", "ኤ", "እ", 
    "ኦ", "ኧ", "ከ", "ኩ", "ኪ", "ካ", "ኬ", "ክ", "ኮ", "ኰ", "ኲ", "ኳ", "ኴ", "ኵ", "ኸ", 
    "ኹ", "ኺ", "ኻ", "ኼ", "ኽ", "ኾ", "ዃ", "ወ", "ዉ", "ዊ", "ዋ", "ዌ", "ው", "ዎ", "ዐ", 
    "ዑ", "ዒ", "ዓ", "ዔ", "ዕ", "ዖ", "ዘ", "ዙ", "ዚ", "ዛ", "ዜ", "ዝ", "ዞ", "ዟ", "ዠ", 
    "ዡ", "ዢ", "ዣ", "ዤ", "ዥ", "ዦ", "ዧ", "የ", "ዩ", "ዪ", "ያ", "ዬ", "ይ", "ዮ", "ደ", 
    "ዱ", "ዲ", "ዳ", "ዴ", "ድ", "ዶ", "ዷ", "ጀ", "ጁ", "ጂ", "ጃ", "ጄ", "ጅ", "ጆ", "ጇ", 
    "ገ", "ጉ", "ጊ", "ጋ", "ጌ", "ግ", "ጎ", "ጐ", "ጒ", "ጓ", "ጔ", "ጕ", "ጠ", "ጡ", "ጢ", 
    "ጣ", "ጤ", "ጥ", "ጦ", "ጧ", "ጨ", "ጩ", "ጪ", "ጫ", "ጬ", "ጭ", "ጮ", "ጯ", "ጰ", "ጱ", 
    "ጲ", "ጳ", "ጴ", "ጵ", "ጶ", "ጷ", "ጸ", "ጹ", "ጺ", "ጻ", "ጼ", "ጽ", "ጾ", "ጿ", "ፀ", 
    "ፁ", "ፂ", "ፃ", "ፄ", "ፅ", "ፆ", "ፈ", "ፉ", "ፊ", "ፋ", "ፌ", "ፍ", "ፎ", "ፏ", "ፐ", 
    "ፑ", "ፒ", "ፓ", "ፔ", "ፕ", "ፖ", "ፗ", "፠", "፡", "።", "፣", "፤", "፥", "፦", "፨", 
    "፩", "፪", "፫", "፬", "፭", "፮", "፯", "፰", "፱", "፲", "፲፩", "፲፪", "፲፫", "፲፬", "፲፭", 
    "፲፮", "፲፯", "፲፰", "፲፱", "፳", "፳፩", "፳፪", "፳፫", "፳፬", "፳፭", "፳፮", "፳፯", "፳፰", "፳፱", 
    "፳፻", "፳፻፲", "፳፻፳", "፳፻፴", "፳፻፵", "፳፻፶", "፳፻፷", "፳፻፸", "፳፻፹", "፳፻፺", "፴", "፴፩", "፴፪", "፴፫", "፴፬", 
    "፴፭", "፴፮", "፴፯", "፴፰", "፴፱", "፴፻", "፴፻፲", "፴፻፳", "፴፻፴", "፴፻፵", "፴፻፶", "፴፻፷", "፴፻፸", "፴፻፹", "፴፻፺", 
    "፵", "፵፩", "፵፪", "፵፫", "፵፬", "፵፭", "፵፮", "፵፯", "፵፰", "፵፱", "፵፻", "፵፻፲", "፵፻፳", "፵፻፴", "፵፻፵", 
    "፵፻፶", "፵፻፷", "፵፻፸", "፵፻፹", "፵፻፺", "፶", "፶፩", "፶፪", "፶፫", "፶፬", "፶፭", "፶፮", "፶፯", "፶፰", "፶፱", 
    "፶፻", "፶፻፲", "፶፻፳", "፶፻፴", "፶፻፵", "፶፻፶", "፶፻፷", "፶፻፸", "፶፻፹", "፶፻፺", "፷", "፷፩", "፷፪", "፷፫", "፷፬", 
    "፷፭", "፷፮", "፷፯", "፷፰", "፷፱", "፷፻", "፷፻፲", "፷፻፳", "፷፻፴", "፷፻፵", "፷፻፶", "፷፻፷", "፷፻፸", "፷፻፹", "፷፻፺", 
    "፸", "፸፩", "፸፪", "፸፫", "፸፬", "፸፭", "፸፮", "፸፯", "፸፰", "፸፱", "፸፻", "፸፻፲", "፸፻፳", "፸፻፴", "፸፻፵", 
    "፸፻፶", "፸፻፷", "፸፻፸", "፸፻፹", "፸፻፺", "፹", "፹፩", "፹፪", "፹፫", "፹፬", "፹፭", "፹፮", "፹፯", "፹፰", "፹፱", 
    "፹፻", "፹፻፲", "፹፻፳", "፹፻፴", "፹፻፵", "፹፻፶", "፹፻፷", "፹፻፸", "፹፻፹", "፹፻፺", "፺", "፺፩", "፺፪", "፺፫", "፺፬", 
    "፺፭", "፺፮", "፺፯", "፺፰", "፺፱", "፺፻", "፺፻፲", "፺፻፳", "፺፻፴", "፺፻፵", "፺፻፶", "፺፻፷", "፺፻፸", "፺፻፹", "፺፻፺", 
    "፻", "፻፩", "፻፪", "፻፫", "፻፬", "፻፭", "፻፮", "፻፯", "፻፰", "፻፱", "፻፲", "፻፳", "፻፴", "፻፵", "፻፶", 
    "፻፷", "፻፸", "፻፹", "፻፺", "፼", "‐", "–", "—", "“", "”", "…", "‹", "▪", "️", "？", 
    "<blank>", " "
];

const char2idx: {[key: string]: number} = {};
const idx2char: {[key: number]: string} = {};
vocab.forEach((char, idx) => {
  char2idx[char] = idx;
  idx2char[idx] = char;
});

export default function AmharicOCR() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [recognizedText, setRecognizedText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [boxes, setBoxes] = useState<{x1: number, y1: number, x2: number, y2: number}[]>([]);
  const [modelLoaded, setModelLoaded] = useState<boolean>(false);
  const [detectionModel, setDetectionModel] = useState<tf.GraphModel | null>(null);
  const [recognitionModel, setRecognitionModel] = useState<tf.GraphModel | null>(null);

  // Initialize TensorFlow and load models
  useEffect(() => {
    const initializeTF = async () => {
      try {
        await tf.ready();
        console.log('TensorFlow.js is ready');

        // Load detection model (YOLO equivalent)
        const detectionModel = await tf.loadGraphModel(
          bundleResourceIO(
            require('./assets/amharic_yolov8_metadata.json'),
            require('./assets/amharic_yolov8s_last.tflite')
          )
        );
        setDetectionModel(detectionModel);

        // Load recognition model (CRNN equivalent)
        const recognitionModel = await tf.loadGraphModel(
          bundleResourceIO(
            require('./assets/crnn_metadata.json'),
            require('./assets/crnn_model.tflite')
          )
        );
        setRecognitionModel(recognitionModel);

        setModelLoaded(true);
      } catch (err) {
        console.error('TensorFlow initialization error:', err);
      }
    };

    initializeTF();

    return () => {
      if (detectionModel) detectionModel.dispose();
      if (recognitionModel) recognitionModel.dispose();
    };
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "App needs access to your camera",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const selectImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });

      if (!result.didCancel && result.assets && result.assets[0].uri) {
        processImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Image picker error:', error);
    }
  };

  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    try {
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 1,
      });

      if (!result.didCancel && result.assets && result.assets[0].uri) {
        processImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Camera error:', error);
    }
  };

  const processImage = async (uri: string) => {
    if (!modelLoaded || !detectionModel || !recognitionModel) {
      console.error('Models not loaded yet');
      return;
    }

    setLoading(true);
    setImageUri(uri);
    setRecognizedText('');
    setBoxes([]);

    try {
      const detectionInput = await prepareDetectionInput(uri);
      const detectionOutput = detectionModel.predict(detectionInput) as tf.Tensor;
      const detectionData = await detectionOutput.array();
      
      const wordBoxes = processDetectionOutput(detectionData);
      setBoxes(wordBoxes);
      
      const sortedLines = sortBoxes(wordBoxes);
      const allLines: string[] = [];
      
      for (const line of sortedLines) {
        const lineWords: {text: string, box: any}[] = [];
        
        for (const box of line) {
          const cropUri = await cropImage(uri, box);
          const recognitionInput = await prepareRecognitionInput(cropUri);
          const recognitionOutput = recognitionModel.predict(recognitionInput) as tf.Tensor;
          const recognitionData = await recognitionOutput.array();
          const decodedText = decodePrediction(recognitionData);
          lineWords.push({text: decodedText, box});
        }
        
        const lineText = createTextLineWithSpacing(lineWords);
        allLines.push(lineText);
      }
      
      setRecognizedText(allLines.join('\n'));
    } catch (error) {
      console.error('Processing error:', error);
    } finally {
      setLoading(false);
    }
  };

  const prepareDetectionInput = async (uri: string): Promise<tf.Tensor> => {
    const resizedImage = await manipulateAsync(
      uri,
      [{ resize: { width: 640, height: 640 } }],
      { compress: 1, format: SaveFormat.JPEG }
    );
    
    const response = await fetch(resizedImage.uri, {}, { isBinary: true });
    const imageData = await response.arrayBuffer();
    const imageTensor = decodeJpeg(new Uint8Array(imageData));
    const normalized = tf.div(imageTensor, 255.0);
    const reshaped = tf.expandDims(normalized, 0);
    
    tf.dispose([imageTensor, normalized]);
    
    return reshaped;
  };

  const processDetectionOutput = (output: any): {x1: number, y1: number, x2: number, y2: number}[] => {
    const boxes: {x1: number, y1: number, x2: number, y2: number}[] = [];
    const [batch, rows, cols, detections] = output.shape;
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const confidence = output[0][i][j][4];
        if (confidence > 0.5) {
          const x1 = output[0][i][j][0] * Dimensions.get('window').width;
          const y1 = output[0][i][j][1] * Dimensions.get('window').height;
          const x2 = output[0][i][j][2] * Dimensions.get('window').width;
          const y2 = output[0][i][j][3] * Dimensions.get('window').height;
          boxes.push({ x1, y1, x2, y2 });
        }
      }
    }
    
    return boxes;
  };

  const sortBoxes = (boxes: {x1: number, y1: number, x2: number, y2: number}[]) => {
    const sorted = [...boxes].sort((a, b) => a.y1 - b.y1);
    const lines: {x1: number, y1: number, x2: number, y2: number}[][] = [];
    let currentLine: {x1: number, y1: number, x2: number, y2: number}[] = [];
    const lineThreshold = 10;
    
    for (const box of sorted) {
      if (currentLine.length === 0) {
        currentLine.push(box);
      } else {
        const lastBox = currentLine[currentLine.length - 1];
        if (Math.abs(box.y1 - lastBox.y1) < lineThreshold) {
          currentLine.push(box);
        } else {
          lines.push([...currentLine].sort((a, b) => a.x1 - b.x1));
          currentLine = [box];
        }
      }
    }
    
    if (currentLine.length > 0) {
      lines.push([...currentLine].sort((a, b) => a.x1 - b.x1));
    }
    
    return lines;
  };

  const cropImage = async (uri: string, box: {x1: number, y1: number, x2: number, y2: number}) => {
    const actions = [{
      crop: {
        originX: box.x1,
        originY: box.y1,
        width: box.x2 - box.x1,
        height: box.y2 - box.y1,
      },
    }];
    
    const saveOptions = {
      compress: 1,
      format: SaveFormat.JPEG,
    };
    
    const result = await manipulateAsync(uri, actions, saveOptions);
    return result.uri;
  };

  const prepareRecognitionInput = async (uri: string): Promise<tf.Tensor> => {
    const processed = await manipulateAsync(
      uri,
      [
        { grayscale: {} },
        { resize: { width: 128, height: 32 } }
      ],
      { compress: 1, format: SaveFormat.JPEG }
    );
    
    const response = await fetch(processed.uri, {}, { isBinary: true });
    const imageData = await response.arrayBuffer();
    const imageTensor = decodeJpeg(new Uint8Array(imageData));
    const normalized = tf.div(imageTensor, 255.0);
    const reshaped = tf.expandDims(normalized, 0);
    
    tf.dispose([imageTensor, normalized]);
    
    return reshaped;
  };

  const decodePrediction = (output: any): string => {
    const [batch, timesteps, numClasses] = output.shape;
    const decoded: string[] = [];
    let prevIdx = -1;
    
    for (let i = 0; i < timesteps; i++) {
      let maxProb = -Infinity;
      let maxIdx = -1;
      
      for (let j = 0; j < numClasses; j++) {
        const prob = output[0][i][j];
        if (prob > maxProb) {
          maxProb = prob;
          maxIdx = j;
        }
      }
      
      if (maxIdx !== prevIdx && maxIdx !== char2idx['<blank>']) {
        decoded.push(idx2char[maxIdx]);
      }
      prevIdx = maxIdx;
    }
    
    return decoded.join('');
  };

  const createTextLineWithSpacing = (words: {text: string, box: any}[]): string => {
    let lineStr = '';
    let prevX2: number | null = null;
    const spaceScale = 15;
    
    for (const {text, box} of words) {
      if (prevX2 === null) {
        lineStr += text;
      } else {
        const gapPixels = box.x1 - prevX2;
        const numSpaces = gapPixels > 0 ? Math.max(1, Math.floor(gapPixels / spaceScale)) : 1;
        lineStr += ' '.repeat(numSpaces) + text;
      }
      prevX2 = box.x2;
    }
    
    return lineStr;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Amharic OCR</Text>
      
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={selectImage}>
            <Text style={styles.buttonText}>Choose from Gallery</Text>
          </TouchableOpacity>
        </View>
      )}

      {recognizedText ? (
        <View style={styles.textContainer}>
          <Text style={styles.recognizedText}>{recognizedText}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 10,
    minWidth: 150,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  textContainer: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: 'white',
    marginTop: 20,
  },
  recognizedText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});

// Helper function to bundle model resources
function bundleResourceIO(modelJson: any, weightsBin: any) {
  return {
    modelJson,
    weightManifest: [
      {
        paths: ['weights.bin'],
        weights: weightsBin,
      },
    ],
  };
}