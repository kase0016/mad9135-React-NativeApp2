import { StyleSheet, Image } from "react-native";

export default function ImageBlock({ placeholderImageSource }) {
  return <Image source={placeholderImageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 75,
    height: 75,
    borderRadius: 18,
    marginRight: 15,
    backgroundColor: "#d3d3d3",
    display: "flex",
    alignSelf: "center",
  },
});
