import RNCanvas, {
  CanvasRenderingContext2D
} from "react-native-canvas";

export default interface CanvasMethods {
  get(): {
    canvas: RNCanvas,
    context2d: CanvasRenderingContext2D
  },
  switchToDrawing(): void,
  switchToErasing(): void
};
