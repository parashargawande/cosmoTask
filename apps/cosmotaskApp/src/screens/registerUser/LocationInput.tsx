import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";

type Suggestion = {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
};

interface ILocationInput {
  readonly value: { name: string; coordinates: string } | null;
  readonly onChange: (location: { name: string; coordinates: string }) => void;
}
export default function LocationInput({ value, onChange }: ILocationInput) {
  const [query, setQuery] = useState("");
  const [coordinates, setCoordinates] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    // Sync external value (coordinates and name) with the component
    if (value) {
      const { name, coordinates } = value;
      setQuery(name);
      setCoordinates(coordinates);
    }
  }, [value]);

  useEffect(() => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = setTimeout(() => {
      axios
        .get("https://nominatim.openstreetmap.org/search", {
          params: {
            q: query,
            format: "json",
            addressdetails: 1,
            limit: 5,
          },
          headers: {
            "User-Agent": "React Native App",
          },
        })
        .then((res) => {
          setSuggestions(res.data);
          setShowSuggestions(true);
        })
        .catch((err) => console.error(err));
    }, 400);

    return () => clearTimeout(fetchSuggestions);
  }, [query]);

  const handleSelect = (place: Suggestion) => {
    console.log("Selected place:", place);

    const coords = `${place.lat},${place.lon}`;
    const selectedPlace = {
      name: place.display_name,
      coordinates: coords,
    };

    setQuery(place.display_name); // Show place name in the input field
    setCoordinates(coords); // Save coordinates internally
    onChange(selectedPlace); // Send name and coordinates to the form
    setShowSuggestions(false);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        value={query} // Display the place name
        onChangeText={(text) => {
          setQuery(text); // Update the displayed query
          setShowSuggestions(false); // Hide suggestions while typing
        }}
        placeholder="Enter birth location"
      />
      {showSuggestions && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.place_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              style={styles.suggestionItem}
            >
              <Text>{item.display_name}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionsList}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  suggestionsList: {
    backgroundColor: "#fff",
    maxHeight: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 4,
    borderRadius: 4,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
