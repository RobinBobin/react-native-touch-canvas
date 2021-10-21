import RNCanvas, {
  CanvasRenderingContext2D
} from "react-native-canvas";

export default interface CanvasAndCanvasWrapperProperties {
  onCreated?: (context2d: CanvasRenderingContext2D, canvas: RNCanvas) => void
};
