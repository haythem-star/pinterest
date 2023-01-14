import { StyleSheet, Image, ScrollView, FlatList } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import Pin from "../constants/Pin";
import pins from "../assets/data/pins";

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <FlatList
          data={pins}
          renderItem={({ item }) => <Pin pin={item} />}
          numColumns={2}
        /> */}
        <View style={styles.column}>
          {pins
            .filter((_, index) => index % 2 === 0)
            .map((pin) => (
              <Pin pin={pin} key={pin.id} />
            ))}
        </View>
        <View style={styles.column}>
          {pins
            .filter((_, index) => index % 2 === 1)
            .map((pin) => (
              <Pin pin={pin} key={pin.id} />
            ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
  },
  column: {
    flex: 1,
  },
});