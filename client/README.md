# Project Tracker (Frontend Engineering Stress Test)

A mini Jira/Trello-style tracker built in React + TypeScript with custom drag and drop, virtual scrolling, and a timeline view.

**Highlights**
- Kanban, List, and Timeline views using the same data
- Custom drag and drop (no libraries)
- Virtual scrolling in List view for 500+ tasks
- Live collaboration simulation (fake users)
- Filters synced to the URL

**Tech Stack**
- React + TypeScript
- Context API for global state
- CSS (custom, no UI libraries)

**Folder Structure**
```
src/
  components/
    kanban/
    AvatarStack.tsx
    Badge.tsx
    EmptyState.tsx
    FilterBar.tsx
    Layout.tsx
    TopNav.tsx
  data/
    tasks.ts
    users.ts
  hooks/
    useRoute.ts
    useUrlFilters.ts
    useVirtualScroll.ts
  store/
    TaskContext.ts
    TaskProvider.tsx
    TaskStore.ts
    useTasks.ts
  utils/
    date.ts
  views/
    BoardPage.tsx
    HomePage.tsx
    KanbanView.tsx
    ListView.tsx
    TimelineView.tsx
  App.tsx
  App.css
  index.css
  main.tsx
```

**Run Locally**
```
cd client
npm install
npm run dev
```

**Build**
```
cd client
npm run build
```

