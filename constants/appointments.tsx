import { useState, useCallback, useMemo } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';

export interface Appointment {
  id: string;
  date: Date;
  time: string;
  type: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  notes?: string;
}

interface AppointmentContextType {
  appointments: Appointment[];
  isLoading: boolean;
  bookAppointment: (date: Date, time: string, type?: string) => Promise<void>;
  cancelAppointment: (id: string) => Promise<void>;
  rescheduleAppointment: (id: string, newDate: Date, newTime: string) => Promise<void>;
  loadAppointments: () => Promise<void>;
}

const APPOINTMENTS_STORAGE_KEY = '@imigrate_appointments';

export const [AppointmentProvider, useAppointments] = createContextHook<AppointmentContextType>(() => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadAppointments = useCallback(async () => {
    setIsLoading(true);
    try {
      if (Platform.OS !== 'web') {
        const stored = await AsyncStorage.getItem(APPOINTMENTS_STORAGE_KEY);
        if (stored) {
          const parsedAppointments = JSON.parse(stored).map((apt: any) => ({
            ...apt,
            date: new Date(apt.date),
          }));
          setAppointments(parsedAppointments);
        }
      }
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveAppointments = useCallback(async (newAppointments: Appointment[]) => {
    try {
      if (Platform.OS !== 'web') {
        await AsyncStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(newAppointments));
      }
    } catch (error) {
      console.error('Error saving appointments:', error);
    }
  }, []);

  const bookAppointment = useCallback(async (date: Date, time: string, type: string = 'Free Consultation') => {
    setIsLoading(true);
    try {
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        date,
        time,
        type,
        status: 'confirmed',
      };

      const updatedAppointments = [...appointments, newAppointment];
      setAppointments(updatedAppointments);
      await saveAppointments(updatedAppointments);
    } catch (error) {
      console.error('Error booking appointment:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [appointments, saveAppointments]);

  const cancelAppointment = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const updatedAppointments = appointments.map(apt =>
        apt.id === id ? { ...apt, status: 'cancelled' as const } : apt
      );
      setAppointments(updatedAppointments);
      await saveAppointments(updatedAppointments);
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [appointments, saveAppointments]);

  const rescheduleAppointment = useCallback(async (id: string, newDate: Date, newTime: string) => {
    setIsLoading(true);
    try {
      const updatedAppointments = appointments.map(apt =>
        apt.id === id ? { ...apt, date: newDate, time: newTime } : apt
      );
      setAppointments(updatedAppointments);
      await saveAppointments(updatedAppointments);
    } catch (error) {
      console.error('Error rescheduling appointment:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [appointments, saveAppointments]);

  return useMemo(() => ({
    appointments,
    isLoading,
    bookAppointment,
    cancelAppointment,
    rescheduleAppointment,
    loadAppointments,
  }), [appointments, isLoading, bookAppointment, cancelAppointment, rescheduleAppointment, loadAppointments]);
});