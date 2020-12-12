import React,{Component} from 'react';
import {StyleSheet} from 'react-native';
import { Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import AddText from '../components/AddText';
import generateMeme from '../components/generateMeme';

class RandomScreen extends Component{
    state = {
        loading:false,
        imgUrl: '',
        height: 0,
        width: 0,
        name:''
    }

    getRandomInt = () => {
        let max = this.props.route.params.memes.length
        return Math.floor(Math.random() * Math.floor(max));
      }

    generate = (texts) => {
        let id = this.getRandomInt()
        this.setState({
            height: this.props.route.params.memes[id].height,
            width:this.props.route.params.memes[id].width,
            name:this.props.route.params.memes[id].name,
        })
        generateMeme(texts, this.props.route.params.memes[id].id)
            .then(res => {
                this.setState({ imgUrl: res.data.data.url })
                this.props.navigation.navigate('Meme',
                    {
                        img: this.state.imgUrl,
                        height: this.state.height,
                        width: this.state.width,
                        name: this.state.name,
                        id:'random'
                })
            })
        .catch(err=>console.log(err))
    }

    render() {
        const { navigation, route } = this.props;
        return (
            <ScrollView style={styles.container}>
                <Text h5 style={styles.text}>Enter text input to generate a random meme!</Text>  
                <AddText generate={this.generate} boxes={2} />
            </ScrollView>
        );
    }
    
}

const styles = StyleSheet.create({
    text: {
        color: '#f4f4f2',
        textAlign: 'center',
        paddingVertical: 35,
        fontSize: 18,
        marginHorizontal:30
    },
    container: {
        backgroundColor: "#495464",
    }
});

export default RandomScreen;