import React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';
import { Theme } from '../utils/theme/Theme';
import { mainStyles } from '../utils/theme/styles';
import Routers from '../utils/routes/routers';
import {useNavigation} from "@react-navigation/native";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w342";

export const PosterCard = ({ movie }) => {
  const {navigate}=useNavigation();

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={() => navigate(Routers.movieDetails, { movieId: movie.id })}>
      <View style={styles.imageWrapper}>
        <Image 
          source={{ uri: `${IMAGE_BASE}${movie.poster_path}` }} 
          style={styles.poster} 
        />
        {/* Rating Badge */}
        <View style={styles.ratingBadge}>
          <Star size={10} color={Theme.colors.gold} fill={Theme.colors.gold} />
          <Text style={styles.ratingText}>{movie.vote_average.toFixed(1)}</Text>
        </View>
      </View>
      
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>{movie.title}</Text>
        <Text style={styles.subtitle}>
          {movie.release_date?.split('-')[0]} • Movie
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 140,
    marginRight: 15,
  },
  imageWrapper: {
    width: 140,
    height: 210,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Theme.colors.card,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  info: {
    marginTop: 10,
    paddingHorizontal: 4,
  },
  title: {
    color: Theme.colors.foreground,
    fontFamily: Theme.fonts.sansBold, 
    fontSize: 14,
  },
  subtitle: {
    color: Theme.colors.mutedForeground,
    fontSize: 11,
    marginTop: 2,
  }
});