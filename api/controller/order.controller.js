import createError from '../utils/createError.js';  // Your custom error handling function
import Gig from '../models/gig.model.js';            // The Gig model
import Order from "../models/order.model.js";        // The Order model

// Function to add a gig to the order list
export const addGigToOrder = async (req, res) => {
    try {
        const { gigId } = req.body;   // Get gigId from the request body
        const userId = req.userId;    // Assume userId is set in req.userId from authentication

        // Validate if the gig exists
        const gig = await Gig.findById(gigId);
        if (!gig) {
            return res.status(404).json({ message: "Gig not found" });
        }

        // Get the price from the Gig model
        const gigPrice = parseFloat(gig.price);  // Assuming price is stored as a number in the Gig model

        // Find or create an order for the user
        let order = await Order.findOne({ userId });
        if (!order) {
            // If no order exists, create a new order
            order = new Order({
                userId,
                gigs: [],  // Empty gigs array initially
                totalAmount: 0, // Ensure totalAmount starts at 0
                orderStatus: 'Pending',  // Default order status
            });
        }

        // Check if the gig already exists in the order
        const existingGigIndex = order.gigs.findIndex(item => item.toString() === gigId);
        if (existingGigIndex > -1) {
            // If the gig is already in the order, return an error
            return res.status(400).json({ message: "Gig is already in the order" });
        } else {
            // If the gig is not in the order, add it to the gigs array
            order.gigs.push(gigId); // Push the gigId into the gigs array
        }

        // Update total amount for the order
        order.totalAmount += gigPrice;  // Add the gig's price to the totalAmount

        // Save the order to the database
        await order.save();

        // Respond with success message and updated order details
        res.status(200).json({
            message: "Gig successfully added to the order",
            order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to add gig to the order",
            error: error.message,
        });
    }
};

// Example of fetching the order by userId (optional if you need to retrieve the order after adding a gig)
export const getOrderByUserId = async (req, res) => {
    try {
        const userId = req.userId;  // Get userId from req.userId
        const order = await Order.findOne({ userId }).populate('gigs'); // Populate gig details

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch order",
            error: error.message,
        });
    }
};
