// app/chatbot.tsx
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import { Stack, router } from "expo-router";
import { ChevronLeft, User, LogOut } from "lucide-react-native";

type Sender = "user" | "robot";
type ChatMessage = { id: string; message: string; sender: Sender };

const COLORS = {
  bg: "#FFFFFF",
  sectionBg: "#F7F7F8",
  card: "#FFFFFF",
  text: "#1F2937",
  subtext: "#6B7280",
  border: "#E5E7EB",
  primary: "#8C1D40",
  primaryDark: "#6F1F2F",
};

export default function ChatbotScreen() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList<ChatMessage>>(null);

  const scrollToEnd = useCallback(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollToEnd({ animated: true });
    });
  }, []);

  const addMessage = useCallback(
    (m: ChatMessage | ChatMessage[]) => {
      setChatMessages((prev) => (Array.isArray(m) ? [...prev, ...m] : [...prev, m]));
      scrollToEnd();
    },
    [scrollToEnd]
  );

  const sendMessage = useCallback(async () => {
    const trimmed = inputText.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID?.() ?? String(Date.now()),
      message: trimmed,
      sender: "user",
    };

    setInputText("");
    addMessage(userMsg);

    const loadingId = crypto.randomUUID?.() ?? String(Date.now() + 1);
    const loadingMsg: ChatMessage = {
      id: loadingId,
      message: "Loading...",
      sender: "robot",
    };
    addMessage(loadingMsg);
    setLoading(true);

    try {
      const res = await fetch("https://chatbotbackend-l1ro.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: trimmed }),
      });

      const ok = res.ok;
      const data = ok ? await res.json() : null;
      const reply =
        data?.botReply ?? (ok ? "No reply received." : "Error: could not connect to chatbot.");

      setChatMessages((prev) =>
        prev.map((m) => (m.id === loadingId ? { ...m, message: reply } : m))
      );
    } catch {
      setChatMessages((prev) =>
        prev.map((m) =>
          m.id === loadingId ? { ...m, message: "Error: could not connect to chatbot." } : m
        )
      );
    } finally {
      setLoading(false);
      scrollToEnd();
      Keyboard.dismiss();
    }
  }, [inputText, loading, addMessage, scrollToEnd]);

  const headerEmptyState = useMemo(
    () =>
      chatMessages.length === 0 ? (
        <View style={styles.welcomeWrap}>
          <Text style={styles.welcomeTitle}>Welcome to iMigrate Chat</Text>
          <Text style={styles.welcomeSub}>Ask anything about your visa journey.</Text>
        </View>
      ) : null,
    [chatMessages.length]
  );

  const renderItem = useCallback(({ item }: { item: ChatMessage }) => {
    const isUser = item.sender === "user";
    return (
      <View style={[styles.msgRow, isUser ? styles.msgRight : styles.msgLeft]}>
        <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleBot]}>
          <Text style={isUser ? styles.textUser : styles.textBot}>{item.message}</Text>
        </View>
      </View>
    );
  }, []);

  return (
    <>
      {/* Hide Expo header for this screen */}
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView style={styles.safe}>
        {/* Custom Header (matches your other pages) */}
        <View style={styles.topHeader}>
          <View style={styles.headerInner}>
            <View style={styles.headerLeft}>
              <TouchableOpacity style={styles.iconCircle} onPress={() => router.back()}>
                <ChevronLeft size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <Image
              source={{
                uri: "https://imigrateemc.com/web/image/website/1/logo/imigrateemc?unique=6d04d39",
              }}
              style={styles.logo}
              resizeMode="contain"
            />

            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.iconCircle}>
                <User size={20} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconCircle} onPress={() => router.replace("/login")}>
                <LogOut size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Content */}
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.select({ ios: "padding", android: undefined })}
          keyboardVerticalOffset={Platform.select({ ios: 80, android: 0 })}
        >
          <View style={styles.contentArea}>
            <View style={styles.card}>
              <FlatList
                ref={listRef}
                data={chatMessages}
                keyExtractor={(m) => m.id}
                renderItem={renderItem}
                ListHeaderComponent={headerEmptyState}
                contentContainerStyle={styles.listContent}
                onContentSizeChange={scrollToEnd}
              />

              {/* Input Bar */}
              <View style={styles.inputBar}>
                <TextInput
                  style={styles.input}
                  placeholder="Send a message to Chatbot"
                  placeholderTextColor="#9CA3AF"
                  value={inputText}
                  onChangeText={setInputText}
                  onSubmitEditing={sendMessage}
                  returnKeyType="send"
                  blurOnSubmit={false}
                />
                <TouchableOpacity
                  onPress={sendMessage}
                  disabled={loading}
                  activeOpacity={0.9}
                  style={[styles.sendBtn, loading && { opacity: 0.8 }]}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.sendText}>Send</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Footer (simple + consistent with your site’s feel) */}
          <View style={styles.footer}>
            <ScrollView
              horizontal
              contentContainerStyle={styles.footerRow}
              showsHorizontalScrollIndicator={false}
            >
              <Text style={styles.footerText}>Contact us</Text>
              <Text style={styles.footerDot}>•</Text>
              <Text style={styles.footerText}>info@imigrateemc.com.au</Text>
              <Text style={styles.footerDot}>•</Text>
              <Text style={styles.footerText}>(0061) 490 549 001</Text>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  flex: { flex: 1 },

  /* Header */
  topHeader: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerInner: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: { width: 72, flexDirection: "row", gap: 8 },
  headerRight: { width: 72, flexDirection: "row", gap: 8, justifyContent: "flex-end" },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: { width: 140, height: 48 },

  /* Main content */
  contentArea: { flex: 1, padding: 16, backgroundColor: COLORS.sectionBg },
  card: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  listContent: { paddingTop: 8, paddingBottom: 12 },

  /* Empty state */
  welcomeWrap: { alignItems: "center", paddingVertical: 12 },
  welcomeTitle: { fontSize: 18, fontWeight: "800", color: COLORS.text, marginBottom: 4 },
  welcomeSub: { fontSize: 14, color: COLORS.subtext },

  /* Messages */
  msgRow: { flexDirection: "row", marginBottom: 10, paddingHorizontal: 6 },
  msgRight: { justifyContent: "flex-end" },
  msgLeft: { justifyContent: "flex-start" },
  bubble: { maxWidth: 320, borderRadius: 14, paddingVertical: 10, paddingHorizontal: 14 },
  bubbleUser: { backgroundColor: COLORS.primary },
  bubbleBot: { backgroundColor: "#fff", borderWidth: 1, borderColor: COLORS.border },
  textUser: { color: "#fff", fontSize: 15, lineHeight: 22 },
  textBot: { color: COLORS.text, fontSize: 15, lineHeight: 22 },

  /* Input */
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    padding: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: Platform.select({ ios: 12, android: 10 }),
    fontSize: 15,
    color: COLORS.text,
  },
  sendBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    marginLeft: 6,
    minWidth: 70,
    alignItems: "center",
  },
  sendText: { color: "#fff", fontSize: 15, fontWeight: "700" },

  /* Footer */
  footer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  footerRow: { alignItems: "center", gap: 10 },
  footerText: { color: "#6b7280", fontSize: 13 },
  footerDot: { color: "#9ca3af", fontSize: 13 },
});
