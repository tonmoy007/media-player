import {NavigationContainer} from "@react-navigation/native";
import {Dashboard} from "./src/screens/dashboard";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AudioTrackPlayer} from "./src/screens/players/audio-track-player";
import {VideoPlayer} from "./src/screens/players/video-player";
import {RootSiblingParent} from "react-native-root-siblings";

const Stack = createNativeStackNavigator()
export default function App() {
    return (
        <RootSiblingParent>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name={"Home"} component={Dashboard}/>
                    <Stack.Screen name={"Audio"} component={AudioTrackPlayer} options={{headerShown: false}}/>
                    <Stack.Screen name={"Video"} component={VideoPlayer} options={{headerShown: true}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </RootSiblingParent>
    )
}


