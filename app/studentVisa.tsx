import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router, Stack } from 'expo-router';
import { ArrowLeft, Upload } from 'lucide-react-native';

export default function StudentVisaScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    nationality: '',
    passportNumber: '',
    institutionName: '',
    courseOfStudy: '',
    courseDuration: '',
    intakeDate: '',
    tuitionFees: '',
    financialSupport: '',
    previousEducation: '',
    englishProficiency: '',
    additionalInfo: ''
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!agreedToTerms) {
      Alert.alert('Error', 'Please agree to the terms and conditions');
      return;
    }
    
    // Check if required fields are filled
    const requiredFields = ['fullName', 'email', 'phoneNumber', 'passportNumber', 'institutionName', 'courseOfStudy'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Application Submitted',
      'Your student visa application has been submitted successfully. You will be redirected to book an appointment.',
      [{ text: 'OK', onPress: () => router.push('/(tabs)/appointment') }]
    );
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Student Visa Application',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ArrowLeft size={24} color="#8C1D40" />
            </TouchableOpacity>
          ),
        }} 
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Student Visa Application</Text>
          <Text style={styles.formSubtitle}>Please fill in all required information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              value={formData.fullName}
              onChangeText={(value) => handleInputChange('fullName', value)}
              placeholder="Enter your full name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address *</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              value={formData.phoneNumber}
              onChangeText={(value) => handleInputChange('phoneNumber', value)}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput
              style={styles.input}
              value={formData.dateOfBirth}
              onChangeText={(value) => handleInputChange('dateOfBirth', value)}
              placeholder="DD/MM/YYYY"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nationality</Text>
            <TextInput
              style={styles.input}
              value={formData.nationality}
              onChangeText={(value) => handleInputChange('nationality', value)}
              placeholder="Enter your nationality"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Passport Number *</Text>
            <TextInput
              style={styles.input}
              value={formData.passportNumber}
              onChangeText={(value) => handleInputChange('passportNumber', value)}
              placeholder="Enter passport number"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Institution Name *</Text>
            <TextInput
              style={styles.input}
              value={formData.institutionName}
              onChangeText={(value) => handleInputChange('institutionName', value)}
              placeholder="Enter institution name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Course of Study *</Text>
            <TextInput
              style={styles.input}
              value={formData.courseOfStudy}
              onChangeText={(value) => handleInputChange('courseOfStudy', value)}
              placeholder="Enter course name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Course Duration</Text>
            <TextInput
              style={styles.input}
              value={formData.courseDuration}
              onChangeText={(value) => handleInputChange('courseDuration', value)}
              placeholder="e.g., 2 years"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Intake Date</Text>
            <TextInput
              style={styles.input}
              value={formData.intakeDate}
              onChangeText={(value) => handleInputChange('intakeDate', value)}
              placeholder="MM/YYYY"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tuition Fees</Text>
            <TextInput
              style={styles.input}
              value={formData.tuitionFees}
              onChangeText={(value) => handleInputChange('tuitionFees', value)}
              placeholder="Enter amount"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Financial Support</Text>
            <TextInput
              style={styles.input}
              value={formData.financialSupport}
              onChangeText={(value) => handleInputChange('financialSupport', value)}
              placeholder="Source of funding"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Previous Education</Text>
            <TextInput
              style={styles.input}
              value={formData.previousEducation}
              onChangeText={(value) => handleInputChange('previousEducation', value)}
              placeholder="Highest qualification"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>English Proficiency</Text>
            <TextInput
              style={styles.input}
              value={formData.englishProficiency}
              onChangeText={(value) => handleInputChange('englishProficiency', value)}
              placeholder="IELTS/TOEFL score"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Additional Information</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.additionalInfo}
              onChangeText={(value) => handleInputChange('additionalInfo', value)}
              placeholder="Any additional information"
              multiline
              numberOfLines={4}
            />
          </View>

          <TouchableOpacity style={styles.uploadButton}>
            <Upload size={20} color="#8C1D40" />
            <Text style={styles.uploadText}>Upload Documents</Text>
          </TouchableOpacity>

          <View style={styles.checkboxContainer}>
            <TouchableOpacity 
              style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}
              onPress={() => setAgreedToTerms(!agreedToTerms)}
            >
              {agreedToTerms && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
            <Text style={styles.checkboxText}>
              I agree to the terms and conditions and confirm that all information provided is accurate.
            </Text>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Application</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  backButton: {
    padding: 8,
  },
  formContainer: {
    padding: 24,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#8C1D40',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 20,
    marginBottom: 24,
  },
  uploadText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#8C1D40',
    fontWeight: '600',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#8C1D40',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#8C1D40',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  submitButton: {
    backgroundColor: '#8C1D40',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});