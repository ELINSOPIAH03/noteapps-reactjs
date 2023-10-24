// eslint-disable-next-line no-unused-vars
import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';  
import Nav from './components/Nav';



import FormInput from './components/FormInput'

const element = 
            <div>
                <Nav/>
                <FormInput/>
            </div>;
            

const root = createRoot(document.getElementById('root'));
root.render(element);