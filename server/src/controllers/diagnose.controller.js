import Conversation from "../models/diagnosisModel.js";
import { diagnoseApi } from "../../utills/service.js";

export const diagnosePatient = async (req, res) => {
    try {
        const userId = req.id; // from auth middleware
        const { symptoms, conversationId } = req.body;

        if (!symptoms) {
            return res.status(400).json({
                message: "Please provide symptoms",
                success: false
            });
        }

        let conversation;

        // ✅ 1. Find or create conversation
        if (conversationId) {
            conversation = await Conversation.findById(conversationId);
        }

        if (!conversation) {
            conversation = await Conversation.create({
                user: userId,
                messages: []
            });
        }

        // ✅ 2. Save USER message
        conversation.messages.push({
            sender: "user",
            text: symptoms
        });

        // ✅ 3. Get AI response
        const aiResponse = await diagnoseApi(symptoms);

        // ✅ 4. Save AI message
        conversation.messages.push({
            sender: "ai",
            text: aiResponse
        });

        await conversation.save();

        return res.status(200).json({
            success: true,
            aiResponse,
            conversationId: conversation._id
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error in diagnose",
            success: false
        });
    }
};

export const getConversation = async (req, res) => {
    try {
        const userId = req.id;

        const getAllConversation = await Conversation.find({ user: userId }).sort({ createdAt: -1 })

        return res.status(200).json({
            message: "get conversation",
            success: true,
            getAllConversation
        })
    } catch (error) {
        return res.status(400).json({
            message: "Error found while getting conversation",
            success: false
        });
    }
}

export const deleteAllChats = async(req,res) => {
    try {
        const userId = req.id;

        const result = await Conversation.deleteMany({user:userId});

        return res.status(400).json({
            message:"Chat deleted!!",
            success:true,
            deleteCount: result.deletedCount
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error found while deleting conversation",
            success: false
        });
    }
}