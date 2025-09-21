import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, TextInput, useColorScheme } from "react-native";
import { Video } from "expo-av";

const channels = [
  { id: "1", name: "CNN", url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", category: "Notícias" },
  { id: "2", name: "ESPN", url: "https://test-streams.mux.dev/test_001/stream.m3u8", category: "Esportes" },
  { id: "3", name: "HBO", url: "https://test-streams.mux.dev/pts_shift/master.m3u8", category: "Filmes" }
];

export default function App() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const scheme = useColorScheme();

  const filtered = channels.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: scheme === "dark" ? "#000" : "#fff", padding: 10 }}>
      <TextInput
        placeholder="🔍 Buscar canal..."
        placeholderTextColor={scheme === "dark" ? "#aaa" : "#555"}
        value={search}
        onChangeText={setSearch}
        style={{
          backgroundColor: scheme === "dark" ? "#222" : "#eee",
          color: scheme === "dark" ? "#fff" : "#000",
          padding: 10,
          borderRadius: 8,
          marginBottom: 10
        }}
      />

      {selected ? (
        <View style={{ flex: 1 }}>
          <Video
            source={{ uri: selected.url }}
            useNativeControls
            resizeMode="contain"
            shouldPlay
            style={{ flex: 1, borderRadius: 8, backgroundColor: "#000" }}
          />
          <TouchableOpacity onPress={() => setSelected(null)} style={{ padding: 10, backgroundColor: "#e74c3c", borderRadius: 8, marginTop: 10 }}>
            <Text style={{ color: "#fff", textAlign: "center" }}>⬅️ Voltar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelected(item)}
              style={{
                padding: 15,
                backgroundColor: scheme === "dark" ? "#333" : "#f5f5f5",
                marginBottom: 8,
                borderRadius: 8
              }}
            >
              <Text style={{ color: scheme === "dark" ? "#fff" : "#000", fontSize: 16 }}>
                {item.name} ({item.category})
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}