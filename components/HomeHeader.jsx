import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Search, Bell, X, SlidersHorizontal } from 'lucide-react-native';
import { Theme } from '../utils/theme/Theme';
import { mainStyles } from '../utils/theme/styles';

export const HomeHeader = ({ showSearch, setShowSearch, query, setQuery }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.greetingLabel}>TONIGHT</Text>
          <Text style={mainStyles.textDisplay}>Good evening, Alex</Text>
        </View>
        <View style={styles.iconGroup}>
          <TouchableOpacity onPress={() => setShowSearch(!showSearch)} style={styles.iconBtn}>
            {showSearch ? <X size={18} color="#fff" /> : <Search size={18} color="#fff" />}
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Bell size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {showSearch && (
        <View style={styles.searchBar}>
          <Search size={18} color={Theme.colors.mutedForeground} />
          <TextInput
            style={styles.input}
            placeholder="Search films..."
            placeholderTextColor={Theme.colors.mutedForeground}
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          <SlidersHorizontal size={18} color={Theme.colors.mutedForeground} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 10 ,},
  topRow: { flexDirection: 'row', justifyContent:"space-around", alignItems: 'center' },
  greetingLabel: { 
    fontFamily: Theme.fonts.sans, 
    fontSize: 11, 
    letterSpacing: 3, 
    color: Theme.colors.mutedForeground,
    marginBottom: 2
  },
  iconGroup: { flexDirection: 'row', gap: 12 ,marginLeft:10},
  iconBtn: {
    width: 38, height: 38, borderRadius: 22,
    backgroundColor: Theme.colors.card,
    borderWidth: 1, borderColor: Theme.colors.border,
    justifyContent: 'center', alignItems: 'center',
    marginTop:12,
   
  },
  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Theme.colors.card,
    borderRadius: 25, paddingHorizontal: 15,
    height: 48, marginTop: 15,
    borderWidth: 1, borderColor: Theme.colors.border
  },
  input: { flex: 1, color: '#fff', marginLeft: 10, fontFamily: Theme.fonts.sans }
});