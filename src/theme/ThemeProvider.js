import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { palettes } from './palettes';
import { patterns } from './patterns';

const STORAGE_KEY = 'ellelist-theme-selection';
const defaultSelection = { patternId: 'minimal', paletteId: 'teal' };
const ThemeContext = createContext(null);

function getTheme(selection) {
  const palette = palettes[selection.paletteId] || palettes[defaultSelection.paletteId];
  const pattern = patterns[selection.patternId] || patterns[defaultSelection.patternId];

  return { colors: palette.colors, palette, pattern, patternId: pattern.id, paletteId: palette.id };
}

export function ThemeProvider({ children }) {
  const [selection, setSelection] = useState(defaultSelection);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((storedSelection) => {
        if (storedSelection) {
          const parsed = JSON.parse(storedSelection);
          setSelection({
            patternId: patterns[parsed.patternId] ? parsed.patternId : defaultSelection.patternId,
            paletteId: palettes[parsed.paletteId] ? parsed.paletteId : defaultSelection.paletteId,
          });
        }
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  async function applyTheme(nextSelection) {
    const safeSelection = {
      patternId: patterns[nextSelection.patternId] ? nextSelection.patternId : defaultSelection.patternId,
      paletteId: palettes[nextSelection.paletteId] ? nextSelection.paletteId : defaultSelection.paletteId,
    };
    setSelection(safeSelection);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(safeSelection));
  }

  const value = useMemo(
    () => ({
      applyTheme,
      ready,
      selection,
      theme: getTheme(selection),
    }),
    [ready, selection],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider.');
  }

  return context;
}
