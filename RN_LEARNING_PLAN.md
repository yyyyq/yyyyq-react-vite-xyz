# React Native 重学计划（2026）

> 适用对象：有前端基础 + 2023年 RN 经验，重新系统学习并跟进新版本变化。

---

## 一、现状梳理 & 学习目标

### 你已经有的基础
- React 组件、Hooks、状态管理
- RN 基本组件（View / Text / ScrollView 等）
- StyleSheet 布局、Flexbox
- Navigation 基础使用

### 重学重点
- RN **新架构**（New Architecture：JSI / Fabric / TurboModules）
- **Expo Router v3**（文件路由，类似 Next.js App Router）
- **Expo SDK 52+** 生态变化
- TypeScript 最佳实践
- 现代状态管理与数据请求方案

---

## 二、学习路线总览

```
第一阶段（1周）：环境 & 回顾基础
第二阶段（1~2周）：新架构 & 核心 API
第三阶段（1~2周）：导航 & 状态管理
第四阶段（1~2周）：原生能力 & 性能
第五阶段（持续）：实战项目
```

---

## 三、详细计划

### 第一阶段：环境搭建 & 基础回顾（约 1 周）

**目标：** 搭好开发环境，快速回顾已知内容，识别知识缺口。

| 任务 | 说明 |
|------|------|
| 安装 Expo CLI + 创建项目 | 推荐 `npx create-expo-app@latest`，默认启用新架构 |
| 了解 Expo Go vs Dev Build | 2024年后 Expo Go 能力受限，学会 `eas build` 生成 dev client |
| 回顾 RN 核心组件 | View / Text / Image / FlatList / SectionList / TextInput |
| Flexbox 布局练习 | 重点：`gap`、`rowGap`、`columnGap`（RN 0.71+ 支持） |
| TypeScript 配置 | 熟悉 RN + TS 的类型声明，`StyleSheet.create` 类型提示 |

**资源：**
- [Expo 官方文档](https://docs.expo.dev)
- [RN 官方文档](https://reactnative.dev/docs/getting-started)

---

### 第二阶段：新架构 & 核心 API（约 1~2 周）

**目标：** 理解 RN 新架构带来的变化，掌握常用原生 API。

#### 2.1 新架构核心概念

| 概念 | 说明 |
|------|------|
| JSI（JavaScript Interface） | 替代 Bridge，JS 直接调用 C++ 方法，同步通信 |
| Fabric | 新渲染引擎，支持并发渲染（对接 React 18 Concurrent） |
| TurboModules | 按需加载原生模块，替代旧 NativeModules |
| Codegen | 自动生成 JS ↔ 原生类型安全接口 |

**实践：** 创建一个启用新架构的项目，观察 `newArchEnabled: true` 配置。

#### 2.2 常用 API 回顾 & 新增

- `useColorScheme` / `Appearance` — 深色模式
- `useWindowDimensions` — 响应式布局
- `Animated` vs `react-native-reanimated v3` — 推荐后者
- `Pressable`（替代 `TouchableOpacity`）
- `KeyboardAvoidingView` + `KeyboardController`（第三方更好用）

---

### 第三阶段：导航 & 状态管理（约 1~2 周）

**目标：** 掌握现代 RN 导航方案和主流状态管理。

#### 3.1 导航方案

**推荐：Expo Router v3**（基于 React Navigation v7，文件路由）

```
app/
  _layout.tsx          # 根布局（Stack / Tabs）
  index.tsx            # /
  (tabs)/
    _layout.tsx        # Tab 导航
    home.tsx           # /home
    profile.tsx        # /profile
  [id].tsx             # 动态路由 /:id
```

学习重点：
- Stack / Tabs / Drawer 组合使用
- `useRouter` / `useLocalSearchParams` / `Link` 组件
- 深链接（Deep Linking）配置
- Modal 路由 `+modal`

如果不用 Expo Router，备选：**React Navigation v7**（Stack / Bottom Tabs / Drawer）

#### 3.2 状态管理

| 场景 | 推荐方案 |
|------|---------|
| 简单全局状态 | Zustand |
| 服务端数据请求 | TanStack Query（React Query） |
| 复杂状态 | Jotai / Redux Toolkit |
| 表单 | React Hook Form |

**实践：** 用 Zustand + TanStack Query 实现一个带缓存的列表页。

---

### 第四阶段：原生能力 & 性能优化（约 1~2 周）

**目标：** 掌握常用原生功能集成，了解性能调优手段。

#### 4.1 常用原生能力

| 功能 | 推荐库 |
|------|--------|
| 摄像头 | `expo-camera` |
| 图片选择 | `expo-image-picker` |
| 文件系统 | `expo-file-system` |
| 推送通知 | `expo-notifications` |
| 安全存储 | `expo-secure-store` |
| 地图 | `react-native-maps` |
| 图片展示 | `expo-image`（替代 RN 内置 Image，支持缓存） |

#### 4.2 性能优化

- `useMemo` / `useCallback` 避免不必要渲染
- `FlatList` 优化：`keyExtractor`、`getItemLayout`、`initialNumToRender`
- `react-native-reanimated v3` 动画运行在 UI 线程
- Hermes 引擎（默认启用，注意调试方式变化）
- Expo DevTools Plugins 性能面板

#### 4.3 自定义原生模块（了解）

- Expo Modules API（推荐）：用 Swift/Kotlin 编写，Codegen 自动生成 TS 类型
- 旧方式：`NativeModules` + Bridge（已不推荐）

---

### 第五阶段：实战项目（持续进行）

**目标：** 通过完整项目巩固所有知识点。

#### 推荐练手项目

**项目1：Todo + 笔记 App（基础）**
- Expo Router 文件路由
- Zustand 状态管理
- AsyncStorage / SQLite 本地存储
- 深色模式支持

**项目2：社交/内容浏览 App（中级）**
- TanStack Query 数据请求 + 分页
- FlatList 性能优化
- expo-image 图片缓存
- Push 通知

**项目3：相机/扫码工具 App（进阶）**
- expo-camera 相机
- 图片处理 + 上传
- EAS Build 打包发布流程
- OTA 更新（expo-updates）

---

## 四、关键变化速查（2023 → 2026）

| 变化点 | 旧（2023） | 新（2026） |
|--------|-----------|-----------|
| 架构 | Bridge 架构 | 新架构默认启用（JSI/Fabric） |
| 导航 | React Navigation v6 | Expo Router v3 / React Navigation v7 |
| 动画 | Animated API | reanimated v3（worklets） |
| 图片 | RN Image | expo-image（缓存、BlurHash） |
| 触摸 | TouchableOpacity | Pressable |
| 布局 | 无 gap | 支持 gap / rowGap / columnGap |
| 构建 | expo build（已废弃） | EAS Build |
| Expo Go | 大部分功能可用 | 受限，建议用 dev build |
| Metro | 基础配置 | 支持 CSS Modules、symlinks |

---

## 五、推荐学习资源

### 文档
- [Expo 官方文档](https://docs.expo.dev) — 首选
- [React Native 官方文档](https://reactnative.dev)
- [React Navigation 文档](https://reactnavigation.org)
- [reanimated 文档](https://docs.swmansion.com/react-native-reanimated/)

### 视频 / 教程
- **Expo 官方 YouTube** — 跟进最新特性
- **William Candillon**（Can It Be Done In React Native）— 动画进阶
- **Simon Grimm**（Galaxies.dev）— 实战教程

### 工具
- [Expo Snack](https://snack.expo.dev) — 在线运行 RN 代码
- [React Native Directory](https://reactnative.directory) — 查找第三方库
- EAS CLI — `npm install -g eas-cli`

---

## 六、学习节奏建议

- **每天**：1~2 小时，边学边做小 Demo
- **每周末**：总结本周重点，整合进实战项目
- **遇到新概念**：先了解 why（解决什么问题），再看 how（怎么用）
- **优先 Expo 生态**：除非有特殊原因，优先选 Expo 托管的方案

---

> 计划制定于 2026-04-15，基于 Expo SDK 52 / RN 0.76+ / Expo Router v3
