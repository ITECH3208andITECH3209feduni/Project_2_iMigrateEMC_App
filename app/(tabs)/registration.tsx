import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  Alert,
  SafeAreaView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { Calendar, ChevronLeft, ChevronRight, CheckCircle, X } from "lucide-react-native";

type YesNo = "Yes" | "No" | "";

type EoiForm = {
  firstName: string;
  lastName: string;
  companyName: string;
  hasRegisteredBusiness: YesNo;
  businessCategory: string;
  businessAddress: string;
  officeAvailable: YesNo;
  willingFranchise: YesNo;
  openMoreOffices: YesNo;
  businessDetails: string;

  country: string;
  state: string;
  city: string;
  email: string;
  phone: string;

  disclaimerAccepted: boolean;
  comments: string;
};

const BRAND = "#8C1D40";

const COUNTRIES = [
  "Afghanistan", "Australia", "Bangladesh", "Canada", "India",
  "New Zealand", "Pakistan", "Sri Lanka", "United Arab Emirates", "United Kingdom", "United States",
];

const CATEGORIES = [
  "Education Consultant",
  "Migration/Immigration",
  "Travel Agency",
  "Legal/Compliance",
  "Other",
];

export default function EoiScreen() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [form, setForm] = useState<EoiForm>({
    firstName: "",
    lastName: "",
    companyName: "",
    hasRegisteredBusiness: "",
    businessCategory: "",
    businessAddress: "",
    officeAvailable: "",
    willingFranchise: "",
    openMoreOffices: "",
    businessDetails: "",

    country: "Afghanistan",
    state: "",
    city: "",
    email: "",
    phone: "",

    disclaimerAccepted: false,
    comments: "",
  });

  const [showCountrySheet, setShowCountrySheet] = useState(false);
  const [showCategorySheet, setShowCategorySheet] = useState(false);

  const canNext = useMemo(() => {
    if (step === 1) {
      return (
        !!form.firstName.trim() &&
        !!form.lastName.trim() &&
        !!form.companyName.trim()
      );
    }
    if (step === 2) {
      return (
        !!form.hasRegisteredBusiness &&
        !!form.businessCategory &&
        !!form.officeAvailable &&
        !!form.willingFranchise &&
        !!form.openMoreOffices
      );
    }
    if (step === 3) {
      return (
        !!form.country &&
        !!form.city.trim() &&
        !!form.email.trim() &&
        validateEmail(form.email)
      );
    }
    if (step === 4) {
      return form.disclaimerAccepted;
    }
    return false;
  }, [step, form]);

  const onSubmit = () => {
    if (!canNext) return;

    // Replace with your API call
    Alert.alert(
      "EOI submitted",
      "Thanks for your interest. Our team will contact you shortly.",
      [{ text: "OK", onPress: () => router.back() }],
    );
  };

  const set = <K extends keyof EoiForm>(key: K, value: EoiForm[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
          <ChevronLeft size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Expression of Interest</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Progress */}
      <View style={styles.progressWrap}>
        <ProgressDot active={step >= 1} label="Details" />
        <ProgressConnector />
        <ProgressDot active={step >= 2} label="Business" />
        <ProgressConnector />
        <ProgressDot active={step >= 3} label="Location" />
        <ProgressConnector />
        <ProgressDot active={step >= 4} label="Agreement" />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
        {step === 1 && (
          <Card title="EOI Details">
            <Input label="First Name *" value={form.firstName} onChangeText={(v) => set("firstName", v)} />
            <Input label="Last Name *" value={form.lastName} onChangeText={(v) => set("lastName", v)} />
            <Input label="Company Name *" value={form.companyName} onChangeText={(v) => set("companyName", v)} />
          </Card>
        )}

        {step === 2 && (
          <>
            <Card title="Business">
              <RadioRow
                label="Do you have registered business? *"
                value={form.hasRegisteredBusiness}
                onChange={(v) => set("hasRegisteredBusiness", v)}
              />
              <SelectRow
                label="Business Category *"
                value={form.businessCategory || "Select Category..."}
                onPress={() => setShowCategorySheet(true)}
              />
              <Input
                label="Business Address"
                value={form.businessAddress}
                onChangeText={(v) => set("businessAddress", v)}
                placeholder="Street, City, State"
              />
              <RadioRow
                label="Is a physical office available for collaboration? *"
                value={form.officeAvailable}
                onChange={(v) => set("officeAvailable", v)}
              />
              <RadioRow
                label={`Are you willing to incorporate "iMigrate" into your business name as a franchise model? *`}
                value={form.willingFranchise}
                onChange={(v) => set("willingFranchise", v)}
              />
              <RadioRow
                label="Are you interested in opening additional offices? *"
                value={form.openMoreOffices}
                onChange={(v) => set("openMoreOffices", v)}
              />
              <Input
                label="Business Details"
                value={form.businessDetails}
                onChangeText={(v) => set("businessDetails", v)}
                multiline
              />
            </Card>
          </>
        )}

        {step === 3 && (
          <Card title="Location & Contact">
            <SelectRow label="Country *" value={form.country} onPress={() => setShowCountrySheet(true)} />
            <Input label="State" value={form.state} onChangeText={(v) => set("state", v)} />
            <Input label="City *" value={form.city} onChangeText={(v) => set("city", v)} />
            <Input
              label="Email *"
              keyboardType="email-address"
              autoCapitalize="none"
              value={form.email}
              onChangeText={(v) => set("email", v)}
              error={!!form.email && !validateEmail(form.email) ? "Enter a valid email" : ""}
            />
            <Input
              label="Phone Number"
              keyboardType="phone-pad"
              value={form.phone}
              onChangeText={(v) => set("phone", v)}
            />
            <Input
              label="Any Additional Comments"
              value={form.comments}
              onChangeText={(v) => set("comments", v)}
              multiline
            />
          </Card>
        )}

        {step === 4 && (
          <Card title="Disclaimer">
            <Disclaimer />
            <CheckboxRow
              checked={form.disclaimerAccepted}
              onToggle={() => set("disclaimerAccepted", !form.disclaimerAccepted)}
              label="I have read and agree with the Disclaimer. *"
            />
          </Card>
        )}
      </ScrollView>

      {/* Footer actions */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.ghostBtn, step === 1 && styles.hidden]}
          onPress={() => setStep((s) => (s > 1 ? ((s - 1) as any) : s))}
        >
          <ChevronLeft size={18} color={BRAND} />
          <Text style={styles.ghostText}>Back</Text>
        </TouchableOpacity>

        {step < 4 ? (
          <TouchableOpacity
            style={[styles.primaryBtn, !canNext && styles.disabledBtn]}
            disabled={!canNext}
            onPress={() => setStep((s) => ((s + 1) as any))}
          >
            <Text style={styles.primaryText}>Next</Text>
            <ChevronRight size={18} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.primaryBtn, !canNext && styles.disabledBtn]}
            disabled={!canNext}
            onPress={onSubmit}
          >
            <CheckCircle size={18} color="#fff" />
            <Text style={styles.primaryText}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Country Sheet */}
      <BottomSheet
        title="Select Country"
        visible={showCountrySheet}
        onClose={() => setShowCountrySheet(false)}
        items={COUNTRIES}
        onSelect={(v) => {
          set("country", v);
          setShowCountrySheet(false);
        }}
        selected={form.country}
      />

      {/* Category Sheet */}
      <BottomSheet
        title="Business Category"
        visible={showCategorySheet}
        onClose={() => setShowCategorySheet(false)}
        items={CATEGORIES}
        onSelect={(v) => {
          set("businessCategory", v);
          setShowCategorySheet(false);
        }}
        selected={form.businessCategory}
      />
    </SafeAreaView>
  );
}

/* ---------- Small UI Primitives ---------- */

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Calendar size={18} color={BRAND} />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

function Input({
  label,
  value,
  onChangeText,
  placeholder,
  multiline,
  keyboardType,
  autoCapitalize,
  error,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: "default" | "email-address" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  error?: string;
}) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        style={[styles.input, multiline && styles.inputMultiline]}
        multiline={multiline}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

function RadioRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: YesNo;
  onChange: (v: YesNo) => void;
}) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.radioRow}>
        <Radio value={value} onChange={onChange} option="Yes" />
        <Radio value={value} onChange={onChange} option="No" />
      </View>
    </View>
  );
}

function Radio({
  value,
  onChange,
  option,
}: {
  value: YesNo;
  onChange: (v: YesNo) => void;
  option: YesNo;
}) {
  const checked = value === option;
  return (
    <Pressable style={styles.radioItem} onPress={() => onChange(option)}>
      <View style={[styles.radioOuter, checked && { borderColor: BRAND }]}>
        {checked && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.radioText}>{option}</Text>
    </Pressable>
  );
}

function CheckboxRow({
  checked,
  onToggle,
  label,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <Pressable style={styles.checkboxRow} onPress={onToggle}>
      <View style={[styles.checkboxBox, checked && { backgroundColor: BRAND, borderColor: BRAND }]} />
      <Text style={styles.checkboxText}>{label}</Text>
    </Pressable>
  );
}

function SelectRow({
  label,
  value,
  onPress,
}: {
  label: string;
  value: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={{ marginBottom: 14 }} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.selectBox}>
        <Text style={styles.selectText}>{value}</Text>
        <ChevronRight size={18} color="#666" />
      </View>
    </Pressable>
  );
}

function BottomSheet({
  title,
  visible,
  onClose,
  items,
  onSelect,
  selected,
}: {
  title: string;
  visible: boolean;
  onClose: () => void;
  items: string[];
  onSelect: (v: string) => void;
  selected?: string;
}) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.sheetBackdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>{title}</Text>
          <TouchableOpacity onPress={onClose} style={styles.sheetClose}>
            <X size={18} color="#666" />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ maxHeight: 360 }}>
          {items.map((item) => {
            const isActive = selected === item;
            return (
              <Pressable
                key={item}
                onPress={() => onSelect(item)}
                style={[styles.sheetItem, isActive && styles.sheetItemActive]}
              >
                <Text style={[styles.sheetItemText, isActive && styles.sheetItemTextActive]}>
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </Modal>
  );
}

function ProgressDot({ active, label }: { active: boolean; label: string }) {
  return (
    <View style={styles.dotWrap}>
      <View style={[styles.dot, active ? { backgroundColor: BRAND } : { backgroundColor: "#ddd" }]} />
      <Text style={styles.dotLabel}>{label}</Text>
    </View>
  );
}
function ProgressConnector() {
  return <View style={styles.connector} />;
}

function Disclaimer() {
  return (
    <View style={styles.disclaimerBox}>
      <Text style={styles.disclaimerText}>
        1. The information provided in this EOI is true, accurate, and complete to the best of your knowledge.
      </Text>
      <Text style={styles.disclaimerText}>
        2. Any misrepresentation or omission may result in rejection or termination of collaboration and legal consequences.
      </Text>
      <Text style={styles.disclaimerText}>
        3. iMigrate EMC may use this information to assess partnership suitability and contact you for next steps.
      </Text>
    </View>
  );
}

function validateEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8f9fa" },
  header: {
    backgroundColor: BRAND,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700", flex: 1, textAlign: "center" },

  progressWrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dotWrap: { alignItems: "center" },
  dot: { width: 12, height: 12, borderRadius: 6 },
  connector: { flex: 1, height: 2, backgroundColor: "#e5e5e5", marginHorizontal: 8 },
  dotLabel: { fontSize: 10, color: "#666", marginTop: 6 },

  container: { flex: 1, paddingHorizontal: 16 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#333" },

  label: { fontSize: 12, color: "#555", marginBottom: 6 },
  input: {
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#e2e2e2",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: Platform.select({ ios: 12, android: 10 }),
    color: "#333",
  },
  inputMultiline: { minHeight: 96, textAlignVertical: "top" },
  error: { color: "#C62828", fontSize: 11, marginTop: 6 },

  radioRow: { flexDirection: "row", gap: 16 },
  radioItem: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 4 },
  radioOuter: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: "#bbb", justifyContent: "center", alignItems: "center" },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: BRAND },
  radioText: { color: "#333", fontSize: 13 },

  checkboxRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 8 },
  checkboxBox: { width: 18, height: 18, borderRadius: 4, borderWidth: 1.5, borderColor: "#bbb", backgroundColor: "#fff" },
  checkboxText: { color: "#333", fontSize: 13, flex: 1 },

  selectBox: {
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#e2e2e2",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectText: { color: "#333", fontSize: 14 },

  disclaimerBox: {
    backgroundColor: "#fff7f8",
    borderWidth: 1,
    borderColor: "#ffe3e7",
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  disclaimerText: { color: "#555", fontSize: 12, lineHeight: 18 },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    padding: 12,
    flexDirection: "row",
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: BRAND,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  primaryText: { color: "#fff", fontSize: 15, fontWeight: "700" },
  disabledBtn: { backgroundColor: "#d7b0bb" },
  ghostBtn: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: BRAND,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ghostText: { color: BRAND, fontWeight: "700" },
  hidden: { opacity: 0 },

  sheetBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)" },
  sheet: {
    position: "absolute",
    left: 0, right: 0, bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 16,
    maxHeight: "80%",
  },
  sheetHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: "#eee",
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
  },
  sheetTitle: { fontWeight: "700", color: "#333", fontSize: 16 },
  sheetClose: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#f3f3f3", alignItems: "center", justifyContent: "center" },
  sheetItem: { paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: "#f4f4f4" },
  sheetItemActive: { backgroundColor: "#f9f2f4" },
  sheetItemText: { color: "#333", fontSize: 14 },
  sheetItemTextActive: { color: BRAND, fontWeight: "700" },
});
