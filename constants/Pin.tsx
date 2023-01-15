import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Pin(props: any) {
  const { id, description, urls } = props.pin;
  const onLike = () => {};
  const [ration, setRation] = useState(1);
  const navigation = useNavigation();
  const goToPinPage = () => {
    navigation.navigate("Pin", { pin: props.pin });
  };
  useEffect(() => {
    Image.getSize(urls?.full, (width, height) => setRation(width / height));
  }, [urls]);
  return (
    <Pressable onPress={goToPinPage} style={styles.pin}>
      <View>
        <Image
          source={{
            uri: urls?.full,
          }}
          style={[styles.image, { aspectRatio: ration }]}
        />
        <Pressable onPress={onLike} style={styles.heartBtn}>
          <AntDesign name="hearto" size={16} color="black" />
        </Pressable>
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {description}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
    margin: 5,
    color: "#181818",
  },
  pin: {
    width: "100%",
    padding: 5,
  },
  image: {
    width: "100%",
    borderRadius: 25,
  },
  heartBtn: {
    backgroundColor: "#D3CFD4",
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 5,
    borderRadius: 15,
  },
});
