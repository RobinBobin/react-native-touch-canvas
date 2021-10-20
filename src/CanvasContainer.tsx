import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef
} from "react";
import RNCanvas, {
  CanvasRenderingContext2D
} from "react-native-canvas";
import CanvasMethods from "./CanvasMethods";
import CanvasWrapper from "./CanvasWrapper";

const CanvasContainer = forwardRef((props, ref) => {
  const canvasRef = useRef <RNCanvas> ();
  const context2dRef = useRef <CanvasRenderingContext2D> ();
  
  const initImperativeHandle = useCallback((): CanvasMethods => ({
    get() {
      return {
        canvas: canvasRef.current,
        context2d: context2dRef.current
      };
    },
    switchToDrawing() {
      // @ts-ignore
      context2dRef.current.globalCompositeOperation = "source-over";
    },
    switchToErasing() {
      // @ts-ignore
      context2dRef.current.globalCompositeOperation = "destination-out";
    }
  }), []);
  
  useImperativeHandle(
    ref,
    initImperativeHandle,
    [initImperativeHandle]
  );
  
  return (
    <CanvasWrapper
      { ...props }
      canvasRef={canvasRef}
      context2dRef={context2dRef}
    />
  );
});

export default CanvasContainer;
