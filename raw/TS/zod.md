# Zod   
[官方文件](https://zod.dev/)   
[加強你的 TypeScript 驗證：Type Guard？或許該試試 Zod](https://medium.com/ikala-tech/enhance-typescript-validation-by-zod-8f52837a58a1)   
TypeScript 是在編譯時運作，而不是在 runtime，所以在使用外部資料時可能會出現潛在的錯誤   
> 使用 Zod 只需要定義 schema 他就能應用於驗證與產生型別，處理欄位驗證和型別檢查。   

   
```
import {z} from 'zod'

const todoSchema = z.object({
    id: z.number(),
    content: z.string(),
    done: z.boolean()
})

type Todo = z.infer<typeof todoSchema>
      
const fetchTodo = async (id: number): Todo => {
    const response = await axios.get(`/todo/${id}`)
    return todoSchema.parse(response.data)
}
```
