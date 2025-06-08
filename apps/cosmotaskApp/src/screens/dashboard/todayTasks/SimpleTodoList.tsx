import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Checkbox, MD3Theme, useTheme } from "react-native-paper";
import { readTodo, updateTodo } from "src/services/todo.service";
import { Todo } from "../../todo";

export default function SimpleTodoList() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    try {
      return readTodo(setTodos);
    } catch (error) {
      console.log("failed to load todoSummary ", error);
      setTodos([]);
    }
  }, []);

  const toggleCompleted = useCallback(async (current: Todo) => {
    await updateTodo({ ...current, completed: !current.completed });
  }, []);

  const renderItem = useCallback(
    ({ item: todo }: { item: Todo }) => (
      <View style={styles.listItemContainer}>
        <Checkbox
          status={todo.completed ? "checked" : "unchecked"}
          onPress={() => toggleCompleted(todo)}
        />
        <Text
          style={[styles.listItemText, todo.completed && styles.completedText]}
        >
          {todo.title}
        </Text>
      </View>
    ),
    [styles, toggleCompleted]
  );

  return (
    <FlatList
      data={todos}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}
    />
  );
}

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    listItemContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      paddingHorizontal: 16,
    },
    listItemText: {
      flex: 1,
      textAlign: "left",
      color: theme.colors.onSurface,
      fontSize: 16,
    },
    completedText: {
      textDecorationLine: "line-through",
    },
  });
