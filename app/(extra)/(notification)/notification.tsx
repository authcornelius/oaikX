import { ScrollView, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Octicons } from '@expo/vector-icons';
import Back from '@/components/Back'
import { recommendedData } from '@/constants/data'

// Define notification data structure
interface Notification {
  id: string;
  title: string;
  content: string;
  isRead: boolean;
  date: string;
  timeStamp : Date;
  relatedPropertyId?: string; // Reference to a property if notification is about a property
}

// Create sample notification data based on the property data
const generateNotificationData = (): Notification[] => {
  const notifications: Notification[] = [];
  
  // Create notifications related to properties
  recommendedData.slice(0, 2).forEach((property, index) => {
    notifications.push({
      id: `new-property-${property.id}`,
      title: "New Property Listed",
      content: `${property.title} is now available for ${property.price}.`,
      isRead: false,
      date: "today",
      relatedPropertyId: property.id,
      timeStamp: new Date()
    });
  });
  
  // Add some system notifications
  notifications.push({
    id: "payment-1",
    title: "Payment Successful",
    content: "Your monthly payment for property ID #12345 was successful.",
    isRead: true,
    date: "yesterday",
    timeStamp : new Date()
  });
  
  notifications.push({
    id: "system-1",
    title: "Account Verified",
    content: "Your account has been successfully verified. You now have full access to all features.",
    isRead: true,
    date: "yesterday",
    timeStamp : new Date()
  });
  
  return notifications;
};

export default function Notification() {
  const [notifications, setNotifications] = useState<Notification[]>(generateNotificationData());
  
  // Count unread notifications
  const unreadCount = notifications.filter(item => !item.isRead).length;
  
  // Group notifications by date
  const todayNotifications = notifications.filter(item => item.date === "today");
  const yesterdayNotifications = notifications.filter(item => item.date === "yesterday");
  
  // Mark all as read function
  const markAllAsRead = () => {
    setNotifications(notifications.map(item => ({
      ...item,
      isRead: true
    })));
  };
  
  // Mark single notification as read
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(item => 
      item.id === id ? { ...item, isRead: true } : item
    ));
  };
  
  // Navigate to property details (placeholder function)
  const navigateToProperty = (propertyId: string) => {
    console.log(`Navigate to property ${propertyId}`);
    // Implementation would depend on your navigation setup
  };
  
  // Render a notification item
  const renderNotificationItem = (notification: Notification) => (
    <TouchableOpacity 
      key={notification.id}
      onPress={() => {
        markAsRead(notification.id);
        if (notification.relatedPropertyId) {
          navigateToProperty(notification.relatedPropertyId);
        }
      }}
      className='flex flex-row mt-3 pr-5'
    >
      {!notification.isRead && (
        <Octicons name="dot-fill" size={24} color="#0D1D35" className='mt-1 mr-3' />
      )}
      {notification.isRead && (
        <View className='w-[24px] mr-3' />
      )}
      <View className='flex-1'>
        <Text className='text-lg font-inter-medium text-[#0D1D35]'>
          {notification.title}
        </Text>
        <Text className='text-base font-inter-regular text-[#0D1D35]'>
          {notification.content}
        </Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView
        className='flex-1 bg-white px-5'
    >
        <View className='flex flex-row items-center justify-between'>
          <Back />

          <Text className='text-lg font-inter-medium'>Notification</Text>
          
          {unreadCount >= 0 && (
            <View className='bg-[#0D1D35] px-3 py-2 rounded-full'>
              <Text className='text-[#ffff] font-inter-medium'>{unreadCount} NEW</Text>
            </View>
          )}
        </View>

        <ScrollView
          className='mt-5'
          showsVerticalScrollIndicator={false}
        >
          {/* Today's notifications */}
          {todayNotifications.length > 0 && (
            <View className='mb-6'>
              <View className='flex flex-row items-center justify-between'>
                <Text className='text-xl font-inter-regular text-gray-500'>
                  TODAY
                </Text>

                {unreadCount > 0 && (
                  <TouchableOpacity onPress={markAllAsRead}>
                    <Text className='text-lg font-inter-regular text-blue-500'>
                      Mark all as read
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {todayNotifications.map(renderNotificationItem)}
            </View>
          )}

          {/* Yesterday's notifications */}
          {yesterdayNotifications.length > 0 && (
            <View>
              <Text className='text-xl font-inter-regular text-gray-500 mb-3'>
                YESTERDAY
              </Text>

              {yesterdayNotifications.map(renderNotificationItem)}
            </View>
          )}
          
          {/* Show message if no notifications */}
          {notifications.length === 0 && (
            <View className="items-center justify-center py-10">
              <Text className="text-lg font-inter-medium text-gray-500">
                No notifications yet
              </Text>
            </View>
          )}
        </ScrollView>
    </SafeAreaView>
  )
}
