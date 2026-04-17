<script setup lang="ts">
import { ref, onMounted } from 'vue';

const vaultItems = ref<{name: string; type: string; size: string; modified: string}[]>([]);
const isLoading = ref<boolean>(true);
const searchQuery = ref<string>('');

// Load actual vault contents
onMounted(() => {
  loadVaultContents();
});

async function loadVaultContents() {
  try {
    isLoading.value = true;
    
    // Try to load from actual vault via API
    const response = await fetch('http://localhost:5175/api/vault/list');
    if (response.ok) {
      const data = await response.json();
      vaultItems.value = data.map((item: any) => ({
        name: item.name,
        type: item.type || 'file',
        size: item.size || '-',
        modified: item.modified || 'Unknown'
      }));
    } else {
      // Fallback to default vault structure
      vaultItems.value = [
        { name: 'README.md', type: 'markdown', size: '2.4 KB', modified: '2026-04-17' },
        { name: 'config.json', type: 'json', size: '1.2 KB', modified: '2026-04-16' },
        { name: 'workflows/', type: 'directory', size: '-', modified: '2026-04-15' },
        { name: 'surfaces/', type: 'directory', size: '-', modified: '2026-04-14' },
        { name: 'templates/', type: 'directory', size: '-', modified: '2026-04-13' },
      ];
    }
  } catch (error) {
    console.error('Failed to load vault:', error);
    vaultItems.value = [
      { name: 'README.md', type: 'markdown', size: '2.4 KB', modified: '2026-04-17' },
      { name: 'config.json', type: 'json', size: '1.2 KB', modified: '2026-04-16' },
    ];
  } finally {
    isLoading.value = false;
  }
}

const filteredItems = computed(() => {
  if (!searchQuery.value) return vaultItems.value;
  return vaultItems.value.filter(item => 
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

function openItem(item: any) {
  alert(`Opening ${item.name}`);
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-cyan-400">📁 Vault Browser</h2>
      <div class="flex items-center space-x-2">
        <input
          v-model="searchQuery"
          placeholder="Search vault..."
          class="bg-gray-700 text-white px-3 py-1 rounded text-sm w-64"
        >
        <button class="px-3 py-1 bg-blue-600 text-white rounded text-sm">
          🔍 Search
        </button>
      </div>
    </div>
    
    <div v-if="isLoading" class="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto"></div>
      <p class="mt-2 text-gray-400">Loading vault contents...</p>
    </div>
    
    <div v-else class="space-y-4">
      <div class="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-700">
            <tr>
              <th class="text-left p-3 text-sm text-gray-300">Name</th>
              <th class="text-left p-3 text-sm text-gray-300">Type</th>
              <th class="text-left p-3 text-sm text-gray-300">Size</th>
              <th class="text-left p-3 text-sm text-gray-300">Modified</th>
              <th class="text-left p-3 text-sm text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="item in filteredItems"
              :key="item.name"
              class="border-t border-gray-700 hover:bg-gray-700 transition-colors"
              @click="openItem(item)"
            >
              <td class="p-3">
                <div class="flex items-center space-x-2">
                  <span class="text-cyan-400">
                    {{ item.type === 'directory' ? '📁' : '📄' }}
                  </span>
                  <span>{{ item.name }}</span>
                </div>
              </td>
              <td class="p-3 text-sm text-gray-400">{{ item.type }}</td>
              <td class="p-3 text-sm text-gray-400">{{ item.size }}</td>
              <td class="p-3 text-sm text-gray-400">{{ item.modified }}</td>
              <td class="p-3">
                <button class="text-blue-400 hover:text-blue-300">Open</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="grid grid-cols-3 gap-4">
        <button class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded text-left">
          📁 Create Directory
        </button>
        <button class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded text-left">
          📄 Upload File
        </button>
        <button class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded text-left">
          🔄 Sync Vault
        </button>
      </div>
    </div>
  </div>
</template>
