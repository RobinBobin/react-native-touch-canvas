import {
  ImageSourcePropType,
  StyleProp,
  ViewStyle
} from "react-native";
import CanvasMethods from "../CanvasMethods";

// export interface BackgroundImageProperties {
//   Component?: typeof React.Component | undefined,
//   props: { [key: string]: any }
// };

export default interface CanvasProperties {
  backgroundImage?: /*BackgroundImageProperties |*/ ImageSourcePropType,
  containerStyle?: StyleProp <ViewStyle> | undefined,
  onCreated?: (canvas: CanvasMethods) => void,
  style?: StyleProp <ViewStyle> | undefined
};
