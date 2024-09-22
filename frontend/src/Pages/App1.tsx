import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Ingredients from "./Ingredients";
import CreateIngredient from "./CreateIngredient";
import UpdateIngredient from "./UpdateIngredient";
import RequestIngredient from './Thila';
import StockNotification from './StockNotification';

// Define the App component with TypeScript
const App: React.FC = () => {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Ingredients />} />
            <Route path='/create' element={<CreateIngredient />} />
            <Route path='/update/:id' element={<UpdateIngredient />} />
            <Route path='/requestIng' element={<RequestIngredient />} />
            <Route path='/stocknt' element={<StockNotification />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;