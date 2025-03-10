import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import ProjectList from "../components/projectList";
import Project from "../components/project";

export default function Index() {
  const [fontsLoaded] = useFonts({
    'Knewave-Regular': require('/Users/laura/Desktop/ShareTrip/ShareTrip/assets/fonts/Knewave-Regular.ttf'),
    'LilitaOne-Regular': require('/Users/laura/Desktop/ShareTrip/ShareTrip/assets/fonts/LilitaOne-Regular.ttf'),
    'Convergence-Regular': require('/Users/laura/Desktop/ShareTrip/ShareTrip/assets/fonts/Convergence-Regular.ttf'),
  });
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={require('/Users/laura/Desktop/ShareTrip/ShareTrip/assets/images/ShareTripLogo.png')} style={styles.image} />
        <Text style={styles.shareTrip}>ShareTrip</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
      </ScrollView>
      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Créer un projet</Text>
      </TouchableOpacity>
    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 0,
    backgroundColor: '#DAE7FF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50,
    marginBottom: 0,
  },
  image: {
    width: 84,
    height: 49,
    alignSelf: 'center',
  },
  shareTrip: {
    color: '#5A439A',
    fontFamily: 'Knewave-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 36,
    marginLeft: 20,
  },
  content: {
    flex: 1,
    marginTop: 20,
    paddingBottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#DAE7FF',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'LilitaOne-Regular',
    fontSize: 36,
    color: '#5A439A',
    marginBottom: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  label: {
    color: '#5A439A',
    fontFamily: 'LilitaOne-Regular',
    fontSize: 20,
    marginLeft: 30,
    marginBottom: 5,
    marginTop: 10,
  },
  info: {
    color: '#000000',
    fontFamily: 'Convergence-Regular',
    fontSize: 18,
    marginLeft: 30,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#5A439A',
    justifyContent: 'center',
    borderRadius: 60,
    marginBottom: 22,
    marginTop: 20,
    width: 360,
    height: 60,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'LilitaOne-Regular',
    fontSize: 36,
    textAlign: 'center',
    alignSelf: 'center',
  },

});
