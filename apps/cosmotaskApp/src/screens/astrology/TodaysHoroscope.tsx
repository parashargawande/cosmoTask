import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text } from "react-native";
import { Card, useTheme } from "react-native-paper";
import Loader from "src/components/Loader";
import { createStyles } from "../dashboard/styles";
import { bindTodaysPredection } from "src/services/predection.service";

interface HoroscopeData {
  date: string;
  horoscope_data: string;
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

  const handleError = useCallback((err: unknown) => {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to fetch today's horoscope";
    setError(errorMessage);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const init = (predection) => {
      setHoroscope(predection);
      setIsLoading(false);
    };

    try {
      setIsLoading(true);
      setError(null);
      return bindTodaysPredection(init);
    } catch (err) {
      handleError(err);
    }
  }, [handleError]);

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
    <Card style={[styles.card, { marginBottom: 8 }]}>
      <Card.Content>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Today's Horoscope {horoscope?.date}
        </Text>
        {horoscope?.horoscope_data && (
          <Text style={[styles.text, { color: theme.colors.onSurface }]}>
            {horoscope.horoscope_data}
          </Text>
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
