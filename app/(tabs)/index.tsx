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
import { User, LogOut } from 'lucide-react-native';


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
            <TouchableOpacity style={styles.iconButton}>
              <LogOut size={24} color="#666" />
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
            <View style={styles.aboutTextContainer}>
              <Text style={styles.aboutTitle}>
                Your Trusted Partner for Visa Guidance and Educational Services
              </Text>
              <Text style={styles.aboutText}>
                At <Text style={styles.boldText}>iMigrate EMC SMC</Text>, we specialize in helping individuals from Pakistan, India, Iran, Bangladesh, Sri Lanka, and Dubai navigate their visa options for opportunities in Australia, New Zealand, Canada, the USA, the UK, and Europe. Our team provides comprehensive visa guidance, assisting clients in understanding visa pathways, requirements, and the application process.
              </Text>
              <Text style={styles.aboutText}>
                As <Text style={styles.boldText}>iMigrate EMC SMC</Text>, based in Islamabad, we offer expert advice on visa categories including student, work, visit, and immigration visas for various countries. Our services are designed to empower clients with the information they need to make informed decisions. However, any legal migration assistance required under Australian law, such as advice on visa approvals, outcomes, or formal representation, will be referred to <Text style={styles.boldText}>registered Migration Agents (MARA)</Text>.
              </Text>
              <Text style={styles.aboutText}>
                We work in close collaboration with <Text style={styles.boldText}>iMigrate EMC Pty Ltd</Text>, our Australian counterpart, to ensure seamless service and compliance. Our global presence, backed by years of experience, allows us to extend our reach to major cities worldwide, delivering personalized and efficient support for all your visa needs.
              </Text>
              <TouchableOpacity style={styles.learnMoreButton}>
                <Text style={styles.learnMoreText}>Learn more</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.aboutImageContainer}>
              <Image 
                source={{ uri: 'https://r2-pub.rork.com/attachments/vkyovl415nsbtar3olqic' }}
                style={styles.aboutImage}
                resizeMode="cover"
              />
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

        {/* Representative Section */}
        <View style={styles.representativeSection}>
          <View style={styles.representativeContent}>
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
            <View style={styles.representativeImageContainer}>
              <Image 
                source={{ uri: 'https://r2-pub.rork.com/attachments/5cx0sq79gfuxzarfpt2ha' }}
                style={styles.representativeImage}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>

        {/* Team Section */}
        <View style={styles.teamSection}>
          <View style={styles.teamGrid}>
            <View style={styles.teamCard}>
              <View style={styles.teamImageContainer}>
                <Image 
                  source={{ uri: 'https://r2-pub.rork.com/attachments/oflxu76u4iny1sr5flndv' }}
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
                  source={{ uri: 'https://r2-pub.rork.com/attachments/3ote1t3s1gkqsnhzwocqu' }}
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
                  source={{ uri: 'https://r2-pub.rork.com/attachments/whwr2ou7jn0dpw9k2styu' }}
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
                  source={{ uri: 'https://r2-pub.rork.com/attachments/hc4hpt01q2mtw4vdtuxzm' }}
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
    flexDirection: 'row',
    paddingHorizontal: 24,
    alignItems: 'flex-start',
  },
  aboutTextContainer: {
    flex: 1,
    paddingRight: 24,
  },
  aboutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    lineHeight: 32,
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 16,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
  },
  aboutImageContainer: {
    width: 150,
    height: 200,
  },
  aboutImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
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
    flexDirection: 'row',
    paddingHorizontal: 24,
    alignItems: 'flex-start',
  },
  representativeTextContainer: {
    flex: 1,
    paddingRight: 24,
  },
  representativeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    lineHeight: 32,
  },
  representativeText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 24,
  },
  representativeImageContainer: {
    width: 200,
    height: 250,
  },
  representativeImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
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
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 8,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  teamImageContainer: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  teamImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  teamDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
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
});