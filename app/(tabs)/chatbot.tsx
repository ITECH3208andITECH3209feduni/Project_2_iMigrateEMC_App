// app/chatbot.tsx
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import { Stack, router } from "expo-router";
import { ChevronLeft, User, LogOut } from "lucide-react-native";
import {
  ROOT_QUESTIONS,
  getFollowUps,
  getReplyWithDelay,
  makeId,
  type ChatMessage,
} from "../src/bot/faqBot";

type Mode = "root" | "followup";

const COLORS = {
  bg: "#FFFFFF",
  sectionBg: "#F7F7F8",
  card: "#FFFFFF",
  text: "#1F2937",
  subtext: "#6B7280",
  border: "#E5E7EB",
  primary: "#8C1D40",
  chipBg: "#F3F4F6",
  chipBorder: "#E5E7EB",
};

export default function ChatbotScreen() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<Mode>("root");
  const [rootKey, setRootKey] = useState<string | null>(null);

  const listRef = useRef<FlatList<ChatMessage>>(null);
  const scrollToEnd = useCallback(() => {
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
  }, []);

  const addMessage = useCallback((m: ChatMessage | ChatMessage[]) => {
    setChatMessages((prev) => (Array.isArray(m) ? [...prev, ...m] : [...prev, m]));
    scrollToEnd();
  }, [scrollToEnd]);

  const askAndReply = useCallback(async (text: string) => {
    addMessage({ id: makeId(), message: text, sender: "user" });
    const tempId = makeId();
    addMessage({ id: tempId, message: "Typing…", sender: "robot" });
    setLoading(true);
    const reply = await getReplyWithDelay(text, 350);
    setChatMessages((prev) => prev.map((m) => (m.id === tempId ? { ...m, message: reply } : m)));
    setLoading(false);
    scrollToEnd();
  }, [addMessage, scrollToEnd]);

  const handleRootTap = useCallback((q: string) => {
    setRootKey(q);
    setMode("followup");
    askAndReply(q);
  }, [askAndReply]);

  const handleFollowUpTap = useCallback((q: string) => {
    askAndReply(q);
  }, [askAndReply]);

  const goBackToRoot = useCallback(() => {
    setMode("root");
    setRootKey(null);
  }, []);

  const currentChips = useMemo(() => {
    if (mode === "root") return ROOT_QUESTIONS;
    return getFollowUps(rootKey ?? "") || [];
  }, [mode, rootKey]);

  const headerEmptyState = useMemo(
    () =>
      chatMessages.length === 0 ? (
        <View style={styles.welcomeWrap}>
          <Text style={styles.welcomeTitle}>Welcome to iMigrate Chat</Text>
          <Text style={styles.welcomeSub}>Pick a topic below to get started.</Text>
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
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.safe}>
        {/* Header */}
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

        {/* Body */}
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.select({ ios: "padding", android: undefined })}
          keyboardVerticalOffset={Platform.select({ ios: 80, android: 0 })}
        >
          <View style={styles.contentArea}>
            <View style={styles.card}>
              {/* Messages */}
              <FlatList
                ref={listRef}
                data={chatMessages}
                keyExtractor={(m) => m.id}
                renderItem={renderItem}
                ListHeaderComponent={headerEmptyState}
                contentContainerStyle={styles.listContent}
                onContentSizeChange={scrollToEnd}
              />

              {/* --- Sticky bottom chip bar (inside the card) --- */}
              <View style={styles.bottomBar}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.chipRow}
                >
                  {mode === "followup" && (
                    <TouchableOpacity
                      onPress={goBackToRoot}
                      style={[styles.chip, styles.chipGhost]}
                      activeOpacity={0.9}
                      disabled={loading}
                    >
                      <Text style={[styles.chipText, styles.chipGhostText]}>Back</Text>
                    </TouchableOpacity>
                  )}

                  {currentChips.map((q) => (
                    <TouchableOpacity
                      key={q}
                      onPress={() => (mode === "root" ? handleRootTap(q) : handleFollowUpTap(q))}
                      style={styles.chip}
                      activeOpacity={0.9}
                      disabled={loading}
                    >
                      <Text style={styles.chipText}>{q}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                {/* Typing / hint */}
                <View style={styles.statusRow}>
                  {loading ? (
                    <>
                      <ActivityIndicator />
                      <Text style={styles.statusText}>Agent is typing…</Text>
                    </>
                  ) : (
                    <Text style={styles.statusHint}>Select a question to continue</Text>
                  )}
                </View>
              </View>
            </View>
          </View>

          {/* Footer (unchanged) */}
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

  /* Messages */
  msgRow: { flexDirection: "row", marginBottom: 10, paddingHorizontal: 6 },
  msgRight: { justifyContent: "flex-end" },
  msgLeft: { justifyContent: "flex-start" },
  bubble: { maxWidth: 320, borderRadius: 14, paddingVertical: 10, paddingHorizontal: 14 },
  bubbleUser: { backgroundColor: COLORS.primary },
  bubbleBot: { backgroundColor: "#fff", borderWidth: 1, borderColor: COLORS.border },
  textUser: { color: "#fff", fontSize: 15, lineHeight: 22 },
  textBot: { color: COLORS.text, fontSize: 15, lineHeight: 22 },

  /* Sticky bottom chip bar */
  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 8,
    paddingBottom: 6,
    backgroundColor: "#fff",
  },
  chipRow: {
    gap: 8,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  chip: {
    backgroundColor: COLORS.chipBg,
    borderWidth: 1,
    borderColor: COLORS.chipBorder,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,            // proper pill shape
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  chipText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "600",
  },
  chipGhost: {
    backgroundColor: "#fff",
    borderColor: COLORS.chipBorder,
  },
  chipGhostText: {
    color: COLORS.subtext,
    fontWeight: "600",
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 6,
    paddingTop: 6,
  },
  statusText: { color: COLORS.text, fontSize: 13 },
  statusHint: { color: COLORS.subtext, fontSize: 13 },

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
