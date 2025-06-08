import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Card, Text, useTheme, Button } from "react-native-paper";
import { bindHoroscope } from "src/services/horoscope.service";

const Horoscope = () => {
  const theme = useTheme();
  const [horoscope, setHoroscope] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = (data) => {
      setHoroscope(data);
      setLoading(false);
    };

    return bindHoroscope(init);
  }, []);

  const renderInfoRow = (label: string, value: string, theme: any) => (
    <View key={label} style={{ marginBottom: 8 }}>
      <Text style={[styles.label, { color: theme.colors.onSurface }]}>
        {label}
      </Text>
      <Text style={[styles.value, { color: theme.colors.onSurfaceVariant }]}>
        {value}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <Text style={{ color: theme.colors.onSurface, marginBottom: 16 }}>
          Loading your horoscope...
        </Text>
      </View>
    );
  }

  if (!horoscope || Object.keys(horoscope).length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <Text style={{ color: theme.colors.onSurface, marginBottom: 16 }}>
          No horoscope present.
        </Text>
        <Button
          mode="contained"
          onPress={() => {
            console.log("Navigate to horoscope generation");
          }}
        >
          Click here to generate
        </Button>
      </View>
    );
  }

  const { nakshatra, chandra_rasi, soorya_rasi, zodiac, additional_info } =
    horoscope;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{ paddingBottom: 16, paddingHorizontal: 12 }}
    >
      {/* Nakshatra */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            Nakshatra
          </Text>
          <Text style={[styles.description, { color: theme.colors.onSurface }]}>
            Nakshatra refers to the lunar mansion (one of 27 sky divisions the
            moon travels through). Punarvasu is known for traits like optimism,
            creativity, and resourcefulness.
          </Text>
          <Text
            style={[styles.value, { color: theme.colors.onSurfaceVariant }]}
          >
            {nakshatra?.name} (Pada {nakshatra?.pada})
          </Text>
          <Text style={[styles.label, { color: theme.colors.onSurface }]}>
            Lord: {nakshatra?.lord?.name} ({nakshatra?.lord?.vedic_name})
          </Text>
        </Card.Content>
      </Card>

      {/* Moon Sign (Chandra Rasi) */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            Chandra Rasi (Moon Sign)
          </Text>
          <Text style={[styles.description, { color: theme.colors.onSurface }]}>
            This is the zodiac sign occupied by the Moon at your birth — used
            primarily in Vedic astrology for predictions.
          </Text>
          <Text
            style={[styles.value, { color: theme.colors.onSurfaceVariant }]}
          >
            {chandra_rasi?.name} ({chandra_rasi?.lord?.vedic_name})
          </Text>
        </Card.Content>
      </Card>

      {/* Sun Sign (Soorya Rasi) */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            Soorya Rasi (Sun Sign)
          </Text>
          <Text style={[styles.description, { color: theme.colors.onSurface }]}>
            This is the sign occupied by the Sun at your birth — similar to the
            Western "sun sign".
          </Text>
          <Text
            style={[styles.value, { color: theme.colors.onSurfaceVariant }]}
          >
            {soorya_rasi?.name} ({soorya_rasi?.lord?.vedic_name})
          </Text>
        </Card.Content>
      </Card>

      {/* Western Zodiac */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            Zodiac (Western)
          </Text>
          <Text style={[styles.description, { color: theme.colors.onSurface }]}>
            Your Western astrology sun sign, calculated using the tropical
            zodiac system. You were born on August 11, which falls under Leo
            (July 23 – August 22).
          </Text>
          <Text
            style={[styles.value, { color: theme.colors.onSurfaceVariant }]}
          >
            {zodiac?.name}
          </Text>
        </Card.Content>
      </Card>

      {/* Additional Astrological Info */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            Additional Astrological Details
          </Text>
          <Text
            style={[
              styles.description,
              { color: theme.colors.onSurface, marginBottom: 12 },
            ]}
          >
            These symbolic and mythological attributes provide further insights
            into your nature and destiny.
          </Text>
          {renderInfoRow("Deity", additional_info?.deity, theme)}
          {renderInfoRow("Ganam", additional_info?.ganam, theme)}
          {renderInfoRow("Symbol", additional_info?.symbol, theme)}
          {renderInfoRow("Animal Sign", additional_info?.animal_sign, theme)}
          {renderInfoRow("Nadi", additional_info?.nadi, theme)}
          {renderInfoRow("Color", additional_info?.color, theme)}
          {renderInfoRow(
            "Best Direction",
            additional_info?.best_direction,
            theme
          )}
          {renderInfoRow("Syllables", additional_info?.syllables, theme)}
          {renderInfoRow("Birth Stone", additional_info?.birth_stone, theme)}
          {renderInfoRow("Gender", additional_info?.gender, theme)}
          {renderInfoRow("Planet", additional_info?.planet, theme)}
          {renderInfoRow("Enemy Yoni", additional_info?.enemy_yoni, theme)}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginTop: 12,
    borderRadius: 12,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

const screenOptions = {
  tabBarLabel: "",
  headerShown: false,
};
export default Horoscope;
export { screenOptions, Horoscope as MyHoroscopeScreen };
