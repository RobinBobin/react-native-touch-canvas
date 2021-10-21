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
import CanvasWrapperContainer from "./CanvasWrapperContainer";
import CanvasProperties from "./properties/CanvasProperties";

const Canvas = forwardRef((props: CanvasProperties, ref) => {
  const canvasRef = useRef <RNCanvas> ();
  const context2dRef = useRef <CanvasRenderingContext2D> ();
  
  const initImperativeHandle = useCallback((): CanvasMethods => ({
    getRefs() {
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
    <CanvasWrapperContainer
      { ...props }
      canvasRef={canvasRef}
      context2dRef={context2dRef}
      ref={ref}
    />
  );
});

export default Canvas;
