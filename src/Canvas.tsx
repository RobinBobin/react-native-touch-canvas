import React, {
  ForwardedRef,
  MutableRefObject,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
  useRef
} from "react";
import {
  LayoutChangeEvent,
  View
} from "react-native";
import RNCanvas, {
  CanvasRenderingContext2D
} from "react-native-canvas";
import {
  GestureHandlerRootView
} from "react-native-gesture-handler";
import CanvasMethods from "./CanvasMethods";
import CanvasWrapper, {
  OnCreated
} from "./CanvasWrapper";
import CanvasProperties from "./properties/CanvasProperties";

const Canvas = forwardRef((props: CanvasProperties, ref) => {
  const rnCanvas = useRef <RNCanvas> ();
  const context2d = useRef <CanvasRenderingContext2D> ();
  
  const canvasMethods = useCanvasMethods(rnCanvas, context2d, ref);
  
  const containerOnLayout = useCallback(({nativeEvent}: LayoutChangeEvent) => {
    if (props.containerStyle) {
      setCanvasHierarchy(getCanvasHierarchy(nativeEvent.layout.height, nativeEvent.layout.width));
    }
  }, [props]);
  
  const getCanvasHierarchy = useCallback((height?: number, width?: number) => {
    return (
      (!props.backgroundImage && !props.containerStyle)
      || (height && width)
      ?
        <View
          pointerEvents={"none"}
          style={props.style}
        >
          <CanvasWrapper
            onCreated={onCanvasCreated}
            height={height}
            width={width}
          />
        </View>
      :
      null
    );
  }, [props]);
  
  const onCanvasCreated = useCallback <OnCreated> (canvas => {
    rnCanvas.current = canvas;
    context2d.current = canvas.getContext("2d");
    
    if (props.onCreated) {
      props.onCreated(canvasMethods);
    }
  }, [canvasMethods, props]);
  
  const [canvasHierarchy, setCanvasHierarchy] = useState(getCanvasHierarchy);
  
  return (
    <GestureHandlerRootView
      onLayout={containerOnLayout}
      style={props.containerStyle}
    >
      { canvasHierarchy }
    </GestureHandlerRootView>
  );
});

function useCanvasMethods(
  canvas: MutableRefObject <RNCanvas>,
  context2d: MutableRefObject <CanvasRenderingContext2D>,
  ref: ForwardedRef <any>)
{
  const [canvasMethods] = useState((): CanvasMethods => ({
    clear() {
      this.switchToErasing();
      
      context2d.current.fillRect(0, 0, canvas.current.width, canvas.current.height);
      
      this.switchToDrawing();
    },
    getRefs() {
      return {
        context2d: context2d.current,
        rnCanvas: canvas.current
      };
    },
    switchToDrawing() {
      // @ts-ignore
      context2d.current.globalCompositeOperation = "source-over";
    },
    switchToErasing() {
      // @ts-ignore
      context2d.current.globalCompositeOperation = "destination-out";
    }
  }));
  
  useImperativeHandle(ref, () => canvasMethods, []);
  
  return canvasMethods;
}

export default Canvas;
