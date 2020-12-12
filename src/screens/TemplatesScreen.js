import React,{useState,useEffect} from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import TemplateItem from '../components/TemplateItem';
import axios from 'axios';

const onSelectMeme = (meme, navigation) => {
    var bodyFormData = new FormData();
    bodyFormData.append('template_id', meme.id)
    bodyFormData.append('username','anon1230')
    bodyFormData.append('password', 'password123')
    bodyFormData.append('text0','text 0')
    bodyFormData.append('text1','text 1')
    axios.post('https://api.imgflip.com/caption_image',
      bodyFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    )
    .then(res => {
        navigation.navigate('CreateMeme', {
            meme: meme,
            sampleImg:res.data.data.url
        })
    })
      .catch(err => console.log(err))
}


const TemplatesScreen=({route,navigation})=>{
    const { memes } = route.params;
    const [search, setSearch] = useState('');
    const [filteredMemes, setFilteredMemes] = useState(memes);
    const [loading, setLoading] = useState(false);
    const [mounted, setMount] = useState(false);

    useEffect(() => {
        if (!mounted) {
            startLoading()
            setMount(true)
        }
    });

    const startLoading = () => {
        setLoading(true);
        setTimeout(() => {
        setLoading(false);
        }, 500);
    }

    const searchFilterFunction = (text) => {
        if (text) {
          const newData = memes.filter(function (item) {
            const itemData = item.name
              ? item.name.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setFilteredMemes(newData);
          setSearch(text);
        } else {
          setFilteredMemes(memes);
          setSearch(text);
        }
    };
    
    return (
        <View style={styles.container}>
            {loading ?
                <ActivityIndicator
                    visible={loading}
                    size="large"
                    color="#060930"
                />
                :
                <>
                    <SearchBar
                        round
                        containerStyle={styles.searchbar}
                        inputContainerStyle={styles.searchbarinput}
                        inputStyle={styles.input}
                        onChangeText={(text) => searchFilterFunction(text)}
                        onClear={(text) => searchFilterFunction('')}
                        placeholder="Type Here..."
                        value={search}
                    />
                    
                    <View style={styles.grid}>
                        <FlatList
                            data={filteredMemes}
                            numColumns={2}
                            renderItem={(meme) =>
                                <TemplateItem
                                    meme={meme.item}
                                    onSelectMeme={onSelectMeme}
                                    navigation={navigation}
                                />
                            }
                        />
                    </View>
                </>   
            }
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        padding: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#495464",
    },
    grid: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: "#495464",
    },
    searchbar: {
        backgroundColor: "#495464",
        shadowColor: 'black',
        borderBottomColor:'#495464'
    },
    searchbarinput: {
        backgroundColor: "#495464",
    },
    input: {
        color:'#f4f4f2'
    }
    
});

export default TemplatesScreen;