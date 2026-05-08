import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { PosterCard } from './PosterCard';
import { mainStyles } from '../utils/theme/styles';

export const PosterRow = ({ title, movies }) => {
  return (
    <View style={styles.rowContainer}>
      {/* Header with "See All" */}
      <View style={styles.header}>
        <Text style={mainStyles.textDisplay}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>SEE ALL</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal List */}
      <FlatList
        data={movies}
        renderItem={({ item }) => <PosterCard movie={item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  seeAll: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 20,
  }
});