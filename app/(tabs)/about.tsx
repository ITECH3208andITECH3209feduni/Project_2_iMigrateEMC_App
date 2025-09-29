import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Users, Award, Globe, Phone, Mail, MapPin, ArrowRight } from 'lucide-react-native';
import ChatBot from '@/components/ChatBot';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: 'https://r2-pub.rork.com/attachments/1pcvzx3simg3fp1q45oro' }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        
        <Text style={styles.heroTitle}>Your Trusted Partner for Global Opportunities</Text>
        <Text style={styles.heroSubtitle}>
          15+ years of expertise in visa consultation and educational guidance
        </Text>
      </View>

      <View style={styles.aboutContainer}>
        {/* Mission Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.aboutDescription}>
            At iMigrateEMC, we specialize in providing comprehensive visa consultation and educational guidance services. Our team of experienced professionals is dedicated to helping you navigate the complex world of international immigration and education.
          </Text>
        </View>
        
        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Countries</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>Partners</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>107</Text>
            <Text style={styles.statLabel}>Trusted Clients</Text>
          </View>
        </View>
        
        {/* Services Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          <View style={styles.servicesList}>
            <View style={styles.serviceItem}>
              <View style={styles.serviceBullet} />
              <Text style={styles.serviceText}>Student Visa Consultation</Text>
            </View>
            <View style={styles.serviceItem}>
              <View style={styles.serviceBullet} />
              <Text style={styles.serviceText}>Visit Visa Processing</Text>
            </View>
            <View style={styles.serviceItem}>
              <View style={styles.serviceBullet} />
              <Text style={styles.serviceText}>Work/Immigration Visa Assistance</Text>
            </View>
            <View style={styles.serviceItem}>
              <View style={styles.serviceBullet} />
              <Text style={styles.serviceText}>Educational Counseling</Text>
            </View>
            <View style={styles.serviceItem}>
              <View style={styles.serviceBullet} />
              <Text style={styles.serviceText}>Document Preparation</Text>
            </View>
            <View style={styles.serviceItem}>
              <View style={styles.serviceBullet} />
              <Text style={styles.serviceText}>Interview Preparation</Text>
            </View>
          </View>
        </View>
        
        {/* Why Choose Us */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Why Choose Us?</Text>
          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <View style={styles.benefitIcon}>
                <Users size={20} color="#8C1D40" />
              </View>
              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>Expert Team</Text>
                <Text style={styles.benefitDescription}>
                  15+ years of experience in visa consultation
                </Text>
              </View>
            </View>
            
            <View style={styles.benefitItem}>
              <View style={styles.benefitIcon}>
                <Award size={20} color="#8C1D40" />
              </View>
              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>High Success Rate</Text>
                <Text style={styles.benefitDescription}>
                  95% visa approval rate across all categories
                </Text>
              </View>
            </View>
            
            <View style={styles.benefitItem}>
              <View style={styles.benefitIcon}>
                <Globe size={20} color="#8C1D40" />
              </View>
              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>Global Reach</Text>
                <Text style={styles.benefitDescription}>
                  Partnerships with institutions worldwide
                </Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Team Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Meet Our Team</Text>
          
          <View style={styles.teamGrid}>
            <View style={styles.teamMember}>
              <Image 
                source={{ uri: 'https://r2-pub.rork.com/attachments/gj5o1wq46bhy9cq2o8roi' }}
                style={styles.teamMemberImagePhoto}
                resizeMode="cover"
              />
              <View style={styles.teamMemberInfo}>
                <Text style={styles.teamMemberName}>Saad Abdullah</Text>
                <Text style={styles.teamMemberRole}>Islamabad Office Representative</Text>
                <Text style={styles.teamMemberDescription}>
                  Saad is the driving force behind the Islamabad office. He loves to keep his hands full by participating in the development of the business, marketing, and customer experience strategies.
                </Text>
              </View>
            </View>
            
            <View style={styles.teamMember}>
              <Image 
                source={{ uri: 'https://r2-pub.rork.com/attachments/fydfx1sv295um7q14eo08' }}
                style={styles.teamMemberImagePhoto}
                resizeMode="cover"
              />
              <View style={styles.teamMemberInfo}>
                <Text style={styles.teamMemberName}>Dr. Asif Noor</Text>
                <Text style={styles.teamMemberRole}>Academic Mentor</Text>
                <Text style={styles.teamMemberDescription}>
                  A Senior Scientist and Scholar at the University of Melbourne and a PhD graduate from the University of Otago, New Zealand, with over a decade of experience in international education consulting.
                </Text>
              </View>
            </View>
            
            <View style={styles.teamMember}>
              <Image 
                source={{ uri: 'https://r2-pub.rork.com/attachments/w24ohan3dx4tw0dlqigea' }}
                style={styles.teamMemberImagePhoto}
                resizeMode="cover"
              />
              <View style={styles.teamMemberInfo}>
                <Text style={styles.teamMemberName}>Ghulam Mohaiudin</Text>
                <Text style={styles.teamMemberRole}>CTO</Text>
                <Text style={styles.teamMemberDescription}>
                  As CTO of iMigrateEMC, he plays a pivotal role in leveraging technology to enhance our innovative visa consultancy services with a keen focus on digital transformation.
                </Text>
              </View>
            </View>
            
            <View style={styles.teamMember}>
              <Image 
                source={{ uri: 'https://r2-pub.rork.com/attachments/u2ed1zh1vyxewiz4dyav8' }}
                style={styles.teamMemberImagePhoto}
                resizeMode="cover"
              />
              <View style={styles.teamMemberInfo}>
                <Text style={styles.teamMemberName}>Dr. Babar Peters (MARA)</Text>
                <Text style={styles.teamMemberRole}>Registered Migration Agent</Text>
                <Text style={styles.teamMemberDescription}>
                  Your trusted registered Migration Agent (No. 0106003), recognized by the Migration Agents Registration Authority (MARA) with extensive experience in Australian immigration matters.
                </Text>
              </View>
            </View>
            
            <View style={styles.teamMember}>
              <Image 
                source={{ uri: 'https://r2-pub.rork.com/attachments/b7v2d5xgh8fiezqt2oni1' }}
                style={styles.teamMemberImagePhoto}
                resizeMode="cover"
              />
              <View style={styles.teamMemberInfo}>
                <Text style={styles.teamMemberName}>Dr. Aftab Ahmed</Text>
                <Text style={styles.teamMemberRole}>Industrial Mentor</Text>
                <Text style={styles.teamMemberDescription}>
                  An Industrial Mentor with 17 years of experience in IT and academia, holds an MSc in Software Engineering from BTH, Sweden, and a PhD in Information Systems from the University of Otago, New Zealand.
                </Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Contact Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Get in Touch</Text>
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Phone size={18} color="#8C1D40" />
              <Text style={styles.contactText}>(0061) 490 549 001</Text>
            </View>
            <View style={styles.contactItem}>
              <Mail size={18} color="#8C1D40" />
              <Text style={styles.contactText}>info@imigrateemc.com.au</Text>
            </View>
            <View style={styles.contactItem}>
              <MapPin size={18} color="#8C1D40" />
              <Text style={styles.contactText}>Islamabad, Pakistan</Text>
            </View>
          </View>
        </View>
        
        {/* CTA Section */}
        <View style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>Ready to Start Your Journey?</Text>
          <Text style={styles.ctaDescription}>
            Book a free consultation with our experts today
          </Text>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => router.push('/(tabs)/appointment')}
          >
            <Text style={styles.ctaButtonText}>Book Consultation</Text>
            <ArrowRight size={16} color="#fff" />
          </TouchableOpacity>
        </View>
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
  
  // Hero Section
  heroSection: {
    backgroundColor: '#8C1D40',
    paddingHorizontal: 24,
    paddingVertical: 48,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    overflow: 'hidden',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  
  aboutContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 20,
  },
  
  // Section Cards
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  aboutDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    textAlign: 'justify',
  },
  
  // Stats Section
  statsSection: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8C1D40',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  
  // Services List
  servicesList: {
    gap: 12,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  serviceBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8C1D40',
  },
  serviceText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  
  // Benefits List
  benefitsList: {
    gap: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  benefitIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  
  // Team Section
  teamGrid: {
    gap: 16,
  },
  teamMember: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    gap: 16,
  },
  teamMemberImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8C1D40',
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamMemberImagePhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  teamMemberInitials: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  teamMemberInfo: {
    flex: 1,
  },
  teamMemberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  teamMemberRole: {
    fontSize: 14,
    color: '#8C1D40',
    marginBottom: 8,
  },
  teamMemberDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  
  // Contact Section
  contactInfo: {
    gap: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#333',
  },
  
  // CTA Card
  ctaCard: {
    backgroundColor: '#8C1D40',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  ctaDescription: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  ctaButtonText: {
    color: '#8C1D40',
    fontSize: 14,
    fontWeight: '600',
  },
});