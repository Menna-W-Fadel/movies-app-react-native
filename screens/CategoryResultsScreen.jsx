import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { PosterCard } from "../components/PosterCard";
import { mainStyles } from "../utils/theme/styles";

const CategoryResultsScreen = ({ route, navigation }) => {
  const { genreId, genreName } = route.params;
  const [movies, setMovies] = useState([]);
  const AUTH_TOKEN =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDU1NTM5YThkMDA2MGUxNzNhOWY5N2Q0ZTNiMjAwOCIsIm5iZiI6MTc3NTY0NzEyNi42MDksInN1YiI6IjY5ZDYzOTk2NjgyODYwOTBjMzZhZTllYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X0Z6G9fr8OcT8Ikzzqp3fFG6a7kXBK4xj10Gxht23tU";
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`,
      {
        headers: { Authorization: AUTH_TOKEN },
      },
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, [genreId]);

  return (
    <View style={mainStyles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 20,
          paddingTop: 60,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft color="#fff" size={28} />
        </TouchableOpacity>
        <Text
          style={[mainStyles.textDisplay, { fontSize: 24, marginLeft: 15 }]}
        >
          {genreName}
        </Text>
      </View>

      <FlatList
        data={movies}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ width: "50%", padding: 5 }}>
            <PosterCard movie={item} />
          </View>
        )}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
};

export default CategoryResultsScreen;
