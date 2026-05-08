import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Play, Star } from 'lucide-react-native';
import { Theme } from '../utils/theme/Theme';
import { mainStyles } from '../utils/theme/styles';

const { width } = Dimensions.get('window');
const IMAGE_BASE = "https://image.tmdb.org/t/p/w780";

export const FeaturedHero = ({ movie }) => {
  if (!movie) return null;

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.heroWrapper}>
      <Image 
        source={{ uri: `${IMAGE_BASE}${movie.poster_path}` }} 
        style={styles.image} 
      />
      
      <View style={styles.overlay}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>FEATURED TONIGHT</Text>
        </View>

        <Text style={styles.title}>{movie.title}</Text>
        
        <Text numberOfLines={2} style={styles.overview}>
          {movie.overview}
        </Text>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.playBtn}>
            <Play size={18} color="#000" fill="#000" />
            <Text style={styles.playBtnText}>Watch</Text>
          </TouchableOpacity>
          
          <View style={styles.ratingRow}>
            <Star size={14} color={Theme.colors.gold} fill={Theme.colors.gold} />
            <Text style={styles.ratingText}>{movie.vote_average.toFixed(1)}</Text>
            <Text style={styles.yearText}>• {movie.release_date?.split('-')[0]}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  heroWrapper: {
    marginHorizontal: 20,
    height: 480,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: Theme.colors.card,
    marginBottom: 20,
  },
  image: { width: '100%', height: '100%', position: 'absolute' },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.45)', 
  },
  badge: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
  title: {
    color: '#fff',
    fontFamily: Theme.fonts.display,
    fontSize: 32,
    lineHeight: 36,
  },
  overview: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginTop: 10,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 15,
  },
  playBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 25,
  },
  playBtnText: { color: '#000', fontWeight: 'bold', marginLeft: 8 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  ratingText: { color: '#fff', fontWeight: 'bold' },
  yearText: { color: 'rgba(255,255,255,0.5)', fontSize: 12 }
});