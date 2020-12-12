import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'react-native-elements';

const SampleImage = ({name,img,height,width}) => {
    return (
        <View style={styles.container}>
            <Text h5 style={styles.text}>{name}</Text>
            <Image
                source={{ uri: img }}
                style={{
                    height: (height) * 200 / width,
                    width: 200
                }}
                />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin:15
    },
    text: {
        textAlign:'center',
        paddingVertical: 10,
        color: '#e8e8e8',
        fontSize: 20,
        marginHorizontal:15
    }
});


export default SampleImage;