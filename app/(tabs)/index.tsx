import {
  Button,
  Dimensions,
  FlatList,
  GestureResponderEvent,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { api } from "@/apis/api";
import FadeInView from "@/components/FadeInView";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Portal } from "@mui/material";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";

const duration = 1;
const term = 2;

export default function HomeScreen() {
  const [version, setVersion] = useState("");
  const [userList, setUserList] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const { width, height } = Dimensions.get("window"); // 화면 크기 가져오기

  const onPressUserList = async (e: GestureResponderEvent) => {
    const { data } = (await api.get(`/web/users`, {
      params: {
        page: "1",
        perPage: "10",
        sortKey: "created_at",
        sortDir: "true",
        category: "id",
        text: "1",
      },
    })) as {
      data: any;
    };
    console.log(data);
    setUserList(data.data.list);
    setOpen(true);

    setTimeout(() => {
      setOpen(false);
      setUserList([]);
    }, (duration * 2 + term) * 1000);
  };

  const onPressFunction = async (e: GestureResponderEvent) => {
    const { data } = (await api.get(`/health`)) as {
      data: { version: string };
    };
    console.log(data);
    setVersion(data.version);
    setOpen(true);

    setTimeout(() => {
      setOpen(false);
      setVersion("");
    }, (duration * 2 + term) * 1000);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }>
      {/* <embed
        src='https://kkn1125.github.io/new-solitaire/'
        type='text/html'
        width={800}
        height={900}
      /> */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title'>Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView>
        <ThemedText>요청보내기</ThemedText>
        <CustomButton title='리스트 조회' onPress={onPressUserList} />
      </ThemedView>
      <ThemedView>
        <ThemedText>요청보내기</ThemedText>
        <CustomButton title='test' onPress={onPressFunction} />
      </ThemedView>
      {open && (
        <Modal
          transparent={true}
          visible={open}
          animationType='fade'
          onRequestClose={() => setOpen(false)}>
          {version ? (
            <View style={{ ...styles.overlay }}>
              <View style={[styles.popup]}>
                <Text>hi, version is {version}</Text>
                <Button title='Close' onPress={() => setOpen(false)} />
              </View>
            </View>
          ) : userList ? (
            <View style={{ ...styles.overlay }}>
              <View style={[styles.popup]}>
                {userList.map((user) => (
                  <View key={user.id}>
                    <Text>{user.created_at || ""}</Text>
                  </View>
                ))}
                <Button title='Close' onPress={() => setOpen(false)} />
              </View>
            </View>
          ) : (
            <Text></Text>
          )}
        </Modal>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명한 배경
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    position: "absolute",
    flex: 1,
    // top: "50%",
    // left: "50%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5, // 그림자 효과
  },
  popupText: {
    marginBottom: 20,
    textAlign: "center",
  },
});
