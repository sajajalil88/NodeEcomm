import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js'; 
import Product from './models/product.model.js';
import cors from 'cors';

const app = express()
app.use(cors());
app.use(express.json()) 
dotenv.config()

app.listen(3000 , () =>{
    console.log("server started at port 5000")
})

app.use("/api/products", productRoutes);
mongoose.set("strictQuery", false);

mongoose.connect('mongodb+srv://sajajalil:saja12345@cluster0.lklb8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log("connected to mango db");
        seedData()
    }).catch((error) => {
        console.log(error);
    });

    const seedData = async () => {
        try {
          // Clear existing data
          await Product.deleteMany();
      
          // Data to seed
          const products = [
            {
              name: 'Product 1',
              price: 29.99,
              image: 'image1.jpg',
            },
            {
              name: 'Product 2',
              price: 39.99,
              image: 'image2.jpg',
            },
            {
              name: 'Product 3',
              price: 49.99,
              image: 'image3.jpg',
            },
          ];
      
          // Insert the products into the database
          await Product.insertMany(products);
          console.log('Data successfully seeded!');
          process.exit(); // Exit the script
        } catch (error) {
          console.error('Error seeding data:', error.message);
          process.exit(1);
        }
      };
      