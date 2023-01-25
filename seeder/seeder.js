const connectDB = require("../config/db")//.. mns two folder back and single dot . mns o1 file back

connectDB()

const categoryData = require("./categories") // category data
const productData = require("./products")
const reviewData = require("./reviews")
const userData = require("./users")
const orderData = require("./orders")

const Category = require("../models/CategoryModel") //Model to operate like CRUD
const Product = require("../models/ProductModel")
const Review = require("../models/ReviewModel")
const User = require("../models/UserModel")
const Order = require("../models/OrderModel")

const importData = async () => {  //asynchronous await till promise
    try {
        await Category.collection.dropIndexes()  //Waiting till model, data & cloud ready
        await Product.collection.dropIndexes()
        // await Review.collection.dropIndexes() b/c review has no indexes

        await Category.collection.deleteMany({})
        await Product.collection.deleteMany({})
        await Review.collection.deleteMany({})
        await User.collection.deleteMany({})
        await Order.collection.deleteMany({})//Everytime server runs it deletes all existing data in DB

        await Category.insertMany(categoryData)
        const reviews = await Review.insertMany(reviewData)
        const sampleProducts = productData.map((product) => {
            reviews.map((review) => {
                product.reviews.push(review._id)
            })
            return {...product}
        })
        await Product.insertMany(sampleProducts)
        await User.insertMany(userData)
        await Order.insertMany(orderData)

        console.log("Seeder data proceeded successfully")
        process.exit()
    } catch (error) {
        console.error("Error while proccessing seeder data", error)
        process.exit(1);
    }
}
importData()
 


// const connectDB = require("../config/db")  

// connectDB();

// const categoryData = require("./categories"); // category data
// const productData = require("./products");
// const reviewData = require("./reviews");
// const userData = require("./users");
// const orderData = require("./orders");


// const Category = require("../models/CategoryModel");   //Model to operate like CRUD
// const Product = require("../models/ProductModel");
// const Review = require("../models/ReviewModel");
// const User = require("../models/UserModel");
// const Order = require("../models/OrderModel");


// const importData = async () => {  //asynchronous await till promise
//     try {
//         await Category.collection.dropIndexes() //Waiting till model, data & cloud ready
//         await Product.collection.dropIndexes()
//         // await Review.collection.dropIndexes() b/c review has no indexes

//         await Category.collection.deleteMany({})
//         await Product.collection.deleteMany({})
//         await Review.collection.deleteMany({})
//         await User.collection.deleteMany({}) 
//         await Order.collection.deleteMany({})//Everytime server runs it deletes all existing data in DB

//         await Category.insertMany(categoryData);
//         const reviews = await Review.insertMany(reviewData);
//         const sampleProducts = productData.map((product) => {
//             reviews.map((review) => {
//                 product.reviews.push(review._id)
//             })
//             return { ...product };
//         })

//         await Product.insertMany(sampleProducts);
//         await User.insertMany(userData);
//         await Order.insertMany(orderData);


//         console.log("Seeder data preceded successfully");
//         process.exit();
//     }
//     catch (error) {
//         console.error("Error while preceding data", error);
//         process.exit(1);
//     }
// }

// importData()


