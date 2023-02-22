import {
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    View,
    Animated,
    Text,
    PanResponder,
    StatusBar,
    Image
} from "react-native";
import Video from "react-native-video";
import {useRef, useState} from "react";
import {TouchableIcon} from "../../components/TouchIcon";
import Thumbnail from "./../../../assets/resources/thumbnail.jpg";
import ChannelIcon from "./../../../assets/icon.png"
import {PlaylistVideo} from "../../components/PlaylistVideo";


export const VideoPlayer = ({navigation}) => {
    const {width, height: screenHeight} = Dimensions.get('window')
    const videoHeight = width * 0.5625;
    const [y, setY] = useState(0)
    const VideoUrl = 'http://house-cloudfront.ap-northeast-1.prod.boltdns.net/media/v1/pmp4/static/clear/6054371505001/3a4868ba-1b3b-4176-9466-ce19e30f97ae/d58773f6-3997-4e22-90a2-b8d0f4da950e/main.mp4?Key-Pair-Id=APKAINLZLPQXMZG2IC5A&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKi8vaG91c2UtY2xvdWRmcm9udC5hcC1ub3J0aGVhc3QtMS5wcm9kLmJvbHRkbnMubmV0L21lZGlhL3YxL3BtcDQvc3RhdGljL2NsZWFyLzYwNTQzNzE1MDUwMDEvM2E0ODY4YmEtMWIzYi00MTc2LTk0NjYtY2UxOWUzMGY5N2FlL2Q1ODc3M2Y2LTM5OTctNGUyMi05MGEyLWI4ZDBmNGRhOTUwZS9tYWluLm1wNCoiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2NzcwODA5OTF9fX1dfQ__&Signature=GQrZ-QbRBGIa7YEwgcM5J3hinFjrb-XUFWCpHJlTMUhUy3GqVnZIA1HgTTcqP4uMW1oropoSoysblNfPphdrDisd3NVQFIneGGYUp9uMvR663cSecrzv9JQKhyIHDXT10dkoRWmIXdLaN8AoskKM~xlLHuOZCPUt8cyHvaAvNVM1KyPq~9dQkLRWDsH9o792kC1Aqa7ofvFvqO2Op9ztNnXvX1l7XueJAg22w6l7NdsmZ5GX3ngRSUNE4yAbsOJ9x~-SFEwqO~6JfP60wdyFiyk12YBe~lNKYvgBLFdwvN5NPYHzDSxqB8qS8BPUCIGPp3YHu0pa3h62Hqm-J8Q2-g__'
    const handleOpen = () => {
        _animation.setOffset(0);
        Animated.timing(_animation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false
        }).start();
    }
    const _animation = useRef(new Animated.Value(0)).current
    _animation.addListener(({value}) => {
        setY(value)
    })
    const panResponder = useRef(new PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
            null,
            {
                dy: _animation,
            },

        ], {useNativeDriver: false}),
        onPanResponderRelease: (e, gestureState) => {
            if (gestureState.dy > 100) {
                Animated.timing(_animation, {
                    toValue: 300,
                    duration: 200,
                    useNativeDriver: false
                }).start();
                _animation.setOffset(300);
            } else {
                _animation.setOffset(0);
                Animated.timing(_animation, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false
                }).start();
            }
        },
    })).current
    const padding = 15;
    const statusBarHeight = StatusBar.currentHeight || 0;
    const yOutput = ((screenHeight - videoHeight) + ((videoHeight * .5) / 2)) - padding - statusBarHeight;
    const xOutput = ((width * .5) / 2) - padding;

    const opacityInterpolate = _animation.interpolate({
        inputRange: [0, 300],
        outputRange: [1, 0],
    });

    const translateYInterpolate = _animation.interpolate({
        inputRange: [0, 300],
        outputRange: [0, yOutput],
        extrapolate: "clamp",
    });

    const scaleInterpolate = _animation.interpolate({
        inputRange: [0, 300],
        outputRange: [1, 0.5],
        extrapolate: "clamp"
    });

    const translateXInterpolate = _animation.interpolate({
        inputRange: [0, 300],
        outputRange: [0, xOutput],
        extrapolate: "clamp",
    });

    const scrollStyles = {
        opacity: opacityInterpolate,
        transform: [
            {
                translateY: translateYInterpolate,
            },
        ],
    };

    const videoStyles = {
        transform: [
            {
                translateY: translateYInterpolate,
            },
            {
                translateX: translateXInterpolate,
            },
            {
                scale: scaleInterpolate,
            },
        ],
    };
    const player = useRef(null)
    return (
            <View style={StyleSheet.absoluteFill}>
                <Animated.View style={[{width, height: videoHeight, ...videoStyles}]} {...panResponder.panHandlers}>
                    <Video
                        allowsExternalPlayback={true}
                        onPictureInPictureStatusChanged={(status) => {
                        console.log(status)
                    }}
                        automaticallyWaitsToMinimizeStalling={true}
                        pictureInPicture={true}
                        playWhenInactive={true}
                        playInBackground={true}
                        style={StyleSheet.absoluteFill}
                        source={{uri: VideoUrl}}
                        resizeMode={"contain"}
                        onError={(e)=>{
                            alert(e)
                        }}
                        controls={true}

                    />
                </Animated.View>
                <Animated.ScrollView style={[styles.scrollView, scrollStyles]}>
                    <View style={styles.padding}>
                        <Text style={styles.title}>Beautiful DJ Mixing Lights</Text>
                        <Text>1M Views</Text>
                        <View style={styles.likeRow}>
                            <TouchableIcon name="thumb-up">10,000</TouchableIcon>
                            <TouchableIcon name="thumb-down">3</TouchableIcon>
                            <TouchableIcon name="share">Share</TouchableIcon>
                            <TouchableIcon name="download">Save</TouchableIcon>
                            <TouchableIcon name="plus">Add to</TouchableIcon>
                        </View>
                    </View>

                    <View style={[styles.channelInfo, styles.padding]}>
                        <Image
                            source={ChannelIcon}
                            style={styles.channelIcon}
                            resizeMode="contain"
                        />
                        <View style={styles.channelText}>
                            <Text style={styles.channelTitle}>Prerecorded MP3s</Text>
                            <Text>1M Subscribers</Text>
                        </View>
                    </View>

                    <View style={[styles.playlist, styles.padding]}>
                        <Text style={styles.playlistUpNext}>Up next</Text>
                        <PlaylistVideo
                            image={Thumbnail}
                            name="Next Sweet DJ Video"
                            channel="Prerecorded MP3s"
                            views="380K"
                        />
                        <PlaylistVideo
                            image={Thumbnail}
                            name="Next Sweet DJ Video"
                            channel="Prerecorded MP3s"
                            views="380K"
                        />
                        <PlaylistVideo
                            image={Thumbnail}
                            name="Next Sweet DJ Video"
                            channel="Prerecorded MP3s"
                            views="380K"
                        />
                        <PlaylistVideo
                            image={Thumbnail}
                            name="Next Sweet DJ Video"
                            channel="Prerecorded MP3s"
                            views="380K"
                        />
                        <PlaylistVideo
                            image={Thumbnail}
                            name="Next Sweet DJ Video"
                            channel="Prerecorded MP3s"
                            views="380K"
                        />
                        <PlaylistVideo
                            image={Thumbnail}
                            name="Next Sweet DJ Video"
                            channel="Prerecorded MP3s"
                            views="380K"
                        />
                        <PlaylistVideo
                            image={Thumbnail}
                            name="Next Sweet DJ Video"
                            channel="Prerecorded MP3s"
                            views="380K"
                        />
                    </View>
                </Animated.ScrollView>
            </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    scrollView: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    title: {
        fontSize: 28,
    },
    likeRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 15,
    },
    touchIcon: {
        alignItems: "center",
        justifyContent: "center",
    },
    iconText: {
        marginTop: 5,
    },
    padding: {
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    channelInfo: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#DDD",
        borderTopWidth: 1,
        borderTopColor: "#DDD",
    },
    channelIcon: {
        width: 50,
        height: 50,
    },
    channelText: {
        marginLeft: 15,
    },
    channelTitle: {
        fontSize: 18,
        marginBottom: 5,
    }
});