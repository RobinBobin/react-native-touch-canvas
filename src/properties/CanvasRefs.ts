import RNCanvas, {
  CanvasRenderingContext2D
} from "react-native-canvas";

export default interface CanvasRefs {
  canvasRef: React.MutableRefObject <RNCanvas>,
  context2dRef: React.MutableRefObject <CanvasRenderingContext2D>
};
