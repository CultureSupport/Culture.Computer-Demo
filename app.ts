import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center p-2 sm:p-6 font-sans select-none overflow-x-hidden">
      
      <!-- Top Control Bar / Header info -->
      <header class="mb-4 text-center">
        <h1 class="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
          Galaxy S26 Virtual Workspace & Local Market Hub
        </h1>
        <p class="text-xs sm:text-sm text-neutral-400 mt-1">Expanded meetings for audio production, DJ sessions, cloud nodes, and local market setups</p>
      </header>

      <!-- Android Galaxy S26 Device Frame -->
      <div class="relative w-full max-w-[390px] sm:max-w-[420px] h-[820px] bg-neutral-900 rounded-[52px] p-3 sm:p-4 shadow-[0_0_50px_rgba(16,185,129,0.15)] border-4 border-neutral-800 flex flex-col overflow-hidden">
        
        <!-- Galaxy S26 Punch-hole Camera & Top Bezel -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-900 rounded-b-2xl z-50 flex items-center justify-center">
          <div class="w-3 h-3 rounded-full bg-black border border-neutral-700 absolute top-2 right-10"></div>
          <div class="w-2 h-2 rounded-full bg-neutral-950 absolute top-2.5 left-10"></div>
        </div>

        <!-- Phone Status Bar -->
        <div class="pt-3 px-5 flex justify-between items-center text-xs text-neutral-400 font-medium z-40">
          <span>{{ currentTime() }}</span>
          <div class="flex items-center space-x-2">
            <span class="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full font-bold">5G+</span>
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.29 19h15.42l-1.68-1.39C19.26 16.07 20 14.12 20 12c0-4.97-4.03-9-9-9zm0 2c3.87 0 7 3.13 7 7s-3.13 7-7 7-7-3.13-7-7 3.13-7 7-7z"/></svg>
            <div class="w-5 h-2.5 border border-neutral-400 rounded-sm p-0.5 flex items-center">
              <div class="w-3.5 h-full bg-emerald-400 rounded-xs"></div>
            </div>
          </div>
        </div>

        <!-- Inner Screen Container -->
        <div class="mt-2 flex-1 bg-neutral-950 rounded-[38px] flex flex-col overflow-hidden relative border border-neutral-800/80">
          
          <!-- Desktop Mode Toggle / Header Banner inside phone -->
          <div class="bg-gradient-to-r from-neutral-900 to-neutral-900/90 px-4 py-3 border-b border-neutral-800 flex items-center justify-between z-20">
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
                S26
              </div>
              <div>
                <h2 class="text-xs font-bold text-neutral-200">One UI 8.5 / DeX Studio</h2>
                <p class="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Multi-session active
                </p>
              </div>
            </div>
            
            <button 
              (click)="toggleDesktopMode()"
              class="px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all"
              [class]="isDesktopMode() ? 'bg-cyan-500 text-neutral-950 shadow-lg shadow-cyan-500/20' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'">
              {{ isDesktopMode() ? 'Desktop View' : 'Phone View' }}
            </button>
          </div>

          <!-- App Main Content Area based on Active Tab -->
          <div class="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
            
            <!-- MARKETPLACE TAB -->
            @if (activeTab() === 'market') {
              <div class="space-y-4 animate-fade-in">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-bold text-neutral-200">Local Artisan & Tech Market</h3>
                  <span class="text-[10px] text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded-md border border-neutral-800">Within 2.5 km</span>
                </div>

                <!-- Search & Filters -->
                <div class="relative">
                  <input 
                    type="text" 
                    [value]="marketSearchQuery()"
                    (input)="updateMarketSearch($event)"
                    placeholder="Search fresh produce, gadgets, local crafts..." 
                    class="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors">
                </div>

                <!-- Categories -->
                <div class="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
                  @for (cat of marketCategories; track cat) {
                    <button 
                      (click)="selectedCategory.set(cat)"
                      class="px-3 py-1 rounded-full text-[11px] whitespace-nowrap transition-all"
                      [class]="selectedCategory() === cat ? 'bg-emerald-500 text-neutral-950 font-bold' : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-neutral-200'">
                      {{ cat }}
                    </button>
                  }
                </div>

                <!-- Products Grid / List -->
                <div class="grid grid-cols-2 gap-3">
                  @for (item of filteredMarketItems(); track item.id) {
                    <div class="bg-neutral-900/80 border border-neutral-800/80 rounded-2xl p-3 flex flex-col justify-between hover:border-emerald-500/40 transition-all group">
                      <div>
                        <div class="h-24 rounded-xl bg-neutral-950 mb-2.5 overflow-hidden relative flex items-center justify-center text-3xl">
                          {{ item.emoji }}
                          <span class="absolute top-2 right-2 text-[10px] bg-neutral-900/80 backdrop-blur px-1.5 py-0.5 rounded text-emerald-400 font-semibold border border-neutral-700/50">
                            {{ item.distance }}
                          </span>
                        </div>
                        <h4 class="text-xs font-bold text-neutral-200 group-hover:text-emerald-400 transition-colors">{{ item.name }}</h4>
                        <p class="text-[10px] text-neutral-400 mt-0.5">{{ item.vendor }}</p>
                      </div>
                      <div class="mt-3 flex items-center justify-between">
                        <span class="text-xs font-extrabold text-emerald-400">{{ item.price }}</span>
                        <button 
                          (click)="addToCart(item)"
                          class="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-neutral-950 flex items-center justify-center font-bold text-sm transition-all">
                          +
                        </button>
                      </div>
                    </div>
                  }
                </div>
              </div>
            }

            <!-- MEETINGS TAB (Expanded for Audio, DJ, Cloud & Local Market Setups) -->
            @if (activeTab() === 'meetings') {
              <div class="space-y-4 animate-fade-in">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-bold text-neutral-200">Creative & Tech Sessions</h3>
                  <button 
                    (click)="createNewMeeting()"
                    class="px-2.5 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 rounded-lg text-[10px] font-bold hover:bg-cyan-500 hover:text-neutral-950 transition-all">
                    + Host Session
                  </button>
                </div>

                <!-- Active Meeting Simulation -->
                <div class="bg-neutral-900 border border-neutral-800 rounded-2xl p-3 relative overflow-hidden">
                  <div class="absolute top-3 left-3 bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 z-10">
                    <span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                    ACTIVE: {{ activeMeetingTitle() }}
                  </div>
                  
                  <div class="h-40 rounded-xl bg-neutral-950 flex flex-col items-center justify-center relative overflow-hidden border border-neutral-800">
                    <div class="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <div class="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/30 mb-2">
                      🎧
                    </div>
                    <span class="text-xs font-bold text-neutral-200">{{ activeMeetingTitle() }}</span>
                    <span class="text-[10px] text-neutral-400 mt-1">Multi-User Sync • Cloud VM Node Active</span>
                  </div>

                  <!-- Meeting Controls -->
                  <div class="flex items-center justify-center space-x-3 mt-3">
                    <button class="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 flex items-center justify-center text-sm" title="Audio">🎙️</button>
                    <button class="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 flex items-center justify-center text-sm" title="Video">📷</button>
                    <button class="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 flex items-center justify-center text-sm" title="Screen Share">💻</button>
                    <button class="w-9 h-9 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center text-sm font-bold" title="End">📞</button>
                  </div>
                </div>

                <!-- Scheduled / Arranged Sessions for Audio, DJ, Cloud & Market -->
                <div class="space-y-2">
                  <h4 class="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">Arranged Sessions & Streams</h4>
                  @for (m of scheduledMeetings(); track m.id) {
                    <div class="bg-neutral-900/60 border border-neutral-800 rounded-xl p-3 flex items-center justify-between">
                      <div class="pr-2">
                        <div class="flex items-center space-x-1.5">
                          <span class="text-xs">{{ m.icon }}</span>
                          <h5 class="text-xs font-bold text-neutral-200">{{ m.title }}</h5>
                        </div>
                        <p class="text-[10px] text-neutral-400 mt-0.5">{{ m.time }} • Host: {{ m.host }}</p>
                      </div>
                      <button 
                        (click)="selectActiveMeeting(m.title)"
                        class="px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg text-[10px] font-bold hover:bg-cyan-500 hover:text-neutral-950 transition-all whitespace-nowrap">
                        Join
                      </button>
                    </div>
                  }
                </div>
              </div>
            }

            <!-- CHAT TAB -->
            @if (activeTab() === 'chat') {
              <div class="space-y-3 animate-fade-in flex flex-col h-full">
                <div class="flex items-center justify-between pb-2 border-b border-neutral-800">
                  <div class="flex items-center space-x-2">
                    <div class="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                      💬
                    </div>
                    <div>
                      <h3 class="text-xs font-bold text-neutral-200">Global & Local Chat Channel</h3>
                      <p class="text-[9px] text-emerald-400">Online • 32 members in session</p>
                    </div>
                  </div>
                </div>

                <!-- Messages Feed -->
                <div class="flex-1 space-y-2 overflow-y-auto max-h-[340px] pr-1">
                  @for (msg of chatMessages(); track msg.id) {
                    <div class="flex flex-col" [class.items-end]="msg.isMe">
                      <div class="flex items-center space-x-1 mb-0.5">
                        <span class="text-[9px] text-neutral-400 font-semibold">{{ msg.sender }}</span>
                        <span class="text-[8px] text-neutral-600">{{ msg.time }}</span>
                      </div>
                      <div class="max-w-[85%] rounded-2xl px-3 py-2 text-xs"
                           [class]="msg.isMe ? 'bg-emerald-500 text-neutral-950 font-medium rounded-tr-none' : 'bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-tl-none'">
                        {{ msg.text }}
                      </div>
                    </div>
                  }
                </div>

                <!-- Chat Input -->
                <div class="flex items-center space-x-2 pt-2 border-t border-neutral-800 mt-auto">
                  <input 
                    type="text" 
                    [value]="newMessageText()"
                    (input)="newMessageText.set($event.target['value'])"
                    (keydown.enter)="sendChatMessage()"
                    placeholder="Broadcast message to meeting & chat..."
                    class="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-emerald-500">
                  <button 
                    (click)="sendChatMessage()"
                    class="px-3 py-2 bg-emerald-500 text-neutral-950 rounded-xl text-xs font-bold hover:bg-emerald-400 transition-all">
                    Send
                  </button>
                </div>
              </div>
            }

            <!-- DESKTOP MODE / MULTI-WINDOW OVERVIEW TAB -->
            @if (activeTab() === 'desktop') {
              <div class="space-y-4 animate-fade-in">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-bold text-neutral-200">Galaxy DeX Studio Workspace</h3>
                  <span class="text-[10px] bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded font-bold">Pro Mode</span>
                </div>

                <div class="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-3">
                  <div class="flex items-center justify-between text-xs text-neutral-300">
                    <span class="font-semibold">Virtual Screen Split & VM Nodes</span>
                    <span class="text-emerald-400 font-bold">Active</span>
                  </div>
                  
                  <div class="grid grid-cols-3 gap-2">
                    <div (click)="activeTab.set('market')" class="bg-neutral-950 border border-neutral-800 hover:border-emerald-500 p-2.5 rounded-xl cursor-pointer text-center transition-all">
                      <span class="text-xl">🛍️</span>
                      <p class="text-[10px] font-bold text-neutral-300 mt-1">Market</p>
                    </div>
                    <div (click)="activeTab.set('meetings')" class="bg-neutral-950 border border-neutral-800 hover:border-cyan-500 p-2.5 rounded-xl cursor-pointer text-center transition-all">
                      <span class="text-xl">🎧</span>
                      <p class="text-[10px] font-bold text-neutral-300 mt-1">Audio / DJ</p>
                    </div>
                    <div (click)="activeTab.set('chat')" class="bg-neutral-950 border border-neutral-800 hover:border-indigo-500 p-2.5 rounded-xl cursor-pointer text-center transition-all">
                      <span class="text-xl">💬</span>
                      <p class="text-[10px] font-bold text-neutral-300 mt-1">Chat</p>
                    </div>
                  </div>
                </div>

                <!-- System Performance Stats -->
                <div class="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-3.5 space-y-2">
                  <div class="flex justify-between text-xs">
                    <span class="text-neutral-400">µTorrent Node & VM Container</span>
                    <span class="text-emerald-400 font-bold">Syncing (45 MB/s)</span>
                  </div>
                  <div class="w-full bg-neutral-950 h-2 rounded-full overflow-hidden border border-neutral-800">
                    <div class="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full w-[65%]" rounded-full></div>
                  </div>
                  <div class="flex justify-between text-[10px] text-neutral-500">
                    <span>Cloud Storage: Soundcloud / Spotify</span>
                    <span>SoundCore VM: Online</span>
                  </div>
                </div>
              </div>
            }

          </div>

          <!-- Bottom Navigation Bar inside Galaxy S26 -->
          <nav class="absolute bottom-0 left-0 right-0 h-16 bg-neutral-900/95 backdrop-blur border-t border-neutral-800 px-4 flex items-center justify-around z-30">
            <button 
              (click)="activeTab.set('market')"
              class="flex flex-col items-center space-y-1 transition-colors"
              [class]="activeTab() === 'market' ? 'text-emerald-400 font-bold' : 'text-neutral-500 hover:text-neutral-300'">
              <span class="text-lg">🛍️</span>
              <span class="text-[9px]">Market</span>
            </button>
            <button 
              (click)="activeTab.set('meetings')"
              class="flex flex-col items-center space-y-1 transition-colors"
              [class]="activeTab() === 'meetings' ? 'text-cyan-400 font-bold' : 'text-neutral-500 hover:text-neutral-300'">
              <span class="text-lg">🎧</span>
              <span class="text-[9px]">Sessions</span>
            </button>
            <button 
              (click)="activeTab.set('chat')"
              class="flex flex-col items-center space-y-1 transition-colors"
              [class]="activeTab() === 'chat' ? 'text-indigo-400 font-bold' : 'text-neutral-500 hover:text-neutral-300'">
              <span class="text-lg">💬</span>
              <span class="text-[9px]">Chat</span>
            </button>
            <button 
              (click)="activeTab.set('desktop')"
              class="flex flex-col items-center space-y-1 transition-colors"
              [class]="activeTab() === 'desktop' ? 'text-purple-400 font-bold' : 'text-neutral-500 hover:text-neutral-300'">
              <span class="text-lg">🖥️</span>
              <span class="text-[9px]">DeX Studio</span>
            </button>
          </nav>

        </div>

        <!-- Android Navigation Gesture Bar -->
        <div class="h-4 flex items-center justify-center pt-1">
          <div class="w-32 h-1 bg-neutral-700 rounded-full"></div>
        </div>

      </div>

      <!-- Footer Help / Cart summary -->
      <footer class="mt-4 text-center text-xs text-neutral-500">
        Cart Items: <span class="text-emerald-400 font-bold">{{ cartCount() }}</span> • Galaxy S26 Angular Studio
      </footer>
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.2s ease-out forwards;
    }
    .scrollbar-none::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-none {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `]
})
export class App {
  // State Signals
  currentTime = signal('10:30');
  activeTab = signal<'market' | 'meetings' | 'chat' | 'desktop'>('market');
  isDesktopMode = signal(false);
  marketSearchQuery = signal('');
  selectedCategory = signal('All');
  newMessageText = signal('');
  activeMeetingTitle = signal('DJ & Beatport Live Event Recording');

  marketCategories = ['All', 'Organic Produce', 'Tech Gadgets', 'Artisan Crafts', 'Local Bakery'];

  marketItems = signal([
    { id: 1, name: 'Organic Honey & Berries', vendor: 'Valley Green Farm', price: '$14.50', distance: '0.8 km', category: 'Organic Produce', emoji: '🍯' },
    { id: 2, name: 'S26 Titanium Earbuds Pro', vendor: 'Nexus Tech Lab', price: '$129.00', distance: '1.2 km', category: 'Tech Gadgets', emoji: '🎧' },
    { id: 3, name: 'Handmade Ceramic Mug', vendor: 'Clay Studio Oslo', price: '$22.00', distance: '0.4 km', category: 'Artisan Crafts', emoji: '☕' },
    { id: 4, name: 'Sourdough Country Bread', vendor: 'Nordic Crust', price: '$6.50', distance: '0.5 km', category: 'Local Bakery', emoji: '🍞' },
    { id: 5, name: 'Smart IoT Plant Monitor', vendor: 'EcoHardware', price: '$34.00', distance: '1.9 km', category: 'Tech Gadgets', emoji: '🌱' },
    { id: 6, name: 'Organic Cold-Pressed Juice', vendor: 'Fresh Blend Co.', price: '$5.80', distance: '0.7 km', category: 'Organic Produce', emoji: '🧃' }
  ]);

  scheduledMeetings = signal([
    { id: 1, title: 'DJ Session & Beatport Film Event', time: '11:00 AM', host: 'DJ Nexus', icon: '🎛️' },
    { id: 2, title: 'Spotify Artist Production Masterclass', time: '01:00 PM', host: 'AudioLabs', icon: '🎵' },
    { id: 3, title: 'SoundCloud Profile Upload & Sync', time: '02:30 PM', host: 'CloudBeats', icon: '☁️' },
    { id: 4, title: 'µTorrent Node & VM Machine Sync', time: '04:00 PM', host: 'DevOps Node', icon: '🖥️' },
    { id: 5, title: 'Local Market Setup & Location Hub', time: '05:30 PM', host: 'Market Vendor Co.', icon: '⛺' }
  ]);

  chatMessages = signal([
    { id: 1, sender: 'DJ Nexus', time: '10:14 AM', text: 'Beatport film event recording is locked in for room #101.', isMe: false },
    { id: 2, sender: 'You', time: '10:16 AM', text: 'Awesome! Uploading the latest stems to SoundCloud right now.', isMe: true },
    { id: 3, sender: 'DevOps Node', time: '10:22 AM', text: 'VM machine and µTorrent node are active and seeding.', isMe: false }
  ]);

  cartItems = signal<any[]>([]);

  cartCount = computed(() => this.cartItems().length);

  filteredMarketItems = computed(() => {
    const q = this.marketSearchQuery().toLowerCase();
    const cat = this.selectedCategory();
    return this.marketItems().filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(q) || item.vendor.toLowerCase().includes(q);
      const matchesCat = cat === 'All' || item.category === cat;
      return matchesSearch && matchesCat;
    });
  });

  toggleDesktopMode() {
    this.isDesktopMode.update(v => !v);
    if (this.isDesktopMode()) {
      this.activeTab.set('desktop');
    } else {
      this.activeTab.set('market');
    }
  }

  updateMarketSearch(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.marketSearchQuery.set(val);
  }

  addToCart(item: any) {
    this.cartItems.update(items => [...items, item]);
  }

  selectActiveMeeting(title: string) {
    this.activeMeetingTitle.set(title);
  }

  createNewMeeting() {
    const newTitle = prompt('Enter session or meeting title (DJ, Cloud, Music, Market):') || 'Custom Audio Sync';
    this.scheduledMeetings.update(list => [
      { id: Date.now(), title: newTitle, time: 'Now', host: 'You', icon: '🎙️' },
      ...list
    ]);
    this.activeMeetingTitle.set(newTitle);
  }

  sendChatMessage() {
    const txt = this.newMessageText().trim();
    if (!txt) return;
    
    this.chatMessages.update(msgs => [
      ...msgs,
      { id: Date.now(), sender: 'You', time: 'Just now', text: txt, isMe: true }
    ]);
    this.newMessageText.set('');
  }
}
