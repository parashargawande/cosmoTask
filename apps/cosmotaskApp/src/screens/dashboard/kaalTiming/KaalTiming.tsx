import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Card, MD3Theme, useTheme } from "react-native-paper";
import { getKallTimings } from "src/services/kaalTiming.service";
import {
  COMPONENT_STATUS,
  createStatus,
  KAAL_DISPLAY_NAMES,
} from "src/utils/constants";
import KaalTimingPopup from "./KaalTImingPopup";

interface TimingData {
  name: string;
  starts_at: string;
  ends_at: string;
}

interface KaalTimingData {
  city: string;
  date: string;
  data: TimingData[];
  updatedAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export default function KaalTiming() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [kaalTiming, setKaalTiming] = useState<KaalTimingData | null>(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [status, setStatus] = React.useState(
    createStatus(COMPONENT_STATUS.LOADING, "Loading Kaal Timings...")
  );

  useEffect(() => {
    try {
      const init = (data: KaalTimingData) => {
        setKaalTiming(data);
        setStatus(createStatus(COMPONENT_STATUS.SUCCESS));
      };

      setStatus(
        createStatus(COMPONENT_STATUS.LOADING, "Loading kaal timings...")
      );
      getKallTimings((data: KaalTimingData) => {
        console.log("Received kaal timing data:", data);
        init(data);
      });
    } catch (err) {
      console.error("Error fetching kaal timings:", err);
      setStatus(
        createStatus(COMPONENT_STATUS.ERROR, "Failed to load kaal timings")
      );
    }
  }, []);

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString();
  };

  if (status.status === COMPONENT_STATUS.LOADING) {
    return (
      <Card style={styles.card}>
        <Card.Content style={{ alignItems: "center" }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </Card.Content>
      </Card>
    );
  }

  if (status.status === COMPONENT_STATUS.ERROR) {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Text style={[styles.text, { color: theme.colors.error }]}>
            {status.message || "Failed to load kaal timings"}
          </Text>
        </Card.Content>
      </Card>
    );
  }

  if (!kaalTiming) {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Text style={[styles.text, { color: theme.colors.error }]}>
            {"No timing data available"}
          </Text>
        </Card.Content>
      </Card>
    );
  }

  const kaalTimingCard = (
    <Card style={styles.card} onPress={() => setIsDialogVisible(true)}>
      <Card.Content>
        <Text style={styles.title}>Kaal Timings - {kaalTiming.city}</Text>
        {kaalTiming.data.map((timing) => (
          <View key={timing.name} style={{ marginBottom: 8 }}>
            <Text style={[
              styles.text,
              timing.name === 'Abhijit' && { color: '#2E7D32' }
            ]}>
              <Text style={{ fontWeight: "bold" }}>
                {KAAL_DISPLAY_NAMES[timing.name] || timing.name}:
              </Text>
              {formatTime(timing.starts_at)} - {formatTime(timing.ends_at)}
            </Text>
          </View>
        ))}
      </Card.Content>
    </Card>
  );

  return (
    <>
      {kaalTimingCard}
      <KaalTimingPopup
        isDialogVisible={isDialogVisible}
        setIsDialogVisible={setIsDialogVisible}
        kaalTiming={kaalTiming}
      />
    </>
  );
}

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    card: {
      marginBottom: 16,
      borderRadius: 12,
      elevation: 3,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
      textAlign: "center",
      color: theme.colors.primary,
    },
    text: {
      fontSize: 16,
      textAlign: "center",
      color: theme.colors.onSurface,
    },
    label: {
      fontSize: 14,
      fontWeight: "bold",
      color: theme.colors.primary,
      marginRight: 8,
    },
    value: {
      fontSize: 14,
      color: theme.colors.onSurface,
    },
  });
