import RNCanvas, {
  CanvasRenderingContext2D
} from "react-native-canvas";

export default interface CanvasMethods {
  clear(): void,
  getRefs(): {
    context2d: CanvasRenderingContext2D,
    rnCanvas: RNCanvas
  },
  switchToDrawing(): void,
  switchToErasing(): void
};
