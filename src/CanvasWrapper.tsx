import React, {
  useCallback
} from "react";
import RNCanvas from "react-native-canvas";

export default function CanvasWrapper(props: CanvasWrapperProperties) {
  const handleCanvas = useCallback((canvas: RNCanvas) => {
    if (canvas) {
      if (props.height) {
        canvas.height = props.height;
      }
      
      if (props.width) {
        canvas.width = props.width;
      }
      
      props.onCreated(canvas);
    }
  }, [props]);
  
  return (
    <RNCanvas
      ref={handleCanvas}
    />
  );
};

export type OnCreated = (canvas: RNCanvas) => void;

interface CanvasWrapperProperties {
  height?: number | undefined,
  onCreated: OnCreated,
  width?: number | undefined
};
