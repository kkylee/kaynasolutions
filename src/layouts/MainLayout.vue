<template>
  <div class="flex min-h-screen flex-col bg-white">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
    >
      Skip to content
    </a>
    <main id="main" class="flex-1">
      <slot />
    </main>
  </div>
</template>
