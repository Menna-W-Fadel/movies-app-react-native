import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Theme } from '../utils/theme/Theme';
import { mainStyles } from '../utils/theme/styles';
import { BrowseCard } from '../components/BrowseCard';

const AUTH_TOKEN ='Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDU1NTM5YThkMDA2MGUxNzNhOWY5N2Q0ZTNiMjAwOCIsIm5iZiI6MTc3NTY0NzEyNi42MDksInN1YiI6IjY5ZDYzOTk2NjgyODYwOTBjMzZhZTllYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X0Z6G9fr8OcT8Ikzzqp3fFG6a7kXBK4xj10Gxht23tU'

const GENRE_IMAGES = {
  28: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400", // Action
  12: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400", // Adventure
  16: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400", // Animation
  35: "https://images.unsplash.com/photo-1514525253361-bee8718a300a?w=400", // Comedy
  80: "https://images.unsplash.com/photo-1453873531674-2151bcd01ed0?w=400", // Crime
  99: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400", // Documentary
  18: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400", // Drama
  10751: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400", // Family
  14: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400", // Fantasy
  36: "https://images.unsplash.com/photo-1461360228754-6e81c478585b?w=400", // History
  27: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400", // Horror
  10402: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400", // Music
  9648: "https://images.unsplash.com/photo-1582133614241-017e88c9e900?w=400", // Mystery
  10749: "https://images.unsplash.com/photo-1518131359103-138338787019?w=400", // Romance
  878: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400", // Science Fiction
  10770: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400", // TV Movie
  53: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400", // Thriller
  10752: "https://images.unsplash.com/photo-1505322103502-1f431b211dc6?w=400", // War
  37: "https://images.unsplash.com/photo-1533167649152-6d5292121930?w=400", // Western
  Default: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400"
};

const PALETTES = [
  ['#4c0519', '#be123c'], 
  ['#1e1b4b', '#4338ca'], 
  ['#451a03', '#9a3412'], 
  ['#064e3b', '#0f766e'], 
];
const BrowseScreen = ({ navigation }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', {
      headers: { Authorization: AUTH_TOKEN }
    })
    .then(res => res.json())
    .then(data => {
      setGenres(data.genres);
      setLoading(false);
    });
  }, []);

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.goldLabel}>BROWSE</Text>
      <Text style={mainStyles.textDisplay}>Categories</Text>
      <Text style={styles.subtext}>Find films by mood, genre, and tone.</Text>
    </View>
  );

  if (loading) return (
    <View style={[mainStyles.container, { justifyContent: "center" }]}>
      <ActivityIndicator size="large" color={Theme.colors.primary} />
    </View>
  );

  return (
    <View style={mainStyles.container}>
      <FlatList
        data={genres}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        renderItem={({ item, index }) => (
          <BrowseCard 
            genre={item}
            index={index}
            navigation={navigation}
            imageUrl={GENRE_IMAGES[item.id] || GENRE_IMAGES.Default}
            palette={PALETTES[index % PALETTES.length]}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 60, marginBottom: 15 },
  goldLabel: { color: Theme.colors.gold, fontSize: 10, letterSpacing: 3, fontWeight: 'bold' },
  subtext: { color: Theme.colors.mutedForeground, fontSize: 14, marginTop: 5 },
  listContent: { paddingHorizontal: 10, paddingBottom: 120 }
});

export default BrowseScreen;