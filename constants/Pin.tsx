import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";

export default function Pin(props: any) {
  const { title, image } = props.pin;
  const onLike = () => {};
  const [ration, setRation] = useState(1);
  useEffect(() => {
    Image.getSize(image, (width, height) => setRation(width / height));
  }, [image]);
  return (
    <View style={styles.pin}>
      <View>
        <Image
          source={{
            uri: image,
          }}
          style={[styles.image, { aspectRatio: ration }]}
        />
        <Pressable onPress={onLike} style={styles.heartBtn}>
          <AntDesign name="hearto" size={16} color="black" />
        </Pressable>
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </View>
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