import {
  FlatList,
  SafeAreaView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ImageBlock from "./components/imageBlock";
import axios from "axios";
import { useState, useEffect } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUsers = () => {
    setRefreshing(true);
    axios
      .get("https://random-data-api.com/api/v2/users?size=10")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((e) => {
        console.error("Error fetching data: ", e.message, e);
      })
      .finally(() => setRefreshing(false));
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const userCard = ({ item }) => (
    <View style={styles.userCardS}>
      <View style={styles.userName}>
        <Text style={styles.name}>{item.first_name}</Text>
        <Text style={styles.name}>{item.last_name}</Text>
      </View>
      <ImageBlock source={item.avatar} />
    </View>
  );

  const keyExtractor = (item) => item.id;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome To The User List</Text>
      <FlatList
        data={users}
        renderItem={userCard}
        keyExtractor={keyExtractor}
        style={styles.userListStyle}
        refreshing={refreshing}
        onRefresh={fetchUsers}
      />
      <Pressable
        style={styles.buttonStyle}
        onPress={() => {
          axios
            .get("https://random-data-api.com/api/v2/users")
            .then((response) => {
              setUsers((prevUsers) => [...prevUsers, response.data]);
            })
            .catch((e) => {
              console.error(e.message);
            });
        }}
      >
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: { marginTop: 60, fontSize: 25, paddingLeft: 10 },
  name: {
    fontSize: 20,
    fontFamily: "Roboto",
    color: "Green",
  },
  userListStyle: {
    marginTop: 30,
    flex: 1,
  },
  userCardS: {
    paddingVertical: 10,
    flexDirection: "row",
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
  },
  userName: {
    flex: 1,
    paddingLeft: 15,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 50,
    color: "white",
    textAlign: "center",
  },
  buttonStyle: {
    position: "absolute",
    bottom: 30,
    right: 30,
    borderRadius: 50,
    backgroundColor: "green",
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
});
