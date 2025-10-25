/// <reference types="vite/client" />

declare module 'vue' {
  export function ref<T>(value: T): { value: T }
  export function onMounted(callback: () => void): void
  export function onUnmounted(callback: () => void): void
  export function reactive<T extends object>(target: T): T
  export function computed<T>(getter: () => T): { value: T }
  export * from '@vue/runtime-core'
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
