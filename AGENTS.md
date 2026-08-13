# AGENTS.md

> See [[schema.md]] for the full schema and operating instructions.

## Git Commit

Commit message 格式：

```text
<type>: <imperative verb> <description>
```

可用 type：

| Type | 用途 |
| --- | --- |
| `feat` | 新功能 |
| `fix` | 錯誤修正 |
| `docs` | 僅文件變更 |
| `style` | 格式調整，無邏輯變更 |
| `refactor` | 不改變功能的程式重構 |
| `perf` | 效能改善 |
| `test` | 新增或更新測試 |
| `chore` | 依賴、工具或維護工作 |
| `ci` | CI/CD 設定 |
| `build` | 建置系統變更 |
| `revert` | 還原先前 commit |

Commit 規則：

- 使用英文，整句小寫。
- description 以祈使動詞開始，例如 `add`、`fix`、`update`、`remove`、`refactor`、`improve`、`move`、`rename`、`bump`。
- colon 後保留一個空格。
- 簡短且具體，不以標點符號結尾。
- 不使用過去式或模糊描述。

```text
feat: add user authentication flow
fix: resolve crash when submitting empty form
docs: update readme with installation steps
chore: bump eslint to v9
```
