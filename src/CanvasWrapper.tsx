import React, {
  useCallback
} from "react";
import RNCanvas from "react-native-canvas";
import CanvasAndCanvasWrapperProperties from "./properties/CanvasAndCanvasWrapperProperties";
import CanvasRefs from "./properties/CanvasRefs";

export default function CanvasWrapper(props: CanvasWrapperProperties) {
  const handleCanvas = useCallback((canvas: RNCanvas) => {
    props.canvasRef.current = canvas;
    
    if (!canvas) {
      props.context2dRef.current = null;
    } else {
      if (props.height) {
        canvas.height = props.height;
      }
      
      if (props.width) {
        canvas.width = props.width;
      }
      
      props.context2dRef.current = canvas.getContext("2d");
      props.context2dRef.current.fillRect(0, 0, canvas.width, canvas.height);
      
      if (props.onCreated) {
        props.onCreated(
          props.context2dRef.current,
          props.canvasRef.current
        );
      }
    }
  }, [props]);
  
  return (
    <RNCanvas
      ref={handleCanvas}
    />
  );
};

interface CanvasWrapperProperties extends
  CanvasAndCanvasWrapperProperties,
  CanvasRefs
{
  height?: number | undefined,
  width?: number | undefined
};
