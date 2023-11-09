import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';

import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';

function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    useEffect(() => {
        dispatch(fetchAuthMe());
    }, [dispatch]);
    return (
        <>
            <Header />
            <Container maxWidth="lg">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/posts/:id" element={<FullPost />} />
                    <Route path="/posts/:id/comments" element={<FullPost />} />
                    <Route path="/posts/:id/edit" element={<AddPost />} />
                    <Route path="/tags/:tag" element={<Home />} />
                    <Route path="/add-post" element={<AddPost />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
