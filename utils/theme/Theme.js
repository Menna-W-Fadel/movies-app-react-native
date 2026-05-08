import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Theme = {
  colors: {
    background: '#110d0d', 
    foreground: '#ECECEC', 
    card: '#140F0E',      
    primary: '#8B1A1A',    
    primaryMuted: 'rgba(139, 26, 26, 0.2)',
    gold: '#D4AF37',       
    mutedForeground: '#635C5B',
    border: 'rgba(255, 255, 255, 0.05)', 
  },
  fonts: {
    display: 'Playfair-Bold',
    sans: 'Inter-Regular',
    sansBold: 'Inter-SemiBold',
  },
  radius: {
    sm: 12,
    md: 14,
    lg: 25,
    xl: 45,
  }
};