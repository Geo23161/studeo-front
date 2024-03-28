import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

// you can copy the base structure of manifest object.
const manifestForPlugIn : VitePWAOptions = {
  registerType:"prompt" as 'prompt',
  includeAssests:['favicon.ico', "apple-touch-icon.png", "masked-icon.svg"],
  manifest:{
    name:"Studeo",
    short_name:"Studeo",
    description:"La super app des etudiants",
    icons:[{
      src: '/android-chrome-192x192.png',
      sizes:'192x192',
      type:'image/png',
      purpose:'favicon'
    },
    {
      src:'/android-chrome-512x512.png',
      sizes:'512x512',
      type:'image/png',
      purpose:'favicon'
    },
    {
      src: '/apple-touch-icon.png',
      sizes:'180x180',
      type:'image/png',
      purpose:'apple touch icon',
    },
    {
      src: '/maskable_icon.png',
      sizes:'512x512',
      type:'image/png',
      purpose:'any maskable',
    }
  ],
  theme_color:'#481c4b',
  background_color:'#ffffff',
  display:"standalone",
  scope:'/',
  start_url:"/",
  orientation:'portrait'
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy(),
    VitePWA(manifestForPlugIn)
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
