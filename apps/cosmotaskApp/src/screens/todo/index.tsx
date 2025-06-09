import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Checkbox,
  IconButton,
  Card,
  Text,
  Dialog,
  Portal,
  useTheme,
  ActivityIndicator,
} from "react-native-paper";

import {
  createTodo,
  bindTodos,
  updateTodo,
  deleteTodo,
} from "src/services/todo.service";

import { useApp } from "src/context/appContext";

import Icon from "react-native-vector-icons/MaterialIcons";

interface TodoComponentProps {
  readonly navigation: any;
}
export interface Todo {
  id: string;
  title: string;
  description: string;
  tags: string[];
  completed: boolean;
  createdAt?: any; // Firebase timestamp
}

export default function TodoComponent({ navigation }: TodoComponentProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [viewingTodo, setViewingTodo] = useState<Todo | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useTheme();
  const { user } = useApp();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingTop: 48,
      backgroundColor: theme.colors.background,
    },
    card: {
      marginBottom: 16,
      borderRadius: 12,
      elevation: 2,
    },
    content: { paddingVertical: 4, paddingHorizontal: 8 },
    title: {
      fontWeight: "bold",
      marginBottom: 8,
      textAlign: "center",
      color: theme.colors.primary,
    },
    text: { fontSize: 16, textAlign: "center", color: theme.colors.onSurface },
    todoContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  });

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user, navigation]);

  useEffect(() => {
    const init = (todos) => {
      setTodos(todos || []);
      setLoading(false);
    };

    return bindTodos(init);
  }, []);

  const addOrUpdateTodo = async () => {
    try {
      if (editingTodo) {
        await updateTodo({
          id: editingTodo.id,
          title,
          description: input,
          tags,
          completed: false,
        });
      } else {
        await createTodo({
          title,
          description: input,
          tags,
          completed: false,
        });
      }
    } catch (error) {
      console.error("Error adding/updating todo:", error);
    }

    setEditingTodo(null);
    setModalVisible(false);
    setInput("");
    setTitle("");
    setTags([]);
  };

  const toggleCompleted = async (current: any) => {
    await updateTodo({ ...current, completed: !current.completed });
  };

  const deleteTodoItem = async (id: string) => {
    await deleteTodo(id);
  };

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput("");
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const editTodo = (todo: Todo) => {
    setTitle(todo.title);
    setTags(todo.tags);
    setInput(todo.description);
    setEditingTodo(todo);
    setModalVisible(true);
  };
  const viewTodo = (todo: Todo) => {
    setViewingTodo(todo);
  };
  const renderItem = ({ item }: { item: Todo }) => (
    <Card style={[styles.card]}>
      <Card.Content style={[styles.content]}>
        <View style={[styles.todoContainer]}>
          <Checkbox
            status={item.completed ? "checked" : "unchecked"}
            onPress={() => toggleCompleted(item)}
          />
          <Text
            style={[
              {
                flex: 1,
                textDecorationLine: item.completed ? "line-through" : "none",
              },
            ]}
            onPress={() => viewTodo(item)}
          >
            {item.title}
          </Text>
          <IconButton icon="pencil" size={16} onPress={() => editTodo(item)} />
          <IconButton
            icon="delete"
            size={16}
            onPress={() => deleteTodoItem(item.id)}
          />
        </View>
      </Card.Content>
    </Card>
  );

  console.log("Todos:", todos);

  return (
    <View style={[styles.container]}>
      <Text variant="titleLarge" style={[styles.title]}>
        Todo List
      </Text>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={{ marginTop: 16 }}
        />
      )}

      <Button mode="contained" onPress={() => setModalVisible(true)}>
        Add Todo
      </Button>

      <Portal>
        <Dialog visible={modalVisible} onDismiss={() => setModalVisible(false)}>
          <Dialog.Title>{editingTodo ? "Edit Todo" : "Add Todo"}</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Title"
              value={title}
              onChangeText={setTitle}
              mode="outlined"
              style={{ marginBottom: 8 }}
            />
            <TextInput
              label="Add Tag"
              value={tagInput}
              onChangeText={setTagInput}
              onSubmitEditing={addTag}
              onBlur={addTag}
              mode="outlined"
              style={{ marginBottom: 8 }}
              returnKeyType="done"
            />
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 8,
              }}
            >
              {tags.map((tag, index) => (
                <Button
                  key={index}
                  mode="outlined"
                  compact
                  style={{ margin: 4 }}
                  onPress={() => removeTag(tag)}
                  icon="close"
                >
                  {tag}
                </Button>
              ))}
            </View>
            <TextInput
              label="Todo Description"
              value={input}
              onChangeText={setInput}
              mode="outlined"
              multiline
              style={{ marginBottom: 8 }}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setModalVisible(false)}>Cancel</Button>
            <Button onPress={addOrUpdateTodo}>
              {editingTodo ? "Update" : "Add"}
            </Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={!!viewingTodo} onDismiss={() => setViewingTodo(null)}>
          <Dialog.Title style={{ textAlign: "center", fontWeight: "bold" }}>
            {viewingTodo?.title}
          </Dialog.Title>
          <Dialog.Content style={{ paddingHorizontal: 16 }}>
            <Text
              style={{
                marginBottom: 8,
                fontSize: 16,
                color: theme.colors.onSurface,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Title:</Text>{" "}
              {viewingTodo?.title}
            </Text>
            <Text
              style={{
                marginBottom: 8,
                fontSize: 16,
                color: theme.colors.onSurface,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Description:</Text>{" "}
              {viewingTodo?.description}
            </Text>
            <Text
              style={{
                marginBottom: 8,
                fontSize: 16,
                color: theme.colors.onSurface,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Tags:</Text>{" "}
              {viewingTodo?.tags.join(", ")}
            </Text>
            <Text
              style={{
                marginBottom: 8,
                fontSize: 16,
                color: theme.colors.onSurface,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Created:</Text>{" "}
              {viewingTodo?.createdAt
                ? new Date(viewingTodo.createdAt.toDate()).toLocaleString()
                : "N/A"}
            </Text>
            <Text
              style={{
                marginBottom: 8,
                fontSize: 16,
                color: theme.colors.onSurface,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Status:</Text>{" "}
              {viewingTodo?.completed ? "Completed" : "Pending"}
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={{ justifyContent: "center" }}>
            <Button
              onPress={() => setViewingTodo(null)}
              mode="contained"
              style={{
                width: "80%",
                borderRadius: 20,
                backgroundColor: theme.colors.primary,
              }}
              labelStyle={{ color: theme.colors.onPrimary, fontWeight: "bold" }}
            >
              CLOSE
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const screenOptions = {
  headerShown: false,
  tabBarIcon: ({ color, size }) => (
    <Icon name={"edit"} size={size} color={color} />
  ),
};

export { TodoComponent as TodoScreen, screenOptions };
