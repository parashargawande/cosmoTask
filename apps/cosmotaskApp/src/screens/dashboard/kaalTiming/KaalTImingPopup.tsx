import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Button,
  Card,
  Dialog,
  MD3Theme,
  Portal,
  useTheme,
} from "react-native-paper";
import { getKallTimings } from "src/services/kaalTiming.service";
import {
  COMPONENT_STATUS,
  createStatus,
  KAAL_DISPLAY_NAMES,
  timingPurposes,
} from "src/utils/constants";
import { formatDate } from "src/utils/utils";

export default function KaalTimingPopup({
  isDialogVisible,
  setIsDialogVisible,
  kaalTiming,
}) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  if (!kaalTiming) return null;

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString();
  };

  return (
    <Portal>
      <Dialog
        visible={isDialogVisible}
        onDismiss={() => setIsDialogVisible(false)}
      >
        <Dialog.Title>Kaal Timings Summary </Dialog.Title>
        <Dialog.Content>
          <ScrollView style={{ maxHeight: 400 }}>
            <Text style={styles.text}>
              {kaalTiming.city} - {formatDate(kaalTiming.date)}
            </Text>
            {kaalTiming.data.map((timing: any) => {
              const purpose =
                timingPurposes[timing.name] ?? "Auspicious timing period";

              return (
                <View key={timing.name} style={{ marginBottom: 8 }}>
                  <Text style={[
                    styles.label,
                    timing.name === 'Abhijit' && { color: '#2E7D32' }
                  ]}>
                    <Text style={{ fontWeight: "bold" }}>{timing.name}:</Text>{" "}
                    {formatTime(timing.starts_at)} -{" "}
                    {formatTime(timing.ends_at)}
                  </Text>
                  <Text style={[
                    styles.value,
                    timing.name === 'Abhijit' && { color: '#2E7D32' }
                  ]}>{purpose}</Text>
                </View>
              );
            })}
          </ScrollView>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setIsDialogVisible(false)}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
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
