import {Button, SafeAreaView, View} from "react-native";

export const Dashboard = ({navigation}) => {
    return <SafeAreaView style={{flex: 1}}>
        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            <View style={{flexDirection:"row"}}>
                <Button title={"Audio"}  onPress={()=>{
                    navigation.navigate("Audio")
                }
                }/>
                <View style={{width:10}}/>
                <Button title={"Video"} onPress={()=>{
                    navigation.navigate("Video")
                }
                }/>
            </View>
        </View>
    </SafeAreaView>
}