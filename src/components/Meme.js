import React from 'react';
import { StyleSheet, View, ActivityIndicator} from 'react-native';
import { Icon, Image } from 'react-native-elements';

import ShareButton from '../components/ShareButton';

const Meme = ({ imgUrl, width, height, name, navigation }) => {

    return (
        <View style={styles.container}>
            <Image source={{ uri: imgUrl }}
            style={{
                height: (height) * 360 / width,
                width: 360
                }}
            PlaceholderContent={<ActivityIndicator color="#060930"/>}
            />
            <View style={styles.btnContainer}>
                <ShareButton style={styles.btn1} img={imgUrl} name={name} />
                <Icon
                    raised
                    name='home'
                    type='font-awesome'
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        });
                    }} />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop:30
    },
    btnContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical:15
    }
});


export default Meme;