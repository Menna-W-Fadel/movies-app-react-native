import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Play, Star, X } from "lucide-react-native";
import { Theme } from "../utils/theme/Theme";
import Routers from "../utils/routes/routers";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w185";

export const FavoriteCard = ({ movie, navigation, onRemove }) => {
  return (
    <View style={styles.favCard}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => {
          navigation.navigate(Routers.home, {
            screen: Routers.movieDetails,
            params: { movieId: movie.id },
          });
        }}
      >
        <Image
          source={{ uri: `${IMAGE_BASE}${movie.poster_path}` }}
          style={styles.poster}
        />
        <div style={styles.info}>
          <Text numberOfLines={1} style={styles.movieTitle}>
            {movie.title}
          </Text>
          <Text style={styles.movieMeta}>
            {movie.release_date?.split("-")[0]} · {movie.runtime || "N/A"} min
          </Text>
          <View style={styles.ratingRow}>
            <Star size={12} color={Theme.colors.gold} fill={Theme.colors.gold} />
            <Text style={styles.ratingText}>{movie.vote_average?.toFixed(1)}</Text>
          </View>
          <View style={styles.playBadge}>
            <Play size={10} color="#fff" fill="#fff" />
            <Text style={styles.playText}>Play</Text>
          </View>
        </div>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onRemove(movie)} style={styles.removeBtn}>
        <X size={14} color={Theme.colors.mutedForeground} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  favCard: {
    backgroundColor: Theme.colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    overflow: "hidden",
    marginBottom: 15,
  },
  cardContent: { flexDirection: "row", padding: 15, gap: 15 },
  poster: { width: 80, height: 110, borderRadius: 12 },
  info: { flex: 1, justifyContent: "center" },
  movieTitle: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  movieMeta: { color: Theme.colors.mutedForeground, fontSize: 11, marginTop: 4 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 6 },
  ratingText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  playBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: Theme.colors.primary,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 10,
  },
  playText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  removeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});