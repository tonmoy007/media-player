import TrackPlayer, {useActiveTrack} from "react-native-track-player";
import {useEffect, useState} from "react";
import {SetupService} from "../../service/SetupService";
import {QueueInitialTracksService} from "../../service/QueueInitialTracksService";
import {ActivityIndicator, Linking, SafeAreaView, StyleSheet, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Button, PlayerControls, Progress, TrackInfo} from "../../components";

export const AudioTrackPlayer=()=>{
    const track = useActiveTrack();
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    useEffect(() => {
        let unmounted = false;
        (async () => {
            const isSetup = await SetupService();
            if (unmounted) return;
            setIsPlayerReady(isSetup);
            const queue = await TrackPlayer.getQueue();
            if (unmounted) return;
            if (isSetup && queue.length <= 0) {
                await QueueInitialTracksService();
            }
        })();
        return () => {
            unmounted = true;
        };
    }, []);
    useEffect(() => {
        function deepLinkHandler(data) {
            console.log('deepLinkHandler', data.url);
        }

        // This event will be fired when the app is already open and the notification is clicked
        Linking.addEventListener('url', deepLinkHandler);

        // When you launch the closed app from the notification or any other link
        Linking.getInitialURL().then((url) => console.log('getInitialURL', url));

        return () => {
            Linking.removeAllListeners('url');
        };
    }, []);
    if (!isPlayerReady) {
        return (
            <SafeAreaView style={styles.screenContainer}>
                <ActivityIndicator />
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView style={styles.screenContainer}>
            <StatusBar barStyle={'light-content'} />
            <View style={styles.contentContainer}>
                <View style={styles.topBarContainer}>
                    <Button
                        title="Queue"
                        onPress={() => console.log('TODO: implement queue interface')}
                        type="primary"
                    />
                </View>
                <TrackInfo track={track} />
                <Progress live={track?.isLiveStream} />
            </View>
            <View style={styles.actionRowContainer}>
                <PlayerControls />
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#212121',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 3,
        alignItems: 'center',
    },
    topBarContainer: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
    },
    actionRowContainer: {
        flex: 1,
        flexDirection: 'row',
    },
});