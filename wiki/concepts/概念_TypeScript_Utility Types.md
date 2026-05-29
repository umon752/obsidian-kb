---
type: concept
author: collaborative
tags: ["domain/typescript", "topic/utility-types", "topic/型別操作", "status/draft"]
summary: "TypeScript 內建 Utility Types 對照表，涵蓋 Pick、Omit、Partial、Required、Record、Exclude、Extract、ReturnType 等常用工具型別的定義、語法與使用時機"
sources: ["raw/notes/TS/六角學院 ＆ TypeScript 實戰課 - 打造工程師型別思維.pdf"]
created: "2026-05-10"
updated: "2026-05-10"
---

# 概念：TypeScript Utility Types

## 定義
TypeScript 內建的型別轉換工具，讓你從既有型別派生出新型別，避免重複定義、提升型別安全性。

## 常用 Utility Types 對照表

| Utility Type | 說明 | 常見使用時機 |
|---|---|---|
| `Partial<T>` | 將所有屬性變為選填 | 表單更新、PATCH API 請求 |
| `Required<T>` | 將所有屬性變為必填 | 確保完整資料送出 |
| `Readonly<T>` | 所有屬性只能讀不能寫 | 防止意外 mutation |
| `Pick<T, K>` | 從 T 挑選指定屬性 K | 只取需要的欄位傳遞 |
| `Omit<T, K>` | 從 T 排除指定屬性 K | 隱藏敏感欄位（如 password） |
| `Record<K, V>` | 建立 key 為 K、value 為 V 的物件型別 | 映射表、字典物件 |
| `Exclude<T, U>` | 從聯合型別 T 移除可指派給 U 的型別 | 過濾 union 成員 |
| `Extract<T, U>` | 從聯合型別 T 提取可指派給 U 的型別 | 縮小 union 範圍 |
| `NonNullable<T>` | 移除 `null` 與 `undefined` | 確保值不為空 |
| `ReturnType<F>` | 取得函式 F 的回傳型別 | 不重複定義回傳型別 |
| `Parameters<F>` | 取得函式 F 的參數型別（tuple） | 包裝函式時重用參數型別 |

## 使用範例

```ts
interface User {
  id: number
  name: string
  password: string
  email: string
}

// 更新時不需要所有欄位
type UpdateUser = Partial<Pick<User, 'name' | 'email'>>

// 對外 API 回傳隱藏密碼
type PublicUser = Omit<User, 'password'>

// 以 id 為 key 的使用者映射表
type UserMap = Record<number, PublicUser>
```

## 決策原則
- 優先用 **Omit** 隱藏欄位，而非重新定義整個型別
- 優先用 **Pick** 組合最小必要型別（最小權限原則）
- `Record` 取代 `{ [key: string]: T }` 寫法，更語意化
- 組合技：`Partial<Omit<T, 'id'>>` 適用於 PATCH 更新場景

## 與其他概念的關係
- 相關筆記：[[notes/TS/六角學院 ＆ TypeScript 實戰課 - 打造工程師型別思維]]
