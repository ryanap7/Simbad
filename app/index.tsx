import Loader from "@/components/Loader";
import { StyleSheet, View } from "react-native";

const StartPage = () => {
  return (
    <View style={styles.page}>
      <Loader active={true} />
    </View>
  );
};

export default StartPage;

const styles = StyleSheet.create({
  page: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
