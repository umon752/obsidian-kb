# Router   
main.tsx：   
```
import { BrowserRouter } from'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)

```
App.tsx：   
> Route Outlet 不一定要設定 index   
>    

```
import { Routes, Route } from 'react-router-dom';
import Loading from '@/views/layout/Loading';
import Nav from '@/views/layout/Nav';
import Footer from '@/views/layout/Footer';
import Usage from '@/views/pages/Usage';
import Form from '@/views/pages/Form';
import NotFound from '@/views/pages/NotFound';

const App = () => {
  return (
    <>
      <Loading />
      <div className="flex flex-col min-h-100vh">
        <div className="flex-shrink-0">
          <Nav />
          <Routes>
            <Route path="/" element={<Usage />} />
            <Route path="form" element={<Form />} />
            <Route path="layout" element={<Layout />}>
              {/* Outlet - start */}
              <Route index element={<LayoutIndex />}></Route>
              <Route path=":id" element={<LayoutContent />}></Route>
              <Route path="search" element={<LayoutSearch />}></Route>
              {/* Outlet - end */}
            </Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  )
}

```
Layout.tsx：   
```
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  const [list, setList] = useState([]);

  return (
    <>
      <Link to="search">搜尋頁面</Link>

      <ul>
        {list.map((item) => {
          return <li key={item.id}>
            <Link to={`/layout/${item.id}`}>{item.id}</Link>
          </li>
        })}
      </ul>

      <Outlet context={list} />
    </>
  )
}
```
LayoutIndex.tsx：   
```
const LayoutIndex = () => {
  return (
    <>
      <div>layout index</div>
    </>
  )
}
```
LayoutContent.tsx：   
- useNavigate()：使用 js 跳轉頁面寫法   
- useParams()：動態路由（取出頁面 route id 的方法）   
   
```
import { useOutletContext } from 'react-router-dom';

const LayoutList = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <button type="button" onClick={() => {
      navigate(-1)}}>回到上一頁</button>
      { id }
    </>
  )
}
```
LayoutSearch.tsx：   
```
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const LayoutSearch = () => {
  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if(search !== '') {
      (async () => {
        const response = await axios.get(`${apiUrl}?&query=${search}`)
        const { results } = response.data;
        setList(results);
        console.log('results',results);
      })();
    }
  }, [search]);

  useEffect(() => {
    setSearch(searchParams.get('query'));
  }, [searchParams]);


  return (
    <>
      搜尋 {search}
      <input type="text" className="form-control"
      defaultValue={search} 
      onKeyUp={(e) => {
        if(e.code === 'Enter') {
          setSearchParams({ query: e.target.value});
        }
      }} />
      <List list={list}></List>
    </>
  )
}

```
   
Nav.tsx   
```
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <> 
      <ul>
        <li>
          <NavLink to='/' className={(isActive) => { 
            return `${isActive ? 'is-active' : ''}`;
          }}>Home</NavLink>
        </li>
        <li>
          <NavLink to='/about' className={(isActive) => { 
            return `${isActive ? 'is-active' : ''}`;
          }}>About</NavLink>
        </li>
        <li>
          <NavLink to='/album' className={(isActive) => { 
            return `${isActive ? 'is-active' : ''}`;
          }}>Album</NavLink>
        </li>
      </ul>
    </>
  )
}
```
   
