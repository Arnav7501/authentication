import React, {useState, useEffect} from 'react';
import { StatusBar, StyleSheet,  Text, View,
     Image,
     TouchableOpacity,useWindowDimensions, ScrollView, Button} from 'react-native';

import { useRoute } from '@react-navigation/native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useNavigation, NavigationContainer, useFocusEffect} from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import { DataStore } from '@aws-amplify/datastore';
import {Clubinfo} from '../../models';

const CoursesHomeScreen = () => {
  
    const [image, setImage] = useState("");
    const [president, setPresidents] = useState("");
    const [meetingtimes, setMeetingTimes] = useState("");
    const [howtosignup, setHowToSignUp] = useState("");
    const [averagetimecommitment, setAverageTimeCommitment] = useState("");
    const [descriptionofclub, setDescriptionOfClub] = useState("");
    const [show_Hide, setShowHide] = useState("");

    const {height, width} = useWindowDimensions();
    
   
    const [text, setText] = useState('Hide Image Component');
 
   
    const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {

      setImage(result.assets[0].uri);
    
    }
    else {
        return
    }
    
  };
  const navigation = useNavigation()
  const route = useRoute()
  const schoolname1 = route.params.schoolname;
  const clubschoolname = route.params.schoolclubname
    var schoolname = ""
  
    for(let i = 9; i < schoolname1.length; i++){
        if (schoolname1[i] != "\"" && schoolname[i+1] != "}") {
            schoolname += schoolname1[i]
        }
        else {
            break
        }
    }
    
    schoolname =  clubschoolname + " " + schoolname

    useFocusEffect(
      React.useCallback(() => {
      const get_info = async() => {
        const original = await DataStore.query(Clubinfo, (p) =>
          p.identifier("eq", schoolname)
        );
        setPresidents(original[0].Presidents)
        setMeetingTimes(original[0].MeetingTimes)
        setHowToSignUp(original[0].HowToSignUp)
        setAverageTimeCommitment[original[0].TimeCommitment]
        setDescriptionOfClub(original[0].DescriptionOfClub)
        setImage(original[0].image)
      }
      // call the function
      get_info()
      
      }, [])
    );

 
  const signOut = async() => {
    navigation.goBack()
  }

 
    return (
        <View style={{padding: 10, flex: 1}}>
      <ScrollView>

        <Text style = {{ top:'1%', fontSize: RFPercentage(5.5), alignSelf: 'center', textAlign: 'center', color: '#000000', fontWeight: 'bold'}}>
         {schoolname} </Text>

     
        <Image 
        resizeMode="stretch"
        source={{uri: image}}
        style = {{
          height: height/3,
          width: 1.5 * width,
          alignSelf: 'center',
          marginTop: '5%',
          marginBottom: '3%',
          display: image == "" ? "none" : "flex"
         }}
         
        >
        </Image>
       
       <Text style = {styles.infofont}>Teachers(s): {'\n'}{president} </Text>
       <Text style = {styles.infofont}>Description of Course:  {'\n'} {descriptionofclub}  </Text>
    
      <Button title = "edit information" onPress={() => navigation.navigate('clubeditscreen', {
            schoolname: schoolname
          })
        }></Button>
      <View style = {styles.buttonStyle}>
        <Button color="#841584"
            title="See Reviews"
            onPress={() => navigation.navigate('clubfeedscreen', {
              schoolname: schoolname
            })
          }
          />
      </View>
      <Text style = {styles.infofont2}></Text>
        </ScrollView>
               
     <Text
         onPress={signOut}
           style = {{
             width: '100%',
             textAlign: 'center',
             color: 'red',
             marginTop: 'auto',
             marginVertical: 20,
             fontSize: 20
           }}>
             Back
         </Text>
        </View>
       );
}

const styles = StyleSheet.create({
  buttonStyle: {
    top:'2%',
    alignSelf: 'stretch',
    backgroundColor: '#A6E4FF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
    marginTop: '5%'
},

container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 60,
    padding: 10
  },
  scrollView: {
    backgroundColor: '#ffffff',
    flex: 1
    

  },
    title: {
  
      color: 'black',
      fontSize: 32,
      fontWeight: "bold",
      letterSpacing: 3,
      
    },
  
  
   infofont: {
    fontSize: RFPercentage(2.8),
    marginTop: '3%',
    alignContent: 'flex-end'
  
   },
   infofont2: {
    fontSize: RFPercentage(3),
    marginTop: '20%'
  
   },

   text: {
    fontSize: RFValue(4)   
   },


   
  });
 

export default CoursesHomeScreen;