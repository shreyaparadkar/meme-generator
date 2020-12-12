import React from 'react';
import Meme from '../components/Meme';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';

const MemeScreen = ({ navigation,route }) => {
    const { img, height, width, name, id } = route.params
    return (
        <ScrollView style={styles.container}>
                <Meme
                imgUrl={img}
                height={height}
                width={width}
                name={name}
                navigation={navigation}
                />
                {
                    id == 'random' ?
                        <Button
                        buttonStyle={styles.btn}
                        icon={
                            <Icon
                                size={20}
                                color='white'
                                name='refresh'
                                type='font-awesome'
                                iconStyle={styles.icon}
                            />
                        }
                        title="Retry"
                        onPress={() => navigation.goBack()}
                        />
                    :null
                }

         </ScrollView>        
    );
}

const styles = StyleSheet.create({
    container: { 
        backgroundColor: '#495464',
        paddingTop: 10,
        flex: 1,
    },
    btn: {
        width:180,
        backgroundColor: '#060930',
        borderRadius: 100 / 4,
        height: 45,
        alignSelf:'center'
        
    },
    icon: {
        paddingRight: 15,
    }
});

export default MemeScreen;