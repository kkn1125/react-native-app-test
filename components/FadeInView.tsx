import { sleep } from "@/util/sleep";
import { PropsWithChildren, useEffect, useRef } from "react";
import { Animated, ViewStyle } from "react-native";

type FadeInViewProps = PropsWithChildren<{
  style: ViewStyle;
  duration: number;
  term: number;
}>;

const FadeInView: React.FC<FadeInViewProps> = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    async function animate() {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: (props.duration || 1) * 1000,
        useNativeDriver: true,
      }).start();

      // await sleep(props.term);

      // setTimeout(() => {
      //   Animated.timing(fadeAnim, {
      //     toValue: 0,
      //     duration: props.duration * 1000,
      //     useNativeDriver: false,
      //   }).start();
      // }, props.duration * 1000);
    }
    animate();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

export default FadeInView;
