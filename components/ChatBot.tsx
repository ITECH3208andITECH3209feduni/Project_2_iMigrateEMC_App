import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Animated,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { X, User, Phone } from 'lucide-react-native';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  options?: string[];
  isAI?: boolean;
  suggestions?: string[];
}

interface ConversationContext {
  userGoal?: string;
  currentStep?: string;
  previousQueries: string[];
  userPreferences: Record<string, any>;
}

interface ChatBotProps {
  onConnectToLive?: () => void;
}

const { height } = Dimensions.get('window');

const AUTOMATED_RESPONSES = {
  greeting: [
    "Hello! Welcome to iMigrate EMC. I'm your AI-powered visa assistant. I can help you with:\n\n• Visa requirements & eligibility\n• Step-by-step application guidance\n• Document checklists\n• Processing times & costs\n• Booking consultations\n\nWhat would you like to know about your visa journey?",
    "Hi there! I'm your smart visa assistant with AI capabilities. I can provide personalized guidance for student, work, visit, and immigration visas.\n\nHow can I help you achieve your visa goals today?",
    "Welcome! I'm here to make your visa journey smoother with AI-powered assistance. Whether you're planning to study, work, visit, or immigrate - I've got you covered.\n\nWhat's your visa goal?"
  ],
  visa_types: {
    text: "We offer guidance for several visa types:",
    options: ["Student Visa", "Work Visa", "Visit Visa", "Immigration Visa"]
  },
  student_visa: "Our student visa services include university applications, course selection, and visa application guidance for Australia, Canada, UK, USA, and New Zealand. Would you like to know more about specific countries?",
  work_visa: "We provide work visa guidance for skilled professionals looking to work in Australia, Canada, UK, USA, and New Zealand. This includes skill assessment and employer sponsorship guidance.",
  visit_visa: "Visit visas are available for tourism, business, or family visits. We help with documentation and application processes for various countries.",
  immigration_visa: "Permanent residency and immigration visas are available through various pathways including skilled migration, family sponsorship, and investment visas.",
  countries: {
    text: "We provide services for these destination countries:",
    options: ["Australia", "Canada", "UK", "USA", "New Zealand", "Europe"]
  },
  requirements: "Visa requirements vary by country and visa type. Generally, you'll need valid passport, financial documents, health insurance, and specific documents based on your visa category. Would you like country-specific requirements?",
  processing_time: "Processing times vary: Student visas (4-8 weeks), Work visas (3-6 months), Visit visas (2-4 weeks), Immigration visas (6-12 months). These are approximate and can vary by country and individual circumstances.",
  fees: "Our consultation fees start from $100 AUD. Government visa fees are separate and vary by country and visa type. Would you like a detailed quote for your specific case?",
  appointment: "You can book an appointment through our app or call us at (0061) 490 549 001. We offer both in-person and online consultations.",
  contact: "You can reach us at:\n📧 info@imigrateemc.com.au\n📞 (0061) 490 549 001\n🏢 Offices in Pakistan, India, Iran, Bangladesh, Sri Lanka, and Dubai",
  live_agent: "I understand you'd like to speak with a live agent. Let me connect you to one of our visa consultants who can provide personalized assistance.",
  default: "I'm here to help with visa and immigration questions. You can ask about visa types, requirements, processing times, or book an appointment. If you need detailed assistance, I can connect you to a live agent."
};

const KEYWORDS = {
  greeting: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
  visa_types: ['visa types', 'what visa', 'visa options', 'types of visa'],
  student_visa: ['student visa', 'study visa', 'education', 'university', 'college', 'student'],
  work_visa: ['work visa', 'employment', 'job', 'skilled worker', 'work permit'],
  visit_visa: ['visit visa', 'tourist visa', 'tourism', 'visit', 'travel', 'holiday'],
  immigration_visa: ['immigration', 'permanent resident', 'pr', 'migrate', 'settle'],
  countries: ['countries', 'where', 'australia', 'canada', 'uk', 'usa', 'new zealand'],
  requirements: ['requirements', 'documents', 'what do i need', 'eligibility'],
  processing_time: ['processing time', 'how long', 'duration', 'timeline'],
  fees: ['cost', 'price', 'fees', 'charges', 'how much'],
  appointment: ['appointment', 'book', 'schedule', 'meeting', 'consultation'],
  contact: ['contact', 'phone', 'email', 'address', 'office'],
  live_agent: ['live agent', 'human', 'speak to someone', 'representative', 'consultant']
};

export default function ChatBot({ onConnectToLive }: ChatBotProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showLiveAgentOption, setShowLiveAgentOption] = useState<boolean>(false);
  const [interactionCount, setInteractionCount] = useState<number>(0);
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    previousQueries: [],
    userPreferences: {}
  });
  const [isAIMode, setIsAIMode] = useState<boolean>(false);
  const [sessionMessages, setSessionMessages] = useState<{role: 'user' | 'assistant' | 'system', content: string}[]>([]);
  
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (isVisible) {
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
      
      if (messages.length === 0) {
        const greeting = getRandomResponse(AUTOMATED_RESPONSES.greeting);
        const message: Message = {
          id: Date.now().toString(),
          text: greeting,
          isBot: true,
          timestamp: new Date(),
          suggestions: ['Check visa eligibility', 'Book consultation', 'View processing times']
        };
        setMessages([message]);
      }
    } else {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    }
  }, [isVisible, messages.length, slideAnim]);

  const getRandomResponse = (responses: string[]): string => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const findBestResponse = (userMessage: string): string | { text: string; options: string[] } => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [category, keywords] of Object.entries(KEYWORDS)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        const response = AUTOMATED_RESPONSES[category as keyof typeof AUTOMATED_RESPONSES];
        if (typeof response === 'string') {
          return response;
        } else if (Array.isArray(response)) {
          return getRandomResponse(response);
        } else {
          return response;
        }
      }
    }
    
    return AUTOMATED_RESPONSES.default;
  };

  const getAIResponse = async (userMessage: string): Promise<{ text: string; suggestions?: string[] }> => {
    try {
      const systemPrompt = `You are VisaBot, an advanced AI assistant for iMigrate EMC visa and immigration services. 

Your capabilities:
- Provide step-by-step guidance for visa applications
- Offer personalized recommendations based on user's situation
- Proactively suggest next steps and helpful features
- Maintain natural conversation flow
- Summarize complex information when needed
- Anticipate user needs and guide them toward their goals

Services we offer:
- Student Visas (Australia, Canada, UK, USA, New Zealand)
- Work Visas (skilled migration, employer sponsorship)
- Visit Visas (tourism, business, family)
- Immigration Visas (permanent residency)
- Document preparation and application guidance

Contact info:
- Phone: (0061) 490 549 001
- Email: info@imigrateemc.com.au
- Offices: Pakistan, India, Iran, Bangladesh, Sri Lanka, Dubai

Conversation context: ${JSON.stringify(conversationContext)}

Instructions:
1. Keep responses concise but complete (2-3 sentences max unless detailed explanation requested)
2. Always provide actionable next steps
3. Use bullet points for complex information
4. Suggest relevant app features or services
5. Ask clarifying questions when needed
6. If user seems frustrated or needs detailed help, suggest connecting to live agent
7. Proactively offer helpful tips and shortcuts
8. Remember previous conversation context

Respond naturally and professionally. Focus on being helpful and guiding the user toward their visa goals.`;

      const messages = [
        { role: 'system' as const, content: systemPrompt },
        ...sessionMessages.slice(-6), // Keep last 6 messages for context
        { role: 'user' as const, content: userMessage }
      ];

      const response = await fetch('https://toolkit.rork.com/text/llm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) {
        throw new Error('AI service unavailable');
      }

      const data = await response.json();
      
      // Update conversation context
      setConversationContext(prev => ({
        ...prev,
        previousQueries: [...prev.previousQueries, userMessage].slice(-5),
      }));

      // Update session messages
      setSessionMessages(prev => [
        ...prev,
        { role: 'user' as const, content: userMessage },
        { role: 'assistant' as const, content: data.completion }
      ].slice(-10)); // Keep last 10 messages

      // Generate contextual suggestions
      const suggestions = generateSuggestions(userMessage, data.completion);
      
      return {
        text: data.completion,
        suggestions: suggestions.length > 0 ? suggestions : undefined
      };
    } catch (error) {
      console.error('AI response error:', error);
      // Fallback to rule-based response
      const fallbackResponse = findBestResponse(userMessage);
      return {
        text: typeof fallbackResponse === 'string' ? fallbackResponse : fallbackResponse.text
      };
    }
  };

  const generateSuggestions = (userMessage: string, aiResponse: string): string[] => {
    const lowerMessage = userMessage.toLowerCase();
    const lowerResponse = aiResponse.toLowerCase();
    
    const suggestions: string[] = [];
    
    // Context-aware suggestions
    if (lowerMessage.includes('student') || lowerResponse.includes('student')) {
      suggestions.push('Show me student visa requirements', 'Book consultation for study abroad');
    }
    
    if (lowerMessage.includes('work') || lowerResponse.includes('work')) {
      suggestions.push('Check work visa eligibility', 'View skilled occupation list');
    }
    
    if (lowerMessage.includes('cost') || lowerMessage.includes('fee')) {
      suggestions.push('Get detailed quote', 'Compare visa costs by country');
    }
    
    if (lowerMessage.includes('time') || lowerMessage.includes('how long')) {
      suggestions.push('Check processing times', 'Track my application');
    }
    
    if (lowerMessage.includes('document') || lowerMessage.includes('requirement')) {
      suggestions.push('Document checklist', 'Upload documents');
    }
    
    // Always include these helpful options
    if (suggestions.length < 2) {
      suggestions.push('Book appointment', 'Speak to consultant');
    }
    
    return suggestions.slice(0, 3); // Limit to 3 suggestions
  };

  const addBotMessage = (text: string, options?: string[], suggestions?: string[]) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date(),
      options,
      suggestions
    };
    setMessages(prev => [...prev, message]);
  };

  const addUserMessage = (text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const userMsg = inputText.trim();
      addUserMessage(userMsg);
      setInputText('');
      setIsTyping(true);
      setInteractionCount(prev => prev + 1);

      try {
        // Determine if we should use AI or rule-based response
        const shouldUseAI = isAIMode || interactionCount > 1 || 
          userMsg.length > 20 || 
          !Object.values(KEYWORDS).flat().some(keyword => 
            userMsg.toLowerCase().includes(keyword)
          );

        if (shouldUseAI) {
          setIsAIMode(true);
          const aiResponse = await getAIResponse(userMsg);
          
          const message: Message = {
            id: Date.now().toString(),
            text: aiResponse.text,
            isBot: true,
            isAI: true,
            timestamp: new Date(),
            suggestions: aiResponse.suggestions
          };
          
          setMessages(prev => [...prev, message]);
        } else {
          // Use rule-based response for simple queries
          setTimeout(() => {
            const response = findBestResponse(userMsg);
            
            if (typeof response === 'string') {
              addBotMessage(response);
            } else {
              addBotMessage(response.text, response.options);
            }
          }, 800 + Math.random() * 400);
        }
        
        setIsTyping(false);
        
        // Show live agent option after 3 interactions or if user seems frustrated
        if (interactionCount >= 2 || userMsg.toLowerCase().includes('help') || 
            userMsg.toLowerCase().includes('problem') || userMsg.toLowerCase().includes('issue')) {
          setTimeout(() => {
            setShowLiveAgentOption(true);
          }, 2000);
        }
      } catch (error) {
        console.error('Message handling error:', error);
        setIsTyping(false);
        addBotMessage("I apologize, but I'm having trouble processing your request. Let me connect you with a live agent who can help you better.");
        setTimeout(() => setShowLiveAgentOption(true), 1000);
      }
    }
  };

  const handleOptionPress = async (option: string) => {
    addUserMessage(option);
    setIsTyping(true);
    setInteractionCount(prev => prev + 1);

    try {
      if (isAIMode) {
        const aiResponse = await getAIResponse(option);
        
        const message: Message = {
          id: Date.now().toString(),
          text: aiResponse.text,
          isBot: true,
          isAI: true,
          timestamp: new Date(),
          suggestions: aiResponse.suggestions
        };
        
        setMessages(prev => [...prev, message]);
      } else {
        setTimeout(() => {
          const response = findBestResponse(option);
          
          if (typeof response === 'string') {
            addBotMessage(response);
          } else {
            addBotMessage(response.text, response.options);
          }
        }, 800);
      }
      
      setIsTyping(false);
      
      if (interactionCount >= 2) {
        setTimeout(() => {
          setShowLiveAgentOption(true);
        }, 2000);
      }
    } catch (error) {
      console.error('Option handling error:', error);
      setIsTyping(false);
      addBotMessage("Let me get you connected with a live agent for better assistance.");
      setTimeout(() => setShowLiveAgentOption(true), 1000);
    }
  };

  const handleSuggestionPress = async (suggestion: string) => {
    addUserMessage(suggestion);
    setIsTyping(true);
    setInteractionCount(prev => prev + 1);

    try {
      const aiResponse = await getAIResponse(suggestion);
      
      const message: Message = {
        id: Date.now().toString(),
        text: aiResponse.text,
        isBot: true,
        isAI: true,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions
      };
      
      setMessages(prev => [...prev, message]);
      setIsTyping(false);
    } catch (error) {
      console.error('Suggestion handling error:', error);
      setIsTyping(false);
      addBotMessage("I'd be happy to help you with that. Let me connect you with a live agent for detailed assistance.");
      setTimeout(() => setShowLiveAgentOption(true), 1000);
    }
  };

  const handleConnectToLive = () => {
    addBotMessage("Connecting you to a live agent. Please hold on...");
    setShowLiveAgentOption(false);
    
    setTimeout(() => {
      if (onConnectToLive) {
        onConnectToLive();
      } else {
        addBotMessage("Please call us at (0061) 490 549 001 or email info@imigrateemc.com.au to speak with a live consultant.");
      }
    }, 2000);
  };

  const closeChat = () => {
    setIsVisible(false);
    setShowLiveAgentOption(false);
  };

  const openChat = () => {
    setIsVisible(true);
  };

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  return (
    <>
      {/* Floating Chat Button */}
      {!isVisible && (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={openChat}
          activeOpacity={0.8}
        >
          <Text style={styles.chatIcon}>💬</Text>
        </TouchableOpacity>
      )}

      {/* Chat Modal */}
      <Modal
        visible={isVisible}
        transparent
        animationType="none"
        onRequestClose={closeChat}
      >
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
          >
            <Animated.View
              style={[
                styles.chatContainer,
                {
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [height, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              {/* Chat Header */}
              <View style={styles.chatHeader}>
                <View style={styles.headerLeft}>
                  <View style={styles.botAvatar}>
                    <Text style={styles.botIcon}>{isAIMode ? '🧠' : '🤖'}</Text>
                  </View>
                  <View>
                    <Text style={styles.headerTitle}>iMigrate EMC Support</Text>
                    <Text style={styles.headerSubtitle}>
                      {isAIMode ? 'AI Assistant • Online' : 'Smart Bot • Online'}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={closeChat} style={styles.closeButton}>
                  <X size={24} color="#666" />
                </TouchableOpacity>
              </View>

              {/* Messages */}
              <ScrollView
                ref={scrollViewRef}
                style={styles.messagesContainer}
                contentContainerStyle={styles.messagesContent}
                showsVerticalScrollIndicator={false}
              >
                {messages.map((message) => (
                  <View key={message.id}>
                    <View
                      style={[
                        styles.messageContainer,
                        message.isBot ? styles.botMessage : styles.userMessage,
                      ]}
                    >
                      {message.isBot && (
                        <View style={styles.messageAvatar}>
                          <Text style={styles.botIconSmall}>
                            {message.isAI ? '🧠' : '🤖'}
                          </Text>
                        </View>
                      )}
                      <View
                        style={[
                          styles.messageBubble,
                          message.isBot ? styles.botBubble : styles.userBubble,
                        ]}
                      >
                        <Text
                          style={[
                            styles.messageText,
                            message.isBot ? styles.botText : styles.userText,
                          ]}
                        >
                          {message.text}
                        </Text>
                      </View>
                      {!message.isBot && (
                        <View style={styles.messageAvatar}>
                          <User size={16} color="#fff" />
                        </View>
                      )}
                    </View>
                    
                    {/* Options */}
                    {message.options && (
                      <View style={styles.optionsContainer}>
                        {message.options.map((option, index) => (
                          <TouchableOpacity
                            key={`option-${message.id}-${index}`}
                            style={styles.optionButton}
                            onPress={() => handleOptionPress(option)}
                          >
                            <Text style={styles.optionText}>{option}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                    
                    {/* AI Suggestions */}
                    {message.suggestions && (
                      <View style={styles.suggestionsContainer}>
                        <Text style={styles.suggestionsTitle}>💡 Helpful suggestions:</Text>
                        {message.suggestions.map((suggestion, index) => (
                          <TouchableOpacity
                            key={`suggestion-${message.id}-${index}`}
                            style={styles.suggestionButton}
                            onPress={() => handleSuggestionPress(suggestion)}
                          >
                            <Text style={styles.suggestionText}>{suggestion}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <View style={[styles.messageContainer, styles.botMessage]}>
                    <View style={styles.messageAvatar}>
                      <Text style={styles.botIconSmall}>{isAIMode ? '🧠' : '🤖'}</Text>
                    </View>
                    <View style={[styles.messageBubble, styles.botBubble]}>
                      <Text style={styles.typingText}>
                        {isAIMode ? 'AI is thinking...' : 'Typing...'}
                      </Text>
                    </View>
                  </View>
                )}
                
                {/* Live Agent Option */}
                {showLiveAgentOption && (
                  <View style={styles.liveAgentContainer}>
                    <Text style={styles.liveAgentText}>
                      Need more personalized help?
                    </Text>
                    <TouchableOpacity
                      style={styles.liveAgentButton}
                      onPress={handleConnectToLive}
                    >
                      <Phone size={16} color="#fff" />
                      <Text style={styles.liveAgentButtonText}>
                        Connect to Live Agent
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </ScrollView>

              {/* Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={inputText}
                  onChangeText={setInputText}
                  placeholder="Type your message..."
                  placeholderTextColor="#999"
                  multiline
                  maxLength={500}
                  onSubmitEditing={handleSendMessage}
                  blurOnSubmit={false}
                />
                <TouchableOpacity
                  style={[
                    styles.sendButton,
                    { opacity: inputText.trim() ? 1 : 0.5 }
                  ]}
                  onPress={handleSendMessage}
                  disabled={!inputText.trim()}
                >
          <Text style={styles.sendIcon}>➤</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: Platform.OS === 'web' ? 30 : 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#8C1D40',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 1000,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  chatContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.75,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8C1D40',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#28a745',
    marginTop: 2,
  },
  closeButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  botMessage: {
    justifyContent: 'flex-start',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8C1D40',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
  },
  botBubble: {
    backgroundColor: '#f1f3f4',
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#8C1D40',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  botText: {
    color: '#333',
  },
  userText: {
    color: '#fff',
  },
  typingText: {
    color: '#666',
    fontStyle: 'italic',
  },
  optionsContainer: {
    marginLeft: 48,
    marginTop: 8,
    marginBottom: 8,
  },
  optionButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#8C1D40',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  optionText: {
    color: '#8C1D40',
    fontSize: 14,
    fontWeight: '500',
  },
  suggestionsContainer: {
    marginLeft: 48,
    marginTop: 12,
    marginBottom: 8,
    backgroundColor: '#f8f9ff',
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#8C1D40',
  },
  suggestionsTitle: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    marginBottom: 8,
  },
  suggestionButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e7ff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 6,
    alignSelf: 'flex-start',
    shadowColor: '#8C1D40',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  suggestionText: {
    color: '#4c1d95',
    fontSize: 13,
    fontWeight: '500',
  },
  liveAgentContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  liveAgentText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  liveAgentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  liveAgentButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#f8f9fa',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    fontSize: 14,
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8C1D40',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatIcon: {
    fontSize: 24,
    color: '#fff',
  },
  sendIcon: {
    fontSize: 16,
    color: '#fff',
  },
  botIcon: {
    fontSize: 20,
    color: '#fff',
  },
  botIconSmall: {
    fontSize: 14,
    color: '#fff',
  },
});