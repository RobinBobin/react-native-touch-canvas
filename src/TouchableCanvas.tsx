import React, {
  forwardRef
} from "react";
import CanvasContainer from "./CanvasContainer";
import CanvasMethods from "./CanvasMethods";
import CanvasProperties from "./CanvasProperties";

const TouchableCanvas = forwardRef <CanvasMethods, CanvasProperties> ((props, ref) => {
  return (
    <CanvasContainer
      { ...props }
      ref={ref}
    />
  );
});

export default TouchableCanvas;
