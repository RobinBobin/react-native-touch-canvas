import React from "react";
import {
  ImageSourcePropType
} from "react-native";
import RNCanvas, {
  CanvasRenderingContext2D
} from "react-native-canvas";

export default interface CanvasProperties {
  backgroundImage?: {
    ContainerType?: React.ReactElement,
    borderBottomWidth?: number | undefined,
    borderEndWidth?: number | undefined,
    borderStartWidth?: number | undefined,
    borderTopWidth?: number | undefined,
    borderWidth?: number | undefined,
    source: ImageSourcePropType
  },
  onCreated?: (context2d: CanvasRenderingContext2D, canvas: RNCanvas) => any | undefined,
  height?: number | string | undefined,
  width?: number | string | undefined
};
