
import React, { useState, useEffect } from "react";
import { ScrollView, View, ActivityIndicator ,StyleSheet} from "react-native";
import { mainStyles } from "../utils/theme/styles";
import { Theme } from "../utils/theme/Theme";
import { PosterRow } from "../components/PosterRow";
import { HomeHeader } from "../components/HomeHeader";
import { FeaturedHero } from "../components/FeaturedHero";

const HomeScreen = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");
  const [loading, setLoading] = useState(true);
  
  const [data, setData] = useState({
    popular: [], nowPlaying: [], topRated: [], upcoming: []
  });

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDU1NTM5YThkMDA2MGUxNzNhOWY5N2Q0ZTNiMjAwOCIsIm5iZiI6MTc3NTY0NzEyNi42MDksInN1YiI6IjY5ZDYzOTk2NjgyODYwOTBjMzZhZTllYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X0Z6G9fr8OcT8Ikzzqp3fFG6a7kXBK4xj10Gxht23tU'
  }
};

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [now, pop, top, up] = await Promise.all([
          fetch("https://api.themoviedb.org/3/movie/now_playing", options).then(r => r.json()),
          fetch("https://api.themoviedb.org/3/movie/popular", options).then(r => r.json()),
          fetch("https://api.themoviedb.org/3/movie/top_rated", options).then(r => r.json()),
          fetch("https://api.themoviedb.org/3/movie/upcoming", options).then(r => r.json()),
        ]);

        setData({
          nowPlaying: now.results,
          popular: pop.results,
          topRated: top.results,
          upcoming: up.results
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <View style={[mainStyles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={mainStyles.container}>
      <View style={styles.topSection}>
      <HomeHeader 
        showSearch={showSearch} 
        setShowSearch={setShowSearch} 
        query={searchQuery} 
        setQuery={setSearchQuery} 
      />
    </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100,marginTop:20 }}>
        {!searchQuery && (
          <FeaturedHero movie={data.nowPlaying[0]} />
        )}

        <View style={{ marginTop: 20 }}>
          <PosterRow 
            title={searchQuery ? "Search Results" : "Trending now"} 
            movies={getFilteredMovies(data.popular)} 
          />
          {!searchQuery && (
            <>
              <PosterRow title="Top Rated" movies={data.topRated} />
              <PosterRow title="Upcoming" movies={data.upcoming} />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topSection: {
    backgroundColor: Theme.colors.background,
    paddingBottom: 5, 
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)'
  }
});

export default HomeScreen;