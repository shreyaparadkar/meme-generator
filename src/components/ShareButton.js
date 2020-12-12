import React,{Component} from 'react';
import { View,StyleSheet} from 'react-native';
import { Icon, Text  } from 'react-native-elements';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
   
    
class ShareButton extends Component{
    constructor() {
        super();
        this.state = {
            img: '',
            name:'',
            uri: '',
            saved:false
        }
    }

    componentDidMount = () => {
        const { img,name } = this.props;
        this.setState({img:img,name:name})
    }
    
    checkPermissions = () => {
    var permissions = false
    MediaLibrary.getPermissionsAsync()
        .then(res => permissions = res.granted)
        .catch(err => console.log(err));
    
    if (permissions) {
        this.setLocalUri("download")
    }
    else {
        MediaLibrary.requestPermissionsAsync()
            .then(res => {
                permissions = res.granted
                if (permissions) {
                    this.setLocalUri("download")
                }
            })
            .catch(err => console.log(err))
        }
    }
        

    downloadImg = () => {
        MediaLibrary.saveToLibraryAsync(this.state.uri);
    }
    

    openShareDialog = async () => {
        if (!(await Sharing.isAvailableAsync())) {
            alert(`Uh oh, sharing isn't available on your platform`);
            return;
          }
      
        await Sharing.shareAsync(this.state.uri)
    }

    setLocalUri = (id) => {
        var fileUri = '';
        if (id == 'download') {
            fileUri = FileSystem.documentDirectory + this.state.name + ".jpg"
        }
        else {
            fileUri = FileSystem.cacheDirectory + this.state.name + ".jpg"
        }
        FileSystem.downloadAsync(
            this.state.img,
            fileUri
        )
            .then(({ uri }) => {
                this.setState({
                    uri: uri
                })
                if (id == "download") {
                    this.downloadImg()
                    this.setState({
                        saved: true
                    })
                }
                else {
                    this.openShareDialog()
                }
            })
            .catch(error => {
                console.error(error);
            });
        
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.btnContainer}>
                    <Icon
                        raised
                        name='download'
                        type='font-awesome'
                        onPress={()=>this.checkPermissions()} />
                    <Icon
                        raised
                        name='share'
                        type='font-awesome'
                        onPress={()=>this.setLocalUri("share")} />
                </View>
                {this.state.saved ?
                    <Text h5 style={styles.text}>Downloaded!</Text>
                    :null
                }
            </View>
          )
    }
  
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center'
    },
    text: {
        color:'#f4f4f2'
    },
});

export default ShareButton;