import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const EventToggle = ({ route, navigation }) => {
  const [data, setData] = useState();
  const [isList, setIsList] = useState(true);

  const detailData = async () => {
    try {
      const response = await fetch(`${route.params.item["data"]}`);
      const myData = await response.json();
      setData(myData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    detailData();
  }, []);

  useEffect(() => {}, [data]);

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>Loading....</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.topbar}>
          <Text style={styles.head}> Event Details</Text>
        </View>
        <View style={styles.toggle}>
          {isList == true ? (
            <TouchableOpacity onPress={() => setIsList(false)}>
              <View>
                <Text style={styles.btn}>List View</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setIsList(true)}>
              <View>
                <Text style={styles.btn}>Grid View</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        {isList == false && (
          <FlatList
            data={data.item}
            renderItem={({ item }) => {
              return (
                <>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Web", { item })}
                  >
                    <View style={styles.cardG}>
                      <Text style={styles.titleG}>{item.eventname}</Text>

                      <Text style={styles.addG}>
                        Venue : {item.venue.full_address}
                      </Text>
                      <View>
                        <Text style={styles.timeG}>
                          Starting: {item.start_time_display}
                        </Text>
                        <Text style={styles.timeG}>
                          Ending: {item.end_time_display}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              );
            }}
            numColumns={2}
            vertical={false}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
        {isList == true && (
          <FlatList
            data={data.item}
            renderItem={({ item }) => {
              return (
                <>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Web", { item })}
                  >
                    <View style={styles.card}>
                      <Text style={styles.title}>{item.eventname}</Text>
                      <Text style={styles.add}>
                        Venue : {item.venue.full_address}
                      </Text>
                      <View>
                        <Text style={styles.time}>
                          Starting: {item.start_time_display}
                        </Text>
                        <Text style={styles.time}>
                          Ending: {item.end_time_display}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              );
            }}
            vertical={false}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 40,
    backgroundColor: "#F9F9F9",
  },
  head: {
    height: 40,
    width: "100%",
    backgroundColor: "#25316D",
    color: "white",
    fontSize: 30,
    textAlign: "center",
    top: 0,
  },
  topbar: {
    width: "100%",
    flexDirection: "row",
  },
  card: {
    height: "fitcontent",
    fontSize: 20,
    margin: 15,
    padding: 10,
    backgroundColor: "#EBC7E8",
    borderRadius: 10,
    borderColor: "#790252",
    borderStyle: "solid",
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
    fontWeight: 500,
  },
  add: {
    marginBottom: 10,
    fontSize: 20,
  },
  cardG: {
    height: 300,
    width: 180,
    fontSize: 15,
    margin: 10,
    padding: 10,
    backgroundColor: "#EBC7E8",
    borderRadius: 10,
    borderColor: "#790252",
    borderStyle: "solid",
  },
  addG: {
    marginBottom: 10,
    fontSize: 13,
  },
  time: {
    fontSize: 13,
  },
  timeG: {
    fontSize: 10,
  },
  titleG: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 500,
  },
  btn: {
    fontSize: 15,
    color: "white",
  },
  toggle: {
    width: "25%",
    height: "fitcontent",
    padding: 5,
    margin: 5,
    marginLeft: 280,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "purple",
    borderRadius: 3,
  },
});
export default EventToggle;
