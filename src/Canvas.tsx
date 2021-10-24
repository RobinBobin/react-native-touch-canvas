import React, {
  EffectCallback,
  ForwardedRef,
  Fragment,
  MutableRefObject,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import {
  Image,
  ImageBackground,
  LayoutChangeEvent,
  View
} from "react-native";
import RNCanvas, {
  CanvasRenderingContext2D
} from "react-native-canvas";
import {
  GestureHandlerRootView
} from "react-native-gesture-handler";
import { StaticUtils } from "simple-common-utils";
import CanvasMethods from "./CanvasMethods";
import CanvasProperties from "./properties/CanvasProperties";

const Canvas = forwardRef((props: CanvasProperties, ref) => {
  const context2d = useRef <CanvasRenderingContext2D> ();
  const rnCanvas = useRef <RNCanvas> ();
  
  const [canvasSize, setCanvasSize] = useState <Size> ();
  
  const canvasMethods = useCanvasMethods(rnCanvas, context2d, ref);
  
  const canvasOnLayout = useCallback(async ({nativeEvent}: LayoutChangeEvent) => {
    let { height, width } = nativeEvent.layout;
    let imageHeight: number, imageWidth: number;
    
    if (props.backgroundImage?.constructor === Number) {
      const ras = Image.resolveAssetSource(props.backgroundImage);
      
      imageHeight = ras.height;
      imageWidth = ras.width;
    } else if ((props.backgroundImage as {})?.hasOwnProperty("uri")) {
      try {
        const size = await new Promise <Size> ((resolve, reject) => {
          Image.getSize(
            props.backgroundImage["uri"],
            (width: number, height: number) => resolve({height, width}),
            reject
          );
        });
        
        imageHeight = size.height;
        imageWidth = size.width;
      } catch (error) {
        console.log(StaticUtils.formatError(error));
      }
    }
    
    if (imageHeight && imageWidth) {
      height = imageHeight * width / imageWidth;
    }
    
    setCanvasSize({height, width});
  }, [props.backgroundImage]);
  
  const handleCanvas = useCallback((canvas: RNCanvas) => {
    rnCanvas.current = canvas;
    context2d.current = canvas ? canvas.getContext("2d") : null;
    
    if (context2d.current) {
      canvas.height = canvasSize.height;
      canvas.width = canvasSize.width;
      
      if (props.onCreated) {
        props.onCreated(canvasMethods);
      }
    }
  }, [
    canvasMethods,
    canvasSize,
    props.onCreated
  ]);
  
  useEffect(setCanvasSize as EffectCallback, [props]);
  
  return (
    <View
      style={props.containerStyle}
    >
      {
        React.createElement(
          canvasSize ? GestureHandlerRootView : Fragment,
          canvasSize ? { style: canvasSize } : null,
          <View
            onLayout={canvasSize ? undefined : canvasOnLayout}
            pointerEvents={"none"}
            style={props.style}
          >
            {
              canvasSize && (
                !props.backgroundImage
                ?
                  <RNCanvas
                    ref={handleCanvas}
                  />
                :
                  <ImageBackground
                    source={props.backgroundImage}
                  >
                    <RNCanvas
                      ref={handleCanvas}
                    />
                  </ImageBackground>
              )
            }
          </View>
        )
      }
    </View>
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
  
  useImperativeHandle(ref, () => canvasMethods, [canvasMethods]);
  
  return canvasMethods;
}

export default Canvas;

interface Size {
  height: number,
  width: number
}
