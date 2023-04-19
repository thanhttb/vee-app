export const getFeatureViewAnimation = (animatedValue, outputX) => {
  const TRANSLATE_X_INPUT_RANGE = [0, 20];
  const translateY = {
    translateY: animatedValue.interpolate({
      inputRange: [0, 30],
      outputRange: [0, -10],
      extrapolate: "clamp",
    }),
  };
  return {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: TRANSLATE_X_INPUT_RANGE,
          outputRange: [0, outputX],
          extrapolate: "clamp",
        }),
      },
      translateY,
    ],
  };
};
