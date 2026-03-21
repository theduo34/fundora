import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { AppButton } from '@/components/ui/app-button';
import { useRouter } from 'expo-router';

export default function NotFoundScreen() {
  const router = useRouter();
  
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>
        <AppButton 
          title="Go to home screen!" 
          onPress={() => router.replace('/(protected)/(tabs)/home')}
          className="mt-4"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FAF5FB',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D0D3A',
  },
});
