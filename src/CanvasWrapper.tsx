import React, {
  useCallback
} from "react";
import RNCanvas, {
  CanvasRenderingContext2D
} from "react-native-canvas";

export default function CanvasWrapper(props: CanvasWrapperProperties) {
  const handleCanvas = useCallback(canvas => {
    props.canvasRef.current = canvas;
    
    if (!canvas) {
      props.context2dRef.current = null;
    } else {
      ["height", "width"].forEach(name => {
        if (props.hasOwnProperty(name)) {
          canvas[name] = props[name];
        }
      });
      
      props.context2dRef.current = canvas.getContext("2d");
      props.context2dRef.current.fillRect(0, 0, canvas.width, canvas.height);
      
      if (props["onCreated"]) {
        props["onCreated"](
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

interface CanvasWrapperProperties {
  canvasRef: React.MutableRefObject <RNCanvas>,
  context2dRef: React.MutableRefObject <CanvasRenderingContext2D>
}
