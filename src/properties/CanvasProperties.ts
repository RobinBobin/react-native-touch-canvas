import React from "react";
import {
  ImageSourcePropType,
  StyleProp,
  ViewStyle
} from "react-native";

import CanvasAndCanvasWrapperProperties from "./CanvasAndCanvasWrapperProperties";

export default interface CanvasProperties extends CanvasAndCanvasWrapperProperties {
  backgroundImage?: {
    Component?: typeof React.Component | undefined,
    borderBottomWidth?: number | undefined,
    borderEndWidth?: number | undefined,
    borderStartWidth?: number | undefined,
    borderTopWidth?: number | undefined,
    borderWidth?: number | undefined,
    source: ImageSourcePropType
  },
  style?: StyleProp <ViewStyle> | undefined
};
