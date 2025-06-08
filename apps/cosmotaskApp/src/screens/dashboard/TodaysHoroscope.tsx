import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text } from "react-native";
import { Card, useTheme } from "react-native-paper";
import Loader from "src/components/Loader";
import { formatDate } from "src/utils/utils";
import { createStyles } from "./styles";

interface HoroscopeData {
  date: string;
  sun_sign: string;
  json_horoscope_data: {
    general: string;
    love: string;
    career: string;
    health: string;
  };
}

/**
 * TodaysHoroscope Component
 * Displays the user's daily horoscope based on their zodiac sign
 * Fetches data from Firebase and updates in real-time
 */
function TodaysHoroscope() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [horoscope, setHoroscope] = useState<HoroscopeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleHoroscopeUpdate = useCallback((data: HoroscopeData) => {
    setHoroscope(data);
    setIsLoading(false);
  }, []);

  const handleError = useCallback((err: unknown) => {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to fetch today's horoscope";
    setError(errorMessage);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    try {
      setIsLoading(true);
      setError(null);
    } catch (err) {
      handleError(err);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [handleHoroscopeUpdate, handleError]);

  const renderLoading = () => (
    <Card style={styles.card}>
      <Loader />
    </Card>
  );

  const renderError = () => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={[styles.text, { color: theme.colors.error }]}>
          {error || "No Horoscope available"}
        </Text>
      </Card.Content>
    </Card>
  );

  const renderHoroscope = () => (
    <Card style={[styles.card, { marginBottom: 16 }]}>
      <Card.Content>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Today's Horoscope {formatDate()}
        </Text>
        {horoscope?.json_horoscope_data && (
          <>
            <Text style={[styles.text, { color: theme.colors.onSurface }]}>
              {horoscope.json_horoscope_data.general}
            </Text>
            <Text
              style={[
                styles.text,
                { color: theme.colors.onSurface, marginTop: 8 },
              ]}
            >
              Love: {horoscope.json_horoscope_data.love}
            </Text>
            <Text
              style={[
                styles.text,
                { color: theme.colors.onSurface, marginTop: 8 },
              ]}
            >
              Career: {horoscope.json_horoscope_data.career}
            </Text>
            <Text
              style={[
                styles.text,
                { color: theme.colors.onSurface, marginTop: 8 },
              ]}
            >
              Health: {horoscope.json_horoscope_data.health}
            </Text>
          </>
        )}
      </Card.Content>
    </Card>
  );

  if (isLoading) {
    return renderLoading();
  }

  if (error || !horoscope) {
    return renderError();
  }

  return renderHoroscope();
}

export default TodaysHoroscope;
