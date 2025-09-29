import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { GraduationCap, Plane, Briefcase, ArrowRight, CheckCircle } from 'lucide-react-native';
import ChatBot from '@/components/ChatBot';

export default function VisaScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>Choose Your Visa Type</Text>
        <Text style={styles.headerSubtitle}>
          Select the visa category that best matches your travel purpose
        </Text>
      </View>

      <View style={styles.categoryContainer}>
        <TouchableOpacity 
          style={styles.categoryCard}
          onPress={() => router.push('/studentVisa')}
        >
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <GraduationCap size={32} color="#8C1D40" />
            </View>
            <View style={styles.arrowIcon}>
              <ArrowRight size={20} color="#8C1D40" />
            </View>
          </View>
          
          <Text style={styles.categoryCardTitle}>Student Visa</Text>
          <Text style={styles.categoryCardDescription}>
            Study abroad programs, university admissions, and academic guidance
          </Text>
          
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <CheckCircle size={14} color="#4CAF50" />
              <Text style={styles.featureText}>University Selection</Text>
            </View>
            <View style={styles.featureItem}>
              <CheckCircle size={14} color="#4CAF50" />
              <Text style={styles.featureText}>Application Support</Text>
            </View>
            <View style={styles.featureItem}>
              <CheckCircle size={14} color="#4CAF50" />
              <Text style={styles.featureText}>IELTS/TOEFL Guidance</Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.categoryCard}
          onPress={() => router.push('/visitVisa')}
        >
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Plane size={32} color="#8C1D40" />
            </View>
            <View style={styles.arrowIcon}>
              <ArrowRight size={20} color="#8C1D40" />
            </View>
          </View>
          
          <Text style={styles.categoryCardTitle}>Visit Visa</Text>
          <Text style={styles.categoryCardDescription}>
            Tourism, family visits, business travel, and short-term stays
          </Text>
          
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <CheckCircle size={14} color="#4CAF50" />
              <Text style={styles.featureText}>Document Preparation</Text>
            </View>
            <View style={styles.featureItem}>
              <CheckCircle size={14} color="#4CAF50" />
              <Text style={styles.featureText}>Interview Coaching</Text>
            </View>
            <View style={styles.featureItem}>
              <CheckCircle size={14} color="#4CAF50" />
              <Text style={styles.featureText}>Travel Itinerary</Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.categoryCard}
          onPress={() => router.push('/workVisa')}
        >
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Briefcase size={32} color="#8C1D40" />
            </View>
            <View style={styles.arrowIcon}>
              <ArrowRight size={20} color="#8C1D40" />
            </View>
          </View>
          
          <Text style={styles.categoryCardTitle}>Work/Immigration Visa</Text>
          <Text style={styles.categoryCardDescription}>
            Employment opportunities, permanent residency, and skilled migration
          </Text>
          
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <CheckCircle size={14} color="#4CAF50" />
              <Text style={styles.featureText}>Job Market Analysis</Text>
            </View>
            <View style={styles.featureItem}>
              <CheckCircle size={14} color="#4CAF50" />
              <Text style={styles.featureText}>PR Pathways</Text>
            </View>
            <View style={styles.featureItem}>
              <CheckCircle size={14} color="#4CAF50" />
              <Text style={styles.featureText}>Skills Assessment</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      
      {/* Help Section */}
      <View style={styles.helpSection}>
        <Text style={styles.helpTitle}>Need Help Choosing?</Text>
        <Text style={styles.helpText}>
          Our experts can help you determine the best visa option for your specific situation.
        </Text>
        <TouchableOpacity 
          style={styles.helpButton}
          onPress={() => router.push('/(tabs)/appointment')}
        >
          <Text style={styles.helpButtonText}>Book Free Consultation</Text>
        </TouchableOpacity>
      </View>
      <ChatBot />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  
  // Header Section
  headerSection: {
    backgroundColor: '#8C1D40',
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 22,
  },
  
  categoryContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
    gap: 20,
  },
  categoryCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    backgroundColor: '#f8f9fa',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    opacity: 0.6,
  },
  categoryCardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  categoryCardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#666',
  },
  
  // Help Section
  helpSection: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    marginTop: 32,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  helpText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  helpButton: {
    backgroundColor: '#8C1D40',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  helpButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});