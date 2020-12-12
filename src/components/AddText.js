import React, { Component } from 'react';
import { View,  StyleSheet, Alert} from 'react-native';
import { Input, Button } from 'react-native-elements';

class AddText extends Component {
    constructor() {
        super();
        this.state = {
            text0: '',
            text1: '',
            text2: '',
            text3:''
        }
    }

    handleText = (name,text) => {
        this.setState({[name]:text})
    }
   

    render() {
        const { generate, boxes } = this.props;
        var inputs = []
        for (let i = 0; i < boxes; i++) {
            inputs.push(
                <Input
                    placeholder={`Text ${i}`}
                    onChangeText={(txt)=>this.handleText(`text${i}`,txt)}
                    name={`text${i}`} style={styles.input}
                    key={i}
                    onSubmitEditing={() => {
                        if (i == 1) {
                            generate(this.state)
                        }
                    }}
                />
            )        
        }        
        
        return (
            <View style={styles.container}>
                {inputs}
                <Button buttonStyle={styles.btn}
                    title="Create meme!"
                    onPress={() => {
                        if (!this.state.text0 && !this.state.text1) {
                            Alert.alert("Oops!",'You need to enter alteast one input to generate the meme')
                        }
                        else {
                            generate(this.state)
                        }
                        
                    }
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 25,
        marginTop: 8,
        flex:1,
        alignItems:'center'
    },
    input:{
        height:30,
        padding:8,
        fontSize: 18,
        color:'#f4f4f2'
    },
    btn: {
        width:180,
        backgroundColor: '#060930',
        borderRadius: 100 / 4,
        height:45
    }
});

export default AddText;