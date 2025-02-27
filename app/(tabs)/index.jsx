import { Text, View } from "react-native";
import { getUsers } from "../lib/userServices";
import TestComponent from "../components/testFunctions";
import UpdateCommentForm from "../components/updateCommentForm";
import AddCommentForm from "../components/addCommentForm";
import AddSuggestionForm from "../components/addSuggestionForm";


export default function Index() {
  getUsers();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>ShareTrip !</Text>
    </View>
  );
}