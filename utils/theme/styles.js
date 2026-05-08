import { StyleSheet  } from 'react-native';
import {Theme} from "../theme/Theme"

export const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding:20,
  },
  textDisplay: {
    fontFamily: Theme.fonts.display,
    fontSize: 26,
    color: Theme.colors.foreground,
    letterSpacing: -0.6,
  },
  textSans: {
    fontFamily: Theme.fonts.sans,
    fontSize: 16,
    color: Theme.colors.foreground,
  },
  textGold: {
    color: Theme.colors.gold,
  },
  smallText:{
    fontSize:14,
    fontFamily:Theme.fonts.sansBold,
    color:Theme.colors.mutedForeground,
    letterSpacing:1.2
  },
  card: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.radius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  }, 
  shadowPoster: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.85,
    shadowRadius: 35,
    elevation: 20, 
  },
  shadowElegant: {
    shadowColor: Theme.colors.primary,
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  bgPrimary: {
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.radius.md,
  }
});