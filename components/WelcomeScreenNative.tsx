import {
  View,
  ViewStyle,
  Text,
  TextStyle,
  Platform,
  Pressable,
  Image,
  ImageStyle,
} from "react-native";

const WelcomeScreenNative = ({
  width,
  height,
  containerStyle,
  contentContainerStyle,
}: any) => {
  const modalContainer: ViewStyle = {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: width,
    height: height,
    padding: 40,
    backgroundColor: "rgba(52, 52, 52, 0.9)",
  };

  const contentContainer: ViewStyle = {
    flexDirection: Platform.OS === "web" ? "row" : "column",
    width: "100%",
    height: "100%",
  };

  const leftContentContainer: ViewStyle = {
    justifyContent: "flex-end",
    width: Platform.OS === "web" ? "70%" : "100%",
    height: Platform.OS === "web" ? "100%" : "90%",
  };

  const leftContentInnerContainer: ViewStyle = {
    justifyContent: "space-between",
    width: "100%",
    height: Platform.OS === "web" ? 300 : 170,
  };

  const leftContentInnerLogoContainer: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: Platform.OS === "web" ? 300 : 260,
  };

  const rightContentContainer: ViewStyle = {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: Platform.OS === "web" ? "30%" : "100%",
    height: Platform.OS === "web" ? "100%" : "10%",
  };

  const rightButton: ViewStyle = {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.8,
    shadowColor: "black",
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    width: Platform.OS === "web" ? 200 : "100%",
    height: Platform.OS === "web" ? 50 : "60%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
  };

  const rightText: TextStyle = {
    textTransform: "uppercase",
    fontWeight: "900",
    fontFamily: "Metro",
    fontSize: Platform.OS === "web" ? 16 : 15,
  };

  const logo: ImageStyle = {
    width: Platform.OS === "web" ? 70 : 50,
    height: Platform.OS === "web" ? 70 : 50,
    borderRadius: 100,
  };

  const logoText: TextStyle = {
    color: "white",
    width: Platform.OS === "web" ? 220 : 200,
    fontSize: Platform.OS === "web" ? 25 : 20,
    lineHeight: Platform.OS === "web" ? 28 : 23,
    fontFamily: "Metro",
  };

  const middleText: TextStyle = {
    color: "white",
    fontSize: Platform.OS === "web" ? 100 : 30,
    fontWeight: "900",
    fontFamily: "Metro",
  };

  const endText: TextStyle = {
    color: "white",
    fontSize: Platform.OS === "web" ? 18 : 15,
    lineHeight: Platform.OS === "web" ? 25 : 20,
    width: Platform.OS === "web" ? 500 : "100%",
    fontFamily: "Metro",
  };

  return (
    <View style={[modalContainer, containerStyle]}>
      <View style={[contentContainer, contentContainerStyle]}>
        <View style={[leftContentContainer]}>
          <View style={[leftContentInnerContainer]}>
            <View style={[leftContentInnerLogoContainer]}>
              <Image
                style={[logo]}
                source={{
                  uri: "https://picsum.photos/200/200",
                }}
              />
              <Text style={[logoText]}>The Bicester Collection</Text>
            </View>
            <Text style={[middleText]}>VIRTUAL VOYAGE</Text>
            <Text style={[endText]}>
              Explore The Bicester Collection universe and immerse yourself in a
              360 journey of delight.
            </Text>
          </View>
        </View>
        <View style={[rightContentContainer]}>
          <Pressable style={[rightButton]}>
            <Text style={[rightText]}>Enter</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreenNative;
