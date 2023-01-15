import { StyleSheet, Image, ScrollView, FlatList } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import Pin from "../constants/Pin";
import pins from "../assets/data/pins";
import SearchBar from "../components/SearchBar";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_IMAGES, SEARCH_IMAGES } from "../gql/Query";
import { useEffect, useState } from "react";

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [renderData, setRenderData] = useState([]);
  const [look, setLook] = useState(false);
  const QueryResult = useQuery(GET_IMAGES);
  const [getDog, { loading, error, data }] = useLazyQuery(SEARCH_IMAGES);
  const search = () => {
    console.log("search with name");

    setLook(!look);
    getDog({ variables: { search: searchPhrase } });
  };
  const [clicked, setCLicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    if (data?.search?.length > 0) {
      setRenderData(data?.search);
    } else {
      setRenderData(QueryResult?.data?.hello);
    }
  }, [look]);

  return (
    <View>
      <SearchBar
        clicked={clicked}
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        setCLicked={setCLicked}
        search={search}
      />
      <ScrollView>
        <View style={styles.container}>
          {/* <FlatList
          data={pins}
          renderItem={({ item }) => <Pin pin={item} />}
          numColumns={2}
        /> */}
          <View style={styles.column}>
            {renderData
              ?.filter((_, index) => index % 2 === 0)
              .map((pin) => (
                <Pin pin={pin} key={pin.id} />
              ))}
          </View>
          <View style={styles.column}>
            {renderData
              ?.filter((_, index) => index % 2 === 1)
              .map((pin) => (
                <Pin pin={pin} key={pin.id} />
              ))}
          </View>
        </View>
      </ScrollView>
    </View>
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
