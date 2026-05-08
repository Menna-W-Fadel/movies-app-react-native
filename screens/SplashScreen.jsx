import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Logo from "../assets/movies-splash.png";
const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <View>
                <Image
                source={Logo}
                style={styles.image}>

                </Image>
            </View>
            
        </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#110d0d",
    alignItems: "center",
    justifyContent: "center",
  },
  image:{
    width:200,
    height:200,
    resizeMode:"cover"
  }
});


export default SplashScreen;
