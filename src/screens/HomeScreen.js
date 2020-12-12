import React, { Component } from 'react';
import { StyleSheet,View} from 'react-native';
import { Dimensions } from 'react-native';
import { Button,  Text, Image } from 'react-native-elements';
import axios from 'axios';


class HomeScreen extends Component{
    state = {
        memes:[]
    }

    componentDidMount = () => {
        axios.get('https://api.imgflip.com/get_memes')
        .then(res => {
            var temp = [];
            res.data.data.memes.forEach(meme => {
                if (meme.box_count <= 2) {
                    temp.push(meme)
                }
            });
            this.state.memes = temp;
        })
        .catch()
    }

    onBtnPress = (route) => {
        this.props.navigation.navigate(route, {
            memes:this.state.memes
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text h5 style={styles.text}>Create memes from your
                favorite template or try the random meme generator!
                </Text>
                <Image
                source={{uri:"https://i.imgflip.com/4kyyfu.jpg"}}
                style={{ height: (414) * 360 / 552,
                        width: 360
                    }}
                />
                <View style={styles.btnContainer}>
                    <Button
                        title="From template"
                        buttonStyle={styles.btn}
                        onPress={() => this.onBtnPress('Templates')}/>
                    <Button 
                        title="Random memes"
                        buttonStyle={styles.btn}
                        onPress={() =>this.onBtnPress('Random')}/>
                </View>
            </View>      
        );
    }
    
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#495464",
        height: Dimensions.get('window').height,    
        alignItems: 'center',
        paddingTop: 20,
        flex: 1,
        justifyContent:'flex-start'
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems:"center"
    },
    btn: {
        paddingVertical:10,
        backgroundColor: '#060930',
        paddingHorizontal: 20,
        margin: 15,
        marginTop:20,
        borderRadius:100/4
        // color:'#000'
    },
    text: {
        textAlign: 'center',
        color: "#f4f4f2",
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginBottom:15,
        fontSize:20
    }
});

export default HomeScreen;