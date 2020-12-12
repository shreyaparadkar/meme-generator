import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import AddText from '../components/AddText';
import { ScrollView } from 'react-native-gesture-handler';
import SampleImage from '../components/SampleImage';
import generateMeme from '../components/generateMeme';

class CreateMemeScreen extends Component {
    constructor() {
        super();
        this.state = {
            imgUrl:''
        }
    }

    generate = (texts) => {
        generateMeme(texts, this.props.route.params.meme.id)
            .then(res => {
                this.setState({ imgUrl: res.data.data.url })
                this.props.navigation.reset({
                    index: 0,
                    routes: [{
                        name: 'Meme',
                        params: {
                            img: this.state.imgUrl,
                            height: this.props.route.params.meme.height,
                            width: this.props.route.params.meme.width,
                            name: this.props.route.params.meme.name,
                            id:'create'
                        },
                    }]
                })
            })
        .catch(err=>console.log(err))
    }

    
    render() {
        const { route } = this.props;
        return (
            <ScrollView style={styles.container}>
                <SampleImage
                name={route.params.meme.name}
                img={route.params.sampleImg }
                height={route.params.meme.height}
                width={route.params.meme.width}
                />
                <AddText generate={this.generate} boxes={route.params.meme.box_count} />
            </ScrollView> 
        ); 
    }
    
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#495464",
        height: Dimensions.get('window').height,
    }
});


export default CreateMemeScreen;