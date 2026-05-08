import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Heart } from "lucide-react-native";
import { useFavorites } from "../context/FavoritesContext";
import { Theme } from "../utils/theme/Theme";
import { mainStyles } from "../utils/theme/styles";
import Routers from "../utils/routes/routers";
import { FavoriteCard } from "../components/FavoriteCard";

const FavoritesScreen = ({ navigation }) => {
  const { favorites, toggleFavorite } = useFavorites();

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.goldLabel}>YOUR COLLECTION</Text>
      <Text style={mainStyles.textDisplay}>Favorites</Text>
      <Text style={styles.countText}>
        {favorites.length} {favorites.length === 1 ? "film" : "films"} saved for later.
      </Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconCircle}>
        <Heart size={32} color={Theme.colors.primary} fill={Theme.colors.primary} />
      </View>
      <Text style={[mainStyles.textDisplay, { fontSize: 20, marginTop: 20 }]}>
        Nothing here yet
      </Text>
      <Text style={styles.emptySubtext}>
        Tap the heart on any film to start curating your personal cinema.
      </Text>
      <TouchableOpacity
        style={styles.discoverBtn}
        onPress={() => navigation.navigate(Routers.home)}
      >
        <Text style={styles.discoverText}>Discover films</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={mainStyles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        renderItem={({ item }) => (
          <FavoriteCard 
            movie={item} 
            navigation={navigation} 
            onRemove={toggleFavorite} 
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 70, marginBottom: 20 },
  goldLabel: { color: Theme.colors.gold, fontSize: 10, letterSpacing: 3, fontWeight: "bold" },
  countText: { color: Theme.colors.mutedForeground, fontSize: 13, marginTop: 5 },
  listContent: { paddingHorizontal: 20, paddingBottom: 100 },
  emptyContainer: { alignItems: "center", marginTop: 60, paddingHorizontal: 40 },
  emptyIconCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: Theme.colors.card, justifyContent: "center",
    alignItems: "center", borderWidth: 1, borderColor: Theme.colors.border,
  },
  emptySubtext: { color: Theme.colors.mutedForeground, textAlign: "center", marginTop: 10, lineHeight: 20 },
  discoverBtn: {
    marginTop: 25, backgroundColor: Theme.colors.primary,
    paddingHorizontal: 25, paddingVertical: 12, borderRadius: 25,
  },
  discoverText: { color: "#fff", fontWeight: "bold" },
});

export default FavoritesScreen;