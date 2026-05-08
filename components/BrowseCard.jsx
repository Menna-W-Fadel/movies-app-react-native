import React from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
import { Theme } from '../utils/theme/Theme';
import Routers from '../utils/routes/routers';

export const BrowseCard = ({ genre, index, navigation, imageUrl, palette }) => {
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate(Routers.home, {
        screen: Routers.categoryResults,
        params: { genreId: genre.id, genreName: genre.name }
      })}
    >
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.cardImage} 
      />
      <View style={[styles.overlay, { backgroundColor: palette[0] + 'B3' }]} />
      <View style={styles.textOverlay}>
        <Text style={styles.genreTitle}>{genre.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { 
    flex: 1,
    margin: 6, 
    aspectRatio: 5/4, 
    borderRadius: 20, 
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  cardImage: { ...StyleSheet.absoluteFillObject },
  overlay: { ...StyleSheet.absoluteFillObject },
  textOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'flex-end', padding: 15 },
  genreTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});