import React from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity} from 'react-native';


const TemplateItem = ({meme,onSelectMeme,navigation})=>{
    return (
    <TouchableOpacity
        onPress={()=>onSelectMeme(meme,navigation)}>
        <View style={styles.container}>
          <Image
              source={{ uri: meme.url }}
              style={styles.img}
          />
          <Text style={styles.text}>{meme.name}</Text>
      </View>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        margin:7,
        height: 210,
        backgroundColor: '#060930',
        borderRadius: 100 / 8,
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        width: 170,
        textAlign: 'center',
        paddingTop: 7,
        color:'#f4f4f2'
    },
    img: {
        width: 170,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 100 / 8,
        borderTopRightRadius:100/8
    }
});

export default TemplateItem;