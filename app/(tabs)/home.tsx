import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  ImageBackground,
} from 'react-native';
import { router } from 'expo-router';
import { User, Star } from 'lucide-react-native';
import ChatBot from '@/components/ChatBot';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image 
            source={{ uri: 'https://imigrateemc.com/web/image/website/1/logo/imigrateemc?unique=6d04d39' }}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <User size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => router.replace('/login')}
            >
              <Text style={styles.logoutIcon}>⏻</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <ImageBackground
          source={{ uri: 'https://r2-pub.rork.com/attachments/kyii67650u383nz2xi3rq' }}
          style={styles.heroSection}
          imageStyle={styles.heroBackgroundImage}
        >
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Bridging Trust</Text>
            <Text style={styles.heroSubtitle}>From Dreams to Reality</Text>
            <Text style={styles.heroDescription}>Your Visa Journey Begins Here</Text>
            
            <TouchableOpacity 
              style={styles.ctaButton}
              onPress={() => router.push('/(tabs)/visa')}
            >
              <Text style={styles.ctaButtonText}>Contact us</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* About Section */}
        <View style={styles.aboutSection}>
          <View style={styles.aboutContent}>
            <View style={styles.aboutImageContainer}>
              <Image 
                source={{ uri: 'https://r2-pub.rork.com/attachments/vkyovl415nsbtar3olqic' }}
                style={styles.aboutImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.aboutTextContainer}>
              <Text style={styles.aboutTitle}>
                Your Trusted Partner for Visa Guidance and Educational Services
              </Text>
              <Text style={styles.aboutText}>
                At <Text style={styles.boldText}>iMigrate EMC SMC</Text>, we specialize in helping individuals from Pakistan, India, Iran, Bangladesh, Sri Lanka, and Dubai navigate their visa options for opportunities in Australia, New Zealand, Canada, the USA, the UK, and Europe.
              </Text>
              <Text style={styles.aboutText}>
                Our team provides comprehensive visa guidance, assisting clients in understanding visa pathways, requirements, and the application process. We offer expert advice on visa categories including student, work, visit, and immigration visas.
              </Text>
              <Text style={styles.aboutText}>
                We work in close collaboration with <Text style={styles.boldText}>iMigrate EMC Pty Ltd</Text>, our Australian counterpart, to ensure seamless service and compliance with the highest standards.
              </Text>
              <TouchableOpacity style={styles.learnMoreButton}>
                <Text style={styles.learnMoreText}>Learn more</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Countries</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>Partners</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>HeadOffices</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>107</Text>
              <Text style={styles.statLabel}>Trusted Clients</Text>
            </View>
          </View>
        </View>

        {/* Customer Reviews Section */}
        <View style={styles.reviewsSection}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.reviewsTitle}>What Our Clients Say</Text>
            <View style={styles.overallRating}>
              <View style={styles.ratingStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={20} color="#FFD700" />
                ))}
              </View>
              <Text style={styles.ratingText}>4.9 out of 5</Text>
              <Text style={styles.ratingSubtext}>Based on 247+ reviews</Text>
            </View>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.reviewsScrollContainer}
            style={styles.reviewsScroll}
          >
            <View style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewerInfo}>
                  <View style={styles.reviewerAvatar}>
                    <Text style={styles.reviewerInitial}>A</Text>
                  </View>
                  <View>
                    <Text style={styles.reviewerName}>Ahmed Hassan</Text>
                    <Text style={styles.reviewerLocation}>Dubai, UAE</Text>
                  </View>
                </View>
                <View style={styles.reviewStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={14} color="#FFD700" />
                  ))}
                </View>
              </View>
              <Text style={styles.reviewText}>
                &quot;Exceptional service! The team guided me through my Australian student visa process seamlessly. Dr. Babar&apos;s expertise made all the difference. Highly recommended!&quot;
              </Text>
              <Text style={styles.reviewDate}>2 weeks ago</Text>
            </View>
            
            <View style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewerInfo}>
                  <View style={styles.reviewerAvatar}>
                    <Text style={styles.reviewerInitial}>S</Text>
                  </View>
                  <View>
                    <Text style={styles.reviewerName}>Sarah Khan</Text>
                    <Text style={styles.reviewerLocation}>Karachi, Pakistan</Text>
                  </View>
                </View>
                <View style={styles.reviewStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={14} color="#FFD700" />
                  ))}
                </View>
              </View>
              <Text style={styles.reviewText}>
                &quot;Professional, reliable, and incredibly knowledgeable. They helped me secure my Canadian work visa without any hassles. The entire process was transparent and efficient.&quot;
              </Text>
              <Text style={styles.reviewDate}>1 month ago</Text>
            </View>
            
            <View style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewerInfo}>
                  <View style={styles.reviewerAvatar}>
                    <Text style={styles.reviewerInitial}>R</Text>
                  </View>
                  <View>
                    <Text style={styles.reviewerName}>Raj Patel</Text>
                    <Text style={styles.reviewerLocation}>Mumbai, India</Text>
                  </View>
                </View>
                <View style={styles.reviewStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={14} color="#FFD700" />
                  ))}
                </View>
              </View>
              <Text style={styles.reviewText}>
                &quot;Outstanding support from start to finish. The team&apos;s dedication and expertise helped me achieve my dream of studying in New Zealand. Forever grateful!&quot;
              </Text>
              <Text style={styles.reviewDate}>3 weeks ago</Text>
            </View>
            
            <View style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewerInfo}>
                  <View style={styles.reviewerAvatar}>
                    <Text style={styles.reviewerInitial}>F</Text>
                  </View>
                  <View>
                    <Text style={styles.reviewerName}>Fatima Ali</Text>
                    <Text style={styles.reviewerLocation}>Dhaka, Bangladesh</Text>
                  </View>
                </View>
                <View style={styles.reviewStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={14} color="#FFD700" />
                  ))}
                </View>
              </View>
              <Text style={styles.reviewText}>
                &quot;Truly impressed with their professionalism and attention to detail. They made my UK visa application process stress-free and successful. Highly recommend their services!&quot;
              </Text>
              <Text style={styles.reviewDate}>2 months ago</Text>
            </View>
          </ScrollView>
          
          <TouchableOpacity style={styles.viewAllReviewsButton}>
            <Text style={styles.viewAllReviewsText}>View All Reviews</Text>
          </TouchableOpacity>
        </View>

        {/* Representative Section */}
        <View style={styles.representativeSection}>
          <View style={styles.representativeContent}>
            <View style={styles.representativeImageContainer}>
              <Image 
                source={{ uri: 'https://r2-pub.rork.com/attachments/5cx0sq79gfuxzarfpt2ha' }}
                style={styles.representativeImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.representativeTextContainer}>
              <Text style={styles.representativeTitle}>
                Saad Abdullah, Islamabad Office Representative
              </Text>
              <Text style={styles.representativeText}>
                Saad is the driving force behind the Islamabad office. He loves to keep his hands full by participating in the development of the business, marketing, and customer experience strategies.
              </Text>
              <TouchableOpacity style={styles.learnMoreButton}>
                <Text style={styles.learnMoreText}>Learn more</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Team Section */}
        <View style={styles.teamSection}>
          <View style={styles.teamGrid}>
            <View style={styles.teamCard}>
              <View style={styles.teamImageContainer}>
                <Image 
                  source={{ uri: 'https://r2-pub.rork.com/attachments/qt1emyxobca1qmbox5n1p' }}
                  style={styles.teamImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.teamInfo}>
                <Text style={styles.teamName}>Dr. Aftab Ahmed, Industrial Mentor</Text>
                <Text style={styles.teamDescription}>
                  Dr. Aftab Mughal, an Industrial Mentor with 17 years of experience in IT and academia, holds an MSc in Software Engineering from BTH, Sweden, and a PhD in Information Systems from the University of Otago, New Zealand. A former Senior IT Consultant at Telstra, he provides expert guidance to students on international education and career pathways, helping them navigate opportunities in the global job market.
                </Text>
              </View>
            </View>
            
            <View style={styles.teamCard}>
              <View style={styles.teamImageContainer}>
                <Image 
                  source={{ uri: 'https://r2-pub.rork.com/attachments/j2xi691k76ptdd6uv096d' }}
                  style={styles.teamImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.teamInfo}>
                <Text style={styles.teamName}>Dr. Asif Noor, Academic Mentor</Text>
                <Text style={styles.teamDescription}>
                  Dr. Asif Noor, a Senior Scientist and Scholar at the University of Melbourne and a PhD graduate from the University of Otago, New Zealand, is an International Education Consultant with over a decade of experience. Passionate about mentoring students from developing countries, he leverages his academic expertise to guide them through international education systems and secure opportunities at prestigious institutions in Australia, New Zealand, and Canada.
                </Text>
              </View>
            </View>
            
            <View style={styles.teamCard}>
              <View style={styles.teamImageContainer}>
                <Image 
                  source={{ uri: 'https://r2-pub.rork.com/attachments/0k7cgdhgqjeaeuxvji952' }}
                  style={styles.teamImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.teamInfo}>
                <Text style={styles.teamName}>Ghulam Mohaiudin, CTO</Text>
                <Text style={styles.teamDescription}>
                  Ghulam Mohaiudin is a passionate and dedicated professional who truly loves what he does. As CTO of iMigrateEMC, he plays a pivotal role in leveraging technology to enhance our innovative visa consultancy services. With a keen focus on digital transformation, Ghulam ensures seamless operations and an exceptional client experience across our offices in Pakistan, India, Iran, Bangladesh, Sri Lanka, and Dubai.
                </Text>
              </View>
            </View>
            
            <View style={styles.teamCard}>
              <View style={styles.teamImageContainer}>
                <Image 
                  source={{ uri: 'https://r2-pub.rork.com/attachments/4z9br6frnuzy12ah1q2n4' }}
                  style={styles.teamImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.teamInfo}>
                <Text style={styles.teamName}>Dr. Babar Peters (MARA)</Text>
                <Text style={styles.teamDescription}>
                  Meet Dr. Babar Peters - Your Registered Migration Agent. He is your trusted registered Migration Agent (No. 0106003), recognized by the Migration Agents Registration Authority (MARA). With extensive experience in Australian immigration matters, Dr. Peters ensures the highest standards of integrity when handling your visa application. His in-depth knowledge of current immigration laws and policies guarantees the best possible presentation of your case.
                </Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Footer Section */}
        <View style={styles.footerSection}>
          <View style={styles.footerContent}>
            <View style={styles.footerLeft}>
              <Text style={styles.footerTitle}>More Coming Soon</Text>
            </View>
            <View style={styles.footerRight}>
              <Text style={styles.footerTitle}>Connect with us</Text>
              <View style={styles.contactInfo}>
                <Text style={styles.contactText}>Contact us</Text>
                <Text style={styles.contactText}>info@imigrateemc.com.au</Text>
                <Text style={styles.contactText}>(0061) 490 549 001</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <ChatBot />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  
  // Header
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 12,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logo: {
    width: 120,
    height: 50,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Hero Section
  heroSection: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroBackgroundImage: {
    opacity: 0.7,
  },
  heroOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 56,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 24,
  },
  heroDescription: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  ctaButton: {
    backgroundColor: '#8C1D40',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 4,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // About Section
  aboutSection: {
    backgroundColor: '#fff',
    paddingVertical: 48,
  },
  aboutContent: {
    flexDirection: 'column',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  aboutTextContainer: {
    width: '100%',
    marginBottom: 32,
  },
  aboutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    lineHeight: 32,
    textAlign: 'center',
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 16,
    textAlign: 'justify',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
  },
  aboutImageContainer: {
    width: 280,
    height: 200,
    alignSelf: 'center',
  },
  aboutImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  learnMoreButton: {
    backgroundColor: '#8C1D40',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  learnMoreText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  
  // Stats Section
  statsSection: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  
  // Representative Section
  representativeSection: {
    backgroundColor: '#fff',
    paddingVertical: 48,
  },
  representativeContent: {
    flexDirection: 'column',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  representativeTextContainer: {
    width: '100%',
    marginBottom: 32,
  },
  representativeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    lineHeight: 32,
    textAlign: 'center',
  },
  representativeText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 24,
    textAlign: 'justify',
  },
  representativeImageContainer: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  representativeImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#8C1D40',
  },
  
  // Team Section
  teamSection: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  teamGrid: {
    gap: 24,
  },
  teamCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 280,
  },
  teamImageContainer: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  teamImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#8C1D40',
  },
  teamInfo: {
    flex: 1,
    alignItems: 'center',
  },
  teamName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  teamDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
    textAlign: 'justify',
  },
  
  // Footer Section
  footerSection: {
    backgroundColor: '#333',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerLeft: {
    flex: 1,
  },
  footerRight: {
    flex: 1,
    paddingLeft: 24,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  contactInfo: {
    gap: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  logoutIcon: {
    fontSize: 20,
    color: '#666',
  },
  
  // Reviews Section
  reviewsSection: {
    backgroundColor: '#fff',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  reviewsHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  reviewsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  overallRating: {
    alignItems: 'center',
  },
  ratingStars: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  ratingSubtext: {
    fontSize: 14,
    color: '#666',
  },
  reviewsScroll: {
    marginBottom: 24,
  },
  reviewsScrollContainer: {
    paddingRight: 24,
  },
  reviewCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
    width: 300,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8C1D40',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reviewerInitial: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  reviewerLocation: {
    fontSize: 12,
    color: '#666',
  },
  reviewStars: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  reviewDate: {
    fontSize: 12,
    color: '#888',
  },
  viewAllReviewsButton: {
    backgroundColor: '#8C1D40',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'center',
  },
  viewAllReviewsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});