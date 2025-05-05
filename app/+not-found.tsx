import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';


export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'This is not a screen',
          headerTitleAlign: 'center',
        }}
      />
      <Link href="/" style={styles.link}>
        Go to home screen
      </Link>
      
      <Link href="/(onboarding)" style={styles.link}>
        Go to onboarding screens
      </Link>
      <Link href="/(onboarding)/login" style={styles.link}>
        Go to login screen
      </Link>
      <Link href="/(onboarding)/signup" style={styles.link}>
        Go to signup screen
      </Link>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
