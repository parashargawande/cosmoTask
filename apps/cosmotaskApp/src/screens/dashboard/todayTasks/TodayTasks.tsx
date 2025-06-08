import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Card, MD3Theme, useTheme, Chip } from "react-native-paper";
import { bindTodayTask } from "src/services/todayTasks.service";
import { COMPONENT_STATUS, createStatus } from "src/utils/constants";

interface RecommendedTask {
  task: string;
  priority: "high" | "medium" | "low";
  why: string;
  how: string;
}

interface TodayTasksData {
  date: string;
  zodiac_sign: string;
  recommended_tasks: RecommendedTask[];
}

export default function TodayTasks() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [status, setStatus] = React.useState(
    createStatus(COMPONENT_STATUS.LOADING, "Loading today's tasks...")
  );
  const [todayTasks, setTodayTasks] = React.useState<TodayTasksData | {}>({});

  useEffect(() => {
    try {
      const init = (data: TodayTasksData) => {
        setTodayTasks(data);
        setStatus(createStatus(COMPONENT_STATUS.SUCCESS));
      };

      setStatus(
        createStatus(COMPONENT_STATUS.LOADING, "Loading today's tasks...")
      );
      return bindTodayTask(init);
    } catch (error) {
      console.error("Error fetching today's tasks:", error);
      setStatus(
        createStatus(COMPONENT_STATUS.ERROR, "Failed to load today's tasks")
      );
    }
  }, []);

  if (status.status === COMPONENT_STATUS.LOADING) {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </Card.Content>
      </Card>
    );
  }

  if (Object.keys(todayTasks).length === 0) {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.text}>No Tasks Available</Text>
        </Card.Content>
      </Card>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return theme.colors.primary;
      case "medium":
        return theme.colors.tertiary;
      case "low":
        return theme.colors.error;
      default:
        return theme.colors.primary;
    }
  };

  const todaysTasksContent = (
    <Card.Content>
      <Text style={styles.title}>Today's Tasks</Text>
      <Text style={styles.dateText}>
        {new Date(todayTasks.date).toLocaleDateString()} •{" "}
        {todayTasks.zodiac_sign}
      </Text>
      {todayTasks.recommended_tasks.map((task, index) => (
        <View key={index} style={styles.taskContainer}>
          <View style={styles.taskHeader}>
            <Text style={styles.taskTitle}>{task.task}</Text>
            <Chip
              mode="flat"
              textStyle={styles.priorityChipText}
              style={[
                styles.priorityChip,
                { backgroundColor: getPriorityColor(task.priority) },
              ]}
            >
              {task.priority}
            </Chip>
          </View>
          <Text style={styles.taskWhy}>
            <Text style={styles.fieldTitle}>Why: </Text>
            {task.why}
          </Text>
          <Text style={styles.taskHow}>
            <Text style={styles.fieldTitle}>How: </Text>
            {task.how}
          </Text>
        </View>
      ))}
    </Card.Content>
  );

  return <Card style={styles.card}>{todaysTasksContent}</Card>;
}

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    card: {
      marginBottom: 16,
      borderRadius: 12,
      elevation: 3,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 8,
      textAlign: "center",
      color: theme.colors.primary,
    },
    dateText: {
      fontSize: 14,
      textAlign: "center",
      color: theme.colors.onSurfaceVariant,
      marginBottom: 16,
    },
    text: {
      fontSize: 16,
      textAlign: "center",
      color: theme.colors.onSurface,
    },
    taskContainer: {
      marginBottom: 16,
      padding: 12,
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 8,
    },
    taskHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    taskTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.colors.onSurface,
      flex: 1,
      marginRight: 8,
    },
    priorityChip: {
      height: 24,
      justifyContent: "center",
      alignItems: "center",
    },
    priorityChipText: {
      color: "white",
      fontSize: 12,
      fontWeight: "bold",
    },
    fieldTitle: {
      fontWeight: "bold",
      color: theme.colors.onSurface,
    },
    taskWhy: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
      marginBottom: 4,
    },
    taskHow: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
    },
  });
