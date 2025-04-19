import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home';
import UserPage from './pages/User';
import { UserProvider } from './contexts/UserContext';
import CarouselPage from './pages/Carousel';

function App() {
  return (
    <UserProvider>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/carousel" element={<CarouselPage />} />
        </Routes>
      </main>
    </UserProvider>
  );
}

export default App;
