
import { diagnoseApi } from "../../utills/service.js";
import conversationModel from "../models/diagnosisModel.js"


export const diagnosePatient = async (req, res) => {
    try {
        const id = req.id;

        if (!id) {
            return res.json({
                message: "Pls login first"
            })
        }
        const { symptoms, conversationId } = req.body



        if (!symptoms) {
            return res.status(401).json({
                message: "Symptoms is required",
                success: false
            })
        }

        let conversation
        // 1️⃣ If conversationId exists → continue chat
        if (conversationId) {


            conversation = await conversationModel.findId(conversationId)

            if (!conversation) {
                return res.json({
                    message: "conversation not found",
                    success: false
                })
            }

            conversation.messages.push({
                sender: "user",
                text: symptoms
            })

        }
        // 2️⃣ If conversationId NOT exists → create new chat
        else {
            conversation = new conversationModel({
                userId: id,
                title: symptoms.slice(0, 30),//title will be the intial 30 letter of fisrt chat
                messages: [
                    {
                        sender: "user",
                        text: symptoms
                    }
                ]
            });
        }

        const aiResponse = `Based on your symptoms (${symptoms}), it may be a minor condition. Please consult a doctor if it persists.`;

        conversation.messages.push({
            sender: "ai",
            text: aiResponse
        })

        await conversation.save()


        return res.status(201).json({
            message: "diagnose saved",
            success: true,
            conversationId: conversation._id,
            reply: aiReply
        })
    } catch (error) {
        console.log("error found during diagnose", error)
        return res.status(400).json({
            message: "Error found while saving diagnose",
            success: false
        })

    }
}

export const addMessage = async (req, res) => {
    try {

    } catch (error) {
        return res.status(400).json({
            msg: "Error found while adding msg",
            success: false
        })
    }
}