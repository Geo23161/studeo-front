import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.studeo.elifeg',
  appName: 'Studeo',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
