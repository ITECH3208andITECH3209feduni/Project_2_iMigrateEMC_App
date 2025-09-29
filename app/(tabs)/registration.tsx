import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,

} from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FormData {
  firstName: string;
  lastName: string;
  companyName: string;
  hasRegisteredBusiness: 'Yes' | 'No' | '';
  businessCategory: string;
  physicalOfficeAvailable: 'Yes' | 'No' | '';
  businessAddress: string;
  interestedInAdditionalOffices: 'Yes' | 'No' | '';
  businessDetails: string;
  willingToIncorporateMigrate: 'Yes' | 'No' | '';
  country: string;
  city: string;
  state: string;
  phoneNumber: string;
  email: string;
  additionalComments: string;
  agreeToDisclaimer: boolean;
}

const countries = ['Afghanistan', 'Australia', 'Canada', 'United States', 'United Kingdom', 'Other'];
const cities = ['Abbottabad', 'Karachi', 'Lahore', 'Islamabad', 'Other'];
const states = ['Select State...', 'Punjab', 'Sindh', 'KPK', 'Balochistan'];
const businessCategories = ['Select Category...', 'Technology', 'Healthcare', 'Education', 'Finance', 'Other'];

export default function Registration() {
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    companyName: '',
    hasRegisteredBusiness: '',
    businessCategory: '',
    physicalOfficeAvailable: '',
    businessAddress: '',
    interestedInAdditionalOffices: '',
    businessDetails: '',
    willingToIncorporateMigrate: '',
    country: '',
    city: '',
    state: '',
    phoneNumber: '',
    email: '',
    additionalComments: '',
    agreeToDisclaimer: false,
  });

  const [showDropdowns, setShowDropdowns] = useState({
    country: false,
    city: false,
    state: false,
    businessCategory: false,
  });

  const handleSubmit = () => {
    if (!formData.agreeToDisclaimer) {
      Alert.alert('Error', 'Please agree to the disclaimer to proceed.');
      return;
    }
    
    if (!formData.firstName || !formData.lastName || !formData.email) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    Alert.alert('Success', 'Your Expression of Interest has been submitted successfully!');
  };

  const renderRadioGroup = (value: string, onChange: (value: 'Yes' | 'No') => void) => (
    <View style={styles.radioGroup}>
      <TouchableOpacity
        style={styles.radioOption}
        onPress={() => onChange('Yes')}
      >
        <View style={[styles.radio, value === 'Yes' && styles.radioSelected]} />
        <Text style={styles.radioText}>Yes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.radioOption}
        onPress={() => onChange('No')}
      >
        <View style={[styles.radio, value === 'No' && styles.radioSelected]} />
        <Text style={styles.radioText}>No</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDropdown = (
    value: string,
    options: string[],
    placeholder: string,
    onSelect: (value: string) => void,
    dropdownKey: keyof typeof showDropdowns
  ) => (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setShowDropdowns(prev => ({ ...prev, [dropdownKey]: !prev[dropdownKey] }))}
      >
        <Text style={[styles.dropdownText, !value && styles.placeholderText]}>
          {value || placeholder}
        </Text>
        <Text style={{ fontSize: 16, color: '#666' }}>▼</Text>
      </TouchableOpacity>
      {showDropdowns[dropdownKey] && (
        <View style={styles.dropdownOptions}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={`${dropdownKey}-${option}`}
              style={styles.dropdownOption}
              onPress={() => {
                if (option && option.trim()) {
                  onSelect(option);
                }
                setShowDropdowns(prev => ({ ...prev, [dropdownKey]: false }));
              }}
            >
              <Text style={styles.dropdownOptionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <CheckCircle size={24} color="#22C55E" />
          <Text style={styles.headerText}>Expression of Interest (EOI) Details</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>First Name *</Text>
              <TextInput
                style={styles.input}
                value={formData.firstName}
                onChangeText={(text) => setFormData(prev => ({ ...prev, firstName: text }))}
                placeholder="Enter first name"
              />
            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Last Name *</Text>
              <TextInput
                style={styles.input}
                value={formData.lastName}
                onChangeText={(text) => setFormData(prev => ({ ...prev, lastName: text }))}
                placeholder="Enter last name"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Company Name *</Text>
              <TextInput
                style={styles.input}
                value={formData.companyName}
                onChangeText={(text) => setFormData(prev => ({ ...prev, companyName: text }))}
                placeholder="Enter company name"
              />
            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Do you have registered business? *</Text>
              {renderRadioGroup(
                formData.hasRegisteredBusiness,
                (value) => setFormData(prev => ({ ...prev, hasRegisteredBusiness: value }))
              )}
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Is a physical office available for collaboration? (Yes/No) *</Text>
              {renderRadioGroup(
                formData.physicalOfficeAvailable,
                (value) => setFormData(prev => ({ ...prev, physicalOfficeAvailable: value }))
              )}
            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Business Category *</Text>
              {renderDropdown(
                formData.businessCategory,
                businessCategories,
                'Select Category...',
                (value) => setFormData(prev => ({ ...prev, businessCategory: value })),
                'businessCategory'
              )}
            </View>
          </View>

          <View style={styles.fullWidth}>
            <Text style={styles.label}>Business Address</Text>
            <TextInput
              style={styles.input}
              value={formData.businessAddress}
              onChangeText={(text) => setFormData(prev => ({ ...prev, businessAddress: text }))}
              placeholder="Enter business address"
            />
          </View>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Are you interested in opening additional offices? (Yes/No) *</Text>
              {renderRadioGroup(
                formData.interestedInAdditionalOffices,
                (value) => setFormData(prev => ({ ...prev, interestedInAdditionalOffices: value }))
              )}
            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Business Details</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.businessDetails}
                onChangeText={(text) => setFormData(prev => ({ ...prev, businessDetails: text }))}
                placeholder="Enter business details"
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          <View style={styles.fullWidth}>
            <Text style={styles.label}>Are you willing to incorporate &quot;iMigrate&quot; into your business name as a franchise model? *</Text>
            {renderRadioGroup(
              formData.willingToIncorporateMigrate,
              (value) => setFormData(prev => ({ ...prev, willingToIncorporateMigrate: value }))
            )}
          </View>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Country *</Text>
              {renderDropdown(
                formData.country,
                countries,
                'Afghanistan',
                (value) => setFormData(prev => ({ ...prev, country: value })),
                'country'
              )}
            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>City *</Text>
              {renderDropdown(
                formData.city,
                cities,
                'Abbottabad',
                (value) => setFormData(prev => ({ ...prev, city: value })),
                'city'
              )}
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>State</Text>
              {renderDropdown(
                formData.state,
                states,
                'Select State...',
                (value) => setFormData(prev => ({ ...prev, state: value })),
                'state'
              )}
            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Phone Number *</Text>
              <TextInput
                style={styles.input}
                value={formData.phoneNumber}
                onChangeText={(text) => setFormData(prev => ({ ...prev, phoneNumber: text }))}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Email *</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                placeholder="Enter email address"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Any Additional Comments</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.additionalComments}
                onChangeText={(text) => setFormData(prev => ({ ...prev, additionalComments: text }))}
                placeholder="Enter additional comments"
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerTitle}>Disclaimer:</Text>
            <Text style={styles.disclaimerText}>
              By submitting this Expression of Interest (EOI) form, you, as our partner, hereby declare and agree to the following:
            </Text>
            <Text style={styles.disclaimerPoint}>
              1. The information provided in this EOI is true, accurate, and complete to the best of your knowledge.
            </Text>
            <Text style={styles.disclaimerPoint}>
              2. You understand that any misrepresentation or omission of relevant information may result in the rejection or termination of the collaboration and potential legal consequences.
            </Text>
          </View>

          <View style={styles.agreementSection}>
            <Text style={styles.label}>I Have Read and Agree with the Disclaimer? (Yes/No) *</Text>
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setFormData(prev => ({ ...prev, agreeToDisclaimer: !prev.agreeToDisclaimer }))}
            >
              <View style={[styles.radio, formData.agreeToDisclaimer && styles.radioSelected]} />
              <Text style={styles.radioText}>Yes</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#22C55E',
    marginLeft: 10,
  },
  form: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 15,
  },
  halfWidth: {
    flex: 1,
  },
  fullWidth: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#fff',
    color: '#374151',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 5,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
  },
  radioSelected: {
    borderColor: '#8C1D40',
    backgroundColor: '#8C1D40',
  },
  radioText: {
    fontSize: 14,
    color: '#374151',
  },
  dropdownContainer: {
    position: 'relative',
    zIndex: 1000,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    padding: 12,
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 14,
    color: '#374151',
  },
  placeholderText: {
    color: '#9ca3af',
  },
  dropdownOptions: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderTopWidth: 0,
    borderRadius: 6,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    maxHeight: 200,
    zIndex: 1001,
  },
  dropdownOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  dropdownOptionText: {
    fontSize: 14,
    color: '#374151',
  },
  disclaimer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  disclaimerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 10,
    lineHeight: 20,
  },
  disclaimerPoint: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
    lineHeight: 20,
  },
  agreementSection: {
    marginBottom: 30,
  },
  submitButton: {
    backgroundColor: '#8C1D40',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 6,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});