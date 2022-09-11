import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";


const Categories = ({ navigation }) => {
  const [myEventData, setEventData] = useState();
  const [isLoad, setIsLoad] = useState(true);

  const eventData = async () => {
    try {
      const response = await fetch(
        "https://allevents.s3.amazonaws.com/tests/categories.json"
      );
      const myData = await response.json();
      setEventData(myData);
      setIsLoad(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    eventData();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bg}
        resizeMode="cover"
        source={require("../assets/bg.png")}
      >
        {isLoad ? (
          <View>
            <ActivityIndicator />
          </View>
        ) : (
          <View>
            <Text style={styles.head}>Event Categories</Text>
            <FlatList
              data={myEventData}
              renderItem={({ item }) => {
                return (
                  <>
                    <View style={styles.list}>
                      <Pressable
                        onPress={() => {
                          navigation.navigate("Toggle", {
                            item,
                          });
                        }}
                        style={styles.dataName}
                      >
                        <Text style={styles.title}>{item.category}</Text>
                      </Pressable>
                    </View>
                   
                  </>
                );
              }}
            />
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  head: {
    fontSize: 40,
    marginTop: 30,
    marginBottom: 30,
    textAlign: "center",
    color: "#2A0944",
    fontWeight: "bold",
  },
  list: {
    alignItems: "center",
    justifyContent: "center",
  },
  dataName: {
    fontSize: 30,
    color: "white",
    padding: 20,
    margin: 8,
    backgroundColor: "purple",
    borderRadius: 14,
    width: "75%",
    textAlign: "center",
  },
  title: {
    fontSize: 30,
    color: "white",
  },
});
