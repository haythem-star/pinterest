import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";

import pins from "../assets/data/pins";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function PinScreen() {
  const [pin, setPin] = useState({});
  const [ration, setRation] = useState(1);
  const navigation = useNavigation();
  const goBack = () => {
    navigation.navigate("Root");
  };
  const insets = useSafeAreaInsets();
  const route = useRoute();
  useEffect(() => {
    if (route.params?.id) {
      const pinId = route.params?.id;
      const routePin = pins.find((p) => p?.id === pinId);
      setPin(routePin);
      Image.getSize(routePin?.image, (width, height) =>
        setRation(width / height)
      );
    }
  }, [route]);
  if (!pin?.id) {
    return <Text>Pin not found</Text>;
  }
  return (
    <SafeAreaView style={{ backgroundColor: "black" }}>
      <StatusBar style="light" />
      <ScrollView>
        <View style={styles.root}>
          <Image
            source={{
              uri: pin.image,
            }}
            style={[styles.image, { aspectRatio: ration }]}
          />
          <View style={styles.author}>
            <Image
              source={{
                uri: pin.image,
              }}
              style={styles.profilePicture}
            />
            <Text style={styles.title} numberOfLines={2}>
              {pin.title}
            </Text>
          </View>
        </View>
      </ScrollView>

      <Pressable
        onPress={goBack}
        style={[styles.backBtn, { top: insets.top + 20 }]}
      >
        <Ionicons name={"chevron-back"} size={35} color={"white"} />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    height: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  image: {
    width: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  title: {
    padding: 10,
    fontSize: 15,
    fontWeight: "300",
    // textAlign: "center",
    lineHeight: 15,
    // flex: 1,
    maxWidth: "90%",
  },
  backBtn: {
    position: "absolute",
    left: 10,
  },
  author: {
    // flex: 1,
    // justifyContent: "space-between",
    padding: 15,
    flexDirection: "row",
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
    // flex: 1,
  },
});
