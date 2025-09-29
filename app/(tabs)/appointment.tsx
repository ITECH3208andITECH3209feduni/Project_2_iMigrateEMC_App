import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert, Modal } from 'react-native';
import { ChevronLeft, ChevronRight, Calendar, Clock, CheckCircle, Edit3, Trash2, Eye, X, Plus } from 'lucide-react-native';
import ChatBot from '@/components/ChatBot';

interface Appointment {
  id: string;
  date: Date;
  time: string;
  type: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  doctor?: string;
}

const { width } = Dimensions.get('window');

export default function AppointmentScreen() {
  const [activeTab, setActiveTab] = useState<'manage' | 'book'>('manage');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const timeSlots = [
    '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00',
    '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const renderCalendar = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <View key={`empty-${i}`} style={styles.calendarDay} />
      );
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isSelected = selectedDate && 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === currentMonth && 
        selectedDate.getFullYear() === currentYear;
      
      days.push(
        <TouchableOpacity
          key={day}
          style={[styles.calendarDay, isSelected && styles.selectedDay]}
          onPress={() => setSelectedDate(date)}
        >
          <Text style={[styles.calendarDayText, isSelected && styles.selectedDayText]}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }
    
    return days;
  };

  const handleAppointmentBooking = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Error', 'Please select a date and time');
      return;
    }
    
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      date: selectedDate,
      time: selectedTime,
      type: 'Free Consultation',
      status: 'pending' as const
    };
    
    setAppointments((prev: Appointment[]) => [...prev, newAppointment]);
    setSelectedDate(null);
    setSelectedTime('');
    setActiveTab('manage');
    
    Alert.alert(
      'Success',
      `Appointment booked successfully for ${selectedDate.toDateString()} at ${selectedTime}`,
      [{ text: 'OK' }]
    );
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setSelectedDate(appointment.date);
    setSelectedTime(appointment.time);
    setEditModalVisible(true);
  };

  const handleUpdateAppointment = () => {
    if (!editingAppointment || !selectedDate || !selectedTime) return;
    
    setAppointments((prev: Appointment[]) => prev.map((apt: Appointment) => 
      apt.id === editingAppointment.id 
        ? { ...apt, date: selectedDate, time: selectedTime }
        : apt
    ));
    
    setEditModalVisible(false);
    setEditingAppointment(null);
    setSelectedDate(null);
    setSelectedTime('');
    
    Alert.alert('Success', 'Appointment updated successfully!');
  };

  const handleCancelAppointment = (appointmentId: string) => {
    Alert.alert(
      'Cancel Appointment',
      'Are you sure you want to cancel this appointment?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            setAppointments((prev: Appointment[]) => prev.map((apt: Appointment) => 
              apt.id === appointmentId 
                ? { ...apt, status: 'cancelled' as const }
                : apt
            ));
            Alert.alert('Success', 'Appointment cancelled successfully!');
          }
        }
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#4CAF50';
      case 'pending': return '#FF9800';
      case 'cancelled': return '#F44336';
      default: return '#666';
    }
  };

  const renderAppointmentCard = (appointment: Appointment) => (
    <View key={appointment.id} style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <View style={styles.appointmentInfo}>
          <Text style={styles.appointmentDate}>
            {appointment.date.toDateString()}
          </Text>
          <Text style={styles.appointmentTime}>{appointment.time}</Text>
          <Text style={styles.appointmentType}>{appointment.type}</Text>
          {appointment.doctor && (
            <Text style={styles.appointmentDoctor}>{appointment.doctor}</Text>
          )}
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(appointment.status) }]}>
          <Text style={styles.statusText}>{appointment.status.toUpperCase()}</Text>
        </View>
      </View>
      
      {appointment.status !== 'cancelled' && (
        <View style={styles.appointmentActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleEditAppointment(appointment)}
          >
            <Edit3 size={16} color="#8C1D40" />
            <Text style={styles.actionButtonText}>Reschedule</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => handleCancelAppointment(appointment.id)}
          >
            <Trash2 size={16} color="#F44336" />
            <Text style={[styles.actionButtonText, styles.cancelButtonText]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderTabButton = (tab: string, label: string, IconComponent: any, iconProps: any) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
      onPress={() => setActiveTab(tab as 'manage' | 'book')}
    >
      <IconComponent {...iconProps} />
      <Text style={[styles.tabButtonText, activeTab === tab && styles.activeTabButtonText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Calendar size={32} color="#fff" />
        <Text style={styles.headerTitle}>Appointments</Text>
        <Text style={styles.headerSubtitle}>
          Manage your consultations with our visa experts
        </Text>
      </View>

      <View style={styles.tabContainer}>
        {renderTabButton('manage', 'My Appointments', Eye, { size: 20, color: activeTab === 'manage' ? '#fff' : '#8C1D40' })}
        {renderTabButton('book', 'Book New', Plus, { size: 20, color: activeTab === 'book' ? '#fff' : '#8C1D40' })}
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {activeTab === 'manage' ? (
          <View style={styles.appointmentContainer}>
            <Text style={styles.sectionTitle}>Your Appointments</Text>
            {appointments.length === 0 ? (
              <View style={styles.emptyState}>
                <Calendar size={48} color="#ccc" />
                <Text style={styles.emptyStateText}>No appointments found</Text>
                <Text style={styles.emptyStateSubtext}>Book your first consultation to get started</Text>
                <TouchableOpacity 
                  style={styles.primaryButton}
                  onPress={() => setActiveTab('book')}
                >
                  <Text style={styles.primaryButtonText}>Book Appointment</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.appointmentsList}>
                {appointments.map(renderAppointmentCard)}
              </View>
            )}
          </View>
        ) : (
          <View style={styles.appointmentContainer}>
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Calendar size={20} color="#8C1D40" />
                <Text style={styles.sectionTitle}>Select Date</Text>
              </View>
              
              <View style={styles.calendarContainer}>
                <View style={styles.calendarHeader}>
                  <TouchableOpacity 
                    style={styles.navButton}
                    onPress={() => {
                      if (currentMonth === 0) {
                        setCurrentMonth(11);
                        setCurrentYear(currentYear - 1);
                      } else {
                        setCurrentMonth(currentMonth - 1);
                      }
                    }}
                  >
                    <ChevronLeft size={20} color="#8C1D40" />
                  </TouchableOpacity>
                  
                  <Text style={styles.calendarHeaderText}>
                    {monthNames[currentMonth]} {currentYear}
                  </Text>
                  
                  <TouchableOpacity 
                    style={styles.navButton}
                    onPress={() => {
                      if (currentMonth === 11) {
                        setCurrentMonth(0);
                        setCurrentYear(currentYear + 1);
                      } else {
                        setCurrentMonth(currentMonth + 1);
                      }
                    }}
                  >
                    <ChevronRight size={20} color="#8C1D40" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.calendarGrid}>
                  <Text style={styles.dayHeader}>Sun</Text>
                  <Text style={styles.dayHeader}>Mon</Text>
                  <Text style={styles.dayHeader}>Tue</Text>
                  <Text style={styles.dayHeader}>Wed</Text>
                  <Text style={styles.dayHeader}>Thu</Text>
                  <Text style={styles.dayHeader}>Fri</Text>
                  <Text style={styles.dayHeader}>Sat</Text>
                  {renderCalendar()}
                </View>
              </View>
            </View>
            
            {selectedDate && (
              <View style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <Clock size={20} color="#8C1D40" />
                  <Text style={styles.sectionTitle}>Select Time</Text>
                </View>
                
                <Text style={styles.selectedDateText}>
                  {selectedDate.toDateString()}
                </Text>
                
                <View style={styles.timeSlots}>
                  {timeSlots.map((slot) => (
                    <TouchableOpacity
                      key={slot}
                      style={[
                        styles.timeSlot,
                        selectedTime === slot && styles.selectedTimeSlot
                      ]}
                      onPress={() => setSelectedTime(slot)}
                    >
                      <Text style={[
                        styles.timeSlotText,
                        selectedTime === slot && styles.selectedTimeSlotText
                      ]}>
                        {slot}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
            
            {selectedDate && selectedTime && (
              <View style={styles.summaryCard}>
                <View style={styles.summaryHeader}>
                  <CheckCircle size={20} color="#4CAF50" />
                  <Text style={styles.summaryTitle}>Appointment Summary</Text>
                </View>
                
                <View style={styles.summaryDetails}>
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Date:</Text>
                    <Text style={styles.summaryValue}>{selectedDate.toDateString()}</Text>
                  </View>
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Time:</Text>
                    <Text style={styles.summaryValue}>{selectedTime}</Text>
                  </View>
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Duration:</Text>
                    <Text style={styles.summaryValue}>60 minutes</Text>
                  </View>
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Type:</Text>
                    <Text style={styles.summaryValue}>Free Consultation</Text>
                  </View>
                </View>
              </View>
            )}
            
            <TouchableOpacity 
              style={[styles.primaryButton, (!selectedDate || !selectedTime) && styles.disabledButton]} 
              onPress={handleAppointmentBooking}
              disabled={!selectedDate || !selectedTime}
            >
              <Text style={[styles.primaryButtonText, (!selectedDate || !selectedTime) && styles.disabledButtonText]}>
                {selectedDate && selectedTime ? 'Confirm Appointment' : 'Select Date & Time'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <Modal
        visible={editModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Reschedule Appointment</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => {
                setEditModalVisible(false);
                setEditingAppointment(null);
                setSelectedDate(null);
                setSelectedTime('');
              }}
            >
              <X size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Calendar size={20} color="#8C1D40" />
                <Text style={styles.sectionTitle}>Select New Date</Text>
              </View>
              
              <View style={styles.calendarContainer}>
                <View style={styles.calendarHeader}>
                  <TouchableOpacity 
                    style={styles.navButton}
                    onPress={() => {
                      if (currentMonth === 0) {
                        setCurrentMonth(11);
                        setCurrentYear(currentYear - 1);
                      } else {
                        setCurrentMonth(currentMonth - 1);
                      }
                    }}
                  >
                    <ChevronLeft size={20} color="#8C1D40" />
                  </TouchableOpacity>
                  
                  <Text style={styles.calendarHeaderText}>
                    {monthNames[currentMonth]} {currentYear}
                  </Text>
                  
                  <TouchableOpacity 
                    style={styles.navButton}
                    onPress={() => {
                      if (currentMonth === 11) {
                        setCurrentMonth(0);
                        setCurrentYear(currentYear + 1);
                      } else {
                        setCurrentMonth(currentMonth + 1);
                      }
                    }}
                  >
                    <ChevronRight size={20} color="#8C1D40" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.calendarGrid}>
                  <Text style={styles.dayHeader}>Sun</Text>
                  <Text style={styles.dayHeader}>Mon</Text>
                  <Text style={styles.dayHeader}>Tue</Text>
                  <Text style={styles.dayHeader}>Wed</Text>
                  <Text style={styles.dayHeader}>Thu</Text>
                  <Text style={styles.dayHeader}>Fri</Text>
                  <Text style={styles.dayHeader}>Sat</Text>
                  {renderCalendar()}
                </View>
              </View>
            </View>
            
            {selectedDate && (
              <View style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <Clock size={20} color="#8C1D40" />
                  <Text style={styles.sectionTitle}>Select New Time</Text>
                </View>
                
                <Text style={styles.selectedDateText}>
                  {selectedDate.toDateString()}
                </Text>
                
                <View style={styles.timeSlots}>
                  {timeSlots.map((slot) => (
                    <TouchableOpacity
                      key={slot}
                      style={[
                        styles.timeSlot,
                        selectedTime === slot && styles.selectedTimeSlot
                      ]}
                      onPress={() => setSelectedTime(slot)}
                    >
                      <Text style={[
                        styles.timeSlotText,
                        selectedTime === slot && styles.selectedTimeSlotText
                      ]}>
                        {slot}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => {
                  setEditModalVisible(false);
                  setEditingAppointment(null);
                  setSelectedDate(null);
                  setSelectedTime('');
                }}
              >
                <Text style={styles.secondaryButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.primaryButton, (!selectedDate || !selectedTime) && styles.disabledButton]} 
                onPress={handleUpdateAppointment}
                disabled={!selectedDate || !selectedTime}
              >
                <Text style={[styles.primaryButtonText, (!selectedDate || !selectedTime) && styles.disabledButtonText]}>
                  Update Appointment
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <ChatBot />
    </View>
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
    marginTop: 12,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 22,
  },
  
  appointmentContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 20,
  },
  
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  
  calendarContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  calendarHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayHeader: {
    width: (width - 112) / 7,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  calendarDay: {
    width: (width - 112) / 7,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedDay: {
    backgroundColor: '#8C1D40',
    borderRadius: 20,
  },
  calendarDayText: {
    fontSize: 14,
    color: '#333',
  },
  selectedDayText: {
    color: '#fff',
    fontWeight: '600',
  },
  
  selectedDateText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeSlot: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 24,
    backgroundColor: '#f8f9fa',
    minWidth: 100,
    alignItems: 'center',
  },
  selectedTimeSlot: {
    backgroundColor: '#8C1D40',
    borderColor: '#8C1D40',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  selectedTimeSlotText: {
    color: '#fff',
    fontWeight: '600',
  },
  
  summaryCard: {
    backgroundColor: '#f0f8f0',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e8f5e8',
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  summaryDetails: {
    gap: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  
  primaryButton: {
    backgroundColor: '#8C1D40',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',
    shadowOpacity: 0,
    elevation: 0,
  },
  disabledButtonText: {
    color: '#999',
  },
  
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 24,
    marginTop: -20,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 1,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  activeTabButton: {
    backgroundColor: '#8C1D40',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8C1D40',
  },
  activeTabButtonText: {
    color: '#fff',
  },
  
  scrollContainer: {
    flex: 1,
  },
  
  appointmentsList: {
    gap: 16,
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  appointmentTime: {
    fontSize: 14,
    color: '#8C1D40',
    fontWeight: '500',
    marginBottom: 4,
  },
  appointmentType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  appointmentDoctor: {
    fontSize: 12,
    color: '#999',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  appointmentActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#8C1D40',
    borderRadius: 8,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8C1D40',
  },
  cancelButton: {
    borderColor: '#F44336',
  },
  cancelButtonText: {
    color: '#F44336',
  },
  
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 24,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  secondaryButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});