import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <Stack>
          <Stack.Screen name='index' options={{ title: 'Shop' }} />
          <Stack.Screen name='doll/[id]' options={{ title: 'Doll' }} />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
