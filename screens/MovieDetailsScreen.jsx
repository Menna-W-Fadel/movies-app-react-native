// screens/MovieDetailsScreen.jsx
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from "react-native";
import {
  ChevronLeft,
  Heart,
  Play,
  Plus,
  Share2,
  Star,
} from "lucide-react-native";
import { Theme } from "../utils/theme/Theme";
import { mainStyles } from "../utils/theme/styles";
import { PosterRow } from "../components/PosterRow";
import { useFavorites } from "../context/FavoritesContext";

const { width } = Dimensions.get("window");
const IMAGE_BASE = "https://image.tmdb.org/t/p/w780";
const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDU1NTM5YThkMDA2MGUxNzNhOWY5N2Q0ZTNiMjAwOCIsIm5iZiI6MTc3NTY0NzEyNi42MDksInN1YiI6IjY5ZDYzOTk2NjgyODYwOTBjMzZhZTllYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X0Z6G9fr8OcT8Ikzzqp3fFG6a7kXBK4xj10Gxht23tU";

const MovieDetailsScreen = ({ route, navigation }) => {
  const { movieId } = route.params; // Passed from PosterCard
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = details ? isFavorite(details.id) : false;

  useEffect(() => {
    const fetchMovieData = async () => {
      const options = {
        method: "GET",
        headers: { accept: "application/json", Authorization: AUTH_TOKEN },
      };

      try {
        const [detRes, credRes, recRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
            options,
          ).then((res) => res.json()),
          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
            options,
          ).then((res) => res.json()),
          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`,
            options,
          ).then((res) => res.json()),
        ]);

        setDetails(detRes);
        setCredits(credRes.cast.slice(0, 5)); // Top 5 cast
        setRecommendations(recRes.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, []);

  if (loading)
    return (
      <View style={[mainStyles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );

  return (
    <View
      style={[
        mainStyles.container,
        { backgroundColor: Theme.colors.background },
      ]}
    >
      {/* {console.log(movieId)}
      {console.log(credits)}
      {console.log(recommendations)}
      {console.log(details)} */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/*  HERO POSTER */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: `${IMAGE_BASE}${details.poster_path}` }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />

          {/* Top Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.blurBtn}
            >
              <ChevronLeft color="#fff" size={24} />
            </TouchableOpacity>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity style={styles.blurBtn}>
                <Share2 color="#fff" size={18} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleFavorite(details)}
                style={[
                  styles.blurBtn,
                  fav && {
                    backgroundColor: Theme.colors.primary,
                    borderColor: "transparent",
                  },
                ]}
              >
                <Heart
                  color="#fff"
                  size={18}
                  fill={fav ? Theme.colors.primary : "none"}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Title Info */}
          <View style={styles.titleContainer}>
            <Text style={styles.genresText}>
              {details.genres
                .map((g) => g.name)
                .join(" · ")
                .toUpperCase()}
            </Text>
            <Text
              style={[mainStyles.textDisplay, { fontSize: 36, lineHeight: 40 }]}
            >
              {details.title}
            </Text>
            <View style={styles.metaRow}>
              <Star
                size={16}
                color={Theme.colors.gold}
                fill={Theme.colors.gold}
              />
              <Text style={styles.metaText}>
                {details.vote_average.toFixed(1)}
              </Text>
              <Text style={styles.metaText}>
                · {details.release_date.split("-")[0]}
              </Text>
              <Text style={styles.metaText}>· {details.runtime} min</Text>
            </View>
          </View>
        </View>

        {/* CTAs */}
        <View style={styles.ctaRow}>
          <TouchableOpacity style={styles.playBtn}>
            <Play size={18} color="#000" fill="#000" />
            <Text style={styles.playBtnText}>Watch Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.plusBtn}>
            <Plus size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* 3. SYNOPSIS */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SYNOPSIS</Text>
          <Text style={styles.overviewText}>{details.overview}</Text>
        </View>

        {/* CAST */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>CAST & CREW</Text>
          {credits.map((person) => (
            <View key={person.id} style={styles.castItem}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{person.name[0]}</Text>
              </View>
              <View>
                <Text style={styles.castName}>{person.name}</Text>
                <Text style={styles.castRole}>{person.character}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* RECOMMENDATIONS */}
        <View style={{ marginTop: 20 }}>
          <PosterRow title="More Like This" movies={recommendations} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  heroContainer: { height: 550, width: "100%" },
  heroImage: { ...StyleSheet.absoluteFillObject },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10, 8, 8, 0.4)", // Gradient simulation
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    zIndex: 10,
  },
  blurBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  titleContainer: { position: "absolute", bottom: 30, paddingHorizontal: 25 },
  genresText: {
    color: Theme.colors.gold,
    fontSize: 10,
    letterSpacing: 2,
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  metaText: { color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: "500" },
  ctaRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginTop: -25,
  },
  playBtn: {
    flex: 1,
    height: 54,
    backgroundColor: "#fff",
    borderRadius: 27,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    elevation: 10,
    shadowColor: Theme.colors.primary,
    shadowOpacity: 0.5,
  },
  playBtnText: { color: "#000", fontWeight: "800", fontSize: 16 },
  plusBtn: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Theme.colors.card,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  section: { paddingHorizontal: 25, marginTop: 30 },
  sectionLabel: {
    color: Theme.colors.mutedForeground,
    fontSize: 11,
    letterSpacing: 3,
    marginBottom: 15,
  },
  overviewText: {
    color: "rgba(255,255,255,0.8)",
    lineHeight: 24,
    fontSize: 15,
  },
  castItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 15,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Theme.colors.card,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  avatarText: { color: Theme.colors.gold, fontWeight: "bold" },
  castName: { color: "#fff", fontWeight: "600", fontSize: 14 },
  castRole: { color: Theme.colors.mutedForeground, fontSize: 12 },
});

export default MovieDetailsScreen;
