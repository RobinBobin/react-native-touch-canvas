import React, {
  forwardRef,
  useCallback,
  useState
} from "react";
import {
  LayoutChangeEvent,
  View
} from "react-native";
import CanvasWrapper from "./CanvasWrapper";
import CanvasProperties from "./properties/CanvasProperties";
import CanvasRefs from "./properties/CanvasRefs";

const CanvasWrapperContainer = forwardRef((props: CanvasProperties & CanvasRefs, ref) => {
  const containerOnLayout = useCallback(({nativeEvent}: LayoutChangeEvent) => {
    if (props.style) {
      setCanvas(getCanvas(nativeEvent.layout.height, nativeEvent.layout.width));
    }
  }, []);
  
  const getCanvas = useCallback((height?: number, width?: number) => {
    return (
      (!props.backgroundImage && !props.style)
      || (height && width)
      ?
        <CanvasWrapper
          canvasRef={props.canvasRef}
          context2dRef={props.context2dRef}
          onCreated={props.onCreated}
          height={height}
          width={width}
        />
      :
      null
    );
  }, [props]);
  
  const [canvas, setCanvas] = useState(getCanvas);
  
  return (
    <View
      onLayout={containerOnLayout}
      pointerEvents={"none"}
      style={props.style}
    >
      { canvas }
    </View>
  );
});

export default CanvasWrapperContainer;
